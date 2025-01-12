import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { requestConfig, formatCookies } from './config/headers.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

class StreamExtractor {
    async extractHLSStream(tmdbId) {
        try {
            const embedUrl = `https://hin.autoembed.cc/movie/${tmdbId}`;
            console.log('Fetching embed URL:', embedUrl);

            const headers = {
                ...requestConfig.headers,
                'Cookie': formatCookies(requestConfig.cookies)
            };

            const response = await fetch(embedUrl, { headers });

            if (!response.ok) {
                throw new Error(`Embed page returned status ${response.status}`);
            }

            const html = await response.text();
            console.log('Response received, length:', html.length); // Debug log

            // Find the player configuration
            const sourcesMatch = html.match(/sources:\s*(\[[^\]]+\])/);
            if (!sourcesMatch) {
                throw new Error('No stream sources found in player configuration');
            }

            try {
                const sourcesStr = sourcesMatch[1].replace(/'/g, '"');
                const sources = JSON.parse(sourcesStr);

                const streams = sources
                    .map(source => ({
                        url: source.file,
                        language: source.label,
                        type: source.type
                    }))
                    .filter(source => source.type === 'application/vnd.apple.mpegurl');

                if (streams.length === 0) {
                    throw new Error('No HLS streams found in player configuration');
                }

                return {
                    success: true,
                    streams: streams,
                    defaultStream: streams[0].url,
                    embedUrl: embedUrl
                };
            } catch (e) {
                console.error('Error parsing sources:', e);
                throw new Error('Failed to parse stream sources: ' + e.message);
            }
        } catch (error) {
            console.error('Error extracting stream:', error);
            return {
                success: false,
                error: error.message,
                details: error.stack
            };
        }
    }
}

const extractor = new StreamExtractor();

// Route to extract stream URL
app.get('/api/extract/:tmdbId', async (req, res) => {
    try {
        const { tmdbId } = req.params;
        
        // Validate tmdbId
        if (!tmdbId || !/^\d+$/.test(tmdbId)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid TMDB ID'
            });
        }

        const result = await extractor.extractHLSStream(tmdbId);
        if (!result.success) {
            return res.status(404).json(result);
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Documentation endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Stream Extractor API',
        version: '1.0.0',
        endpoints: {
            '/api/extract/:tmdbId': 'GET - Extract HLS stream URL for a given TMDB ID',
            '/health': 'GET - Health check endpoint'
        },
        example: '/api/extract/385687'
    });
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
