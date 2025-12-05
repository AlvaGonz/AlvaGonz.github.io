
export interface Game {
    id: string;
    title: string;
    image: string;
    platform: 'Steam' | 'Origin' | 'Xbox' | 'PlayStation' | 'Nintendo' | 'Other';
    rating?: string;
    year?: string;
    playtime?: string;
}

export const favoriteGames: Game[] = [
    {
        id: 'wuthering-waves',
        title: 'Wuthering Waves',
        image: 'https://cdn-www.bluestacks.com/bs-images/featured_com.kurogame.wutheringwaves.global.jpg',
        platform: 'Steam',
        rating: '⭐⭐⭐⭐⭐',
        year: '2024',
        playtime: '200.7 hrs',
    },
    {
        id: 'botw',
        title: 'The Legend of Zelda: Breath of the Wild',
        image: 'https://i.blogs.es/15da49/zelda00/1366_2000.jpg',
        platform: 'Nintendo',
        rating: '⭐⭐⭐⭐⭐',
        year: '2017',
        playtime: 'Played',
    },
    {
        id: 'aoc',
        title: 'Hyrule Warriors: Age of Calamity',
        image: 'https://monstervine.com/wp-content/uploads/2020/12/hyrule-warriors-age-of-calamity-switch-hero.jpg',
        platform: 'Nintendo',
        rating: '⭐⭐⭐⭐⭐',
        year: '2020',
        playtime: 'Played',
    },
    {
        id: 'nfs-mw-2005',
        title: 'Need for Speed™ Most Wanted',
        image: '/images/bmw-m3-gtr-nfs-hd-02.jpg',
        platform: 'Other',
        rating: '⭐⭐⭐⭐⭐',
        year: '2005',
        playtime: '∞ hrs',
    },
    {
        id: 'american-truck-simulator',
        title: 'American Truck Simulator',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/270880/header.jpg',
        platform: 'Steam',
        rating: '⭐⭐⭐⭐⭐',
        year: '2016',
        playtime: '46 hrs',
    },
    {
        id: 'brawlhalla',
        title: 'Brawlhalla',
        image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/291550/header.jpg',
        platform: 'Steam',
        rating: '⭐⭐⭐⭐',
        year: '2017',
        playtime: '3.5 hrs',
    },
];
