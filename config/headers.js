export const requestConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'Priority': 'u=0, i'
    },
    cookies: {
        '_ga': 'GA1.1.706683355.1726485463',
        '_ga_H7JNR1YG73': 'GS1.1.1735476873.6.0.1735476873.0.0.0',
        '_ga_JS6Z6479G1': 'GS1.1.1736696669.22.1.1736697133.0.0.0',
        '_ga_VKQEPNWV0G': 'GS1.1.1736697133.16.0.1736697133.0.0.0',
        'cf_clearance': 'LrZndrXlNRxAa_E7WOgRt1EWiV9BAm4k_LMh4RpDDhg-1736699661-1.2.1.1-H.3VwENwhj4SGrsIb1yALGAq2RMOaG_6MPT9qxCrxxv2XptVJzo7bLVY2H73O6wc_8ScaVueKFanaNFMQxyEa5OBy3GcclZ1IpvH975GbrpQFQe7YY4CIB4bkNyX0Rz4NnezOz9l9BruR4XMsn8AsdHskn1_Aui9eWLEWRJTdsqytiRzh9aJ0Zy66qG5U25Vs7r9wu6UE_.s.8QeKOOXGgWGwLkD4_lq84Rq5oIGM3Nq4NwAgfTYm1TRGort0PDvT9dSLfTXOsaVJODohxuO4W.TQCQ.RtGSoKMiHb9kVgM'
    }
};

export const formatCookies = (cookies) => {
    return Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
}; 