// 🚨 AUTO-GENERATED FROM BACKEND - DO NOT EDIT MANUALLY
// Source: backend/src/shared/constants/genres/genre-hierarchy.const.ts
// Generated: 2025-12-22T11:37:56.564Z
// To update: Run 'pnpm prisma:generate' or 'pnpm sync-types' in backend

export const GENRE_HIERARCHY = [
  {
    key: 'action',
    label: 'Action',
    color: '#FF5722',
    emoji: '💥',
    children: [
      { key: 'war', label: 'War', emoji: '⚔️' },
      { key: 'martial-arts', label: 'Martial Arts', emoji: '🥋' },
      { key: 'superhero', label: 'Superhero', emoji: '🦸' },
      { key: 'military', label: 'Military', emoji: '🪖' },
      { key: 'espionage', label: 'Espionage/Spy', emoji: '🕵️' },
      { key: 'western', label: 'Western', emoji: '🤠' },
      { key: 'samurai', label: 'Samurai', emoji: '🗾' },
    ],
  },
  {
    key: 'adventure',
    label: 'Adventure',
    color: '#4CAF50',
    emoji: '🗺️',
    children: [
      { key: 'treasure-hunt', label: 'Treasure Hunt', emoji: '💎' },
      { key: 'exploration', label: 'Exploration', emoji: '🧭' },
      { key: 'survival', label: 'Survival', emoji: '🏔️' },
      { key: 'pirates', label: 'Pirates', emoji: '🏴‍☠️' },
      { key: 'quest', label: 'Quest', emoji: '🗡️' },
    ],
  },
  {
    key: 'comedy',
    label: 'Comedy',
    color: '#FFC107',
    emoji: '😂',
    children: [
      { key: 'romantic-comedy', label: 'Romantic Comedy', emoji: '💕' },
      { key: 'slapstick', label: 'Slapstick', emoji: '🤪' },
      { key: 'parody', label: 'Parody', emoji: '🎭' },
      { key: 'satire', label: 'Satire', emoji: '📰' },
      { key: 'dark-comedy', label: 'Dark Comedy', emoji: '😈' },
      { key: 'sitcom', label: 'Sitcom', emoji: '📺' },
    ],
  },
  {
    key: 'drama',
    label: 'Drama',
    color: '#9C27B0',
    emoji: '🎭',
    children: [
      { key: 'family-drama', label: 'Family Drama', emoji: '👨‍👩‍👧' },
      { key: 'legal-drama', label: 'Legal Drama', emoji: '⚖️' },
      { key: 'medical-drama', label: 'Medical Drama', emoji: '🏥' },
      { key: 'political-drama', label: 'Political Drama', emoji: '🏛️' },
      { key: 'crime-drama', label: 'Crime Drama', emoji: '🚔' },
      { key: 'sports-drama', label: 'Sports Drama', emoji: '⚽' },
      { key: 'melodrama', label: 'Melodrama', emoji: '💔' },
      { key: 'historical-drama', label: 'Historical Drama', emoji: '📜' },
    ],
  },
  {
    key: 'horror',
    label: 'Horror',
    color: '#f44336',
    emoji: '👻',
    children: [
      {
        key: 'psychological-horror',
        label: 'Psychological Horror',
        emoji: '🧠',
      },
      { key: 'supernatural-horror', label: 'Supernatural Horror', emoji: '👁️' },
      { key: 'slasher', label: 'Slasher', emoji: '🔪' },
      { key: 'zombie', label: 'Zombie', emoji: '🧟' },
      { key: 'monster', label: 'Monster', emoji: '👹' },
      { key: 'gothic-horror', label: 'Gothic Horror', emoji: '🏰' },
      { key: 'body-horror', label: 'Body Horror', emoji: '🩸' },
    ],
  },
  {
    key: 'sci-fi',
    label: 'Sci-Fi',
    color: '#2196F3',
    emoji: '🚀',
    children: [
      { key: 'space-opera', label: 'Space Opera', emoji: '🌌' },
      { key: 'cyberpunk', label: 'Cyberpunk', emoji: '🤖' },
      { key: 'time-travel', label: 'Time Travel', emoji: '⏰' },
      { key: 'dystopian', label: 'Dystopian', emoji: '🏙️' },
      { key: 'post-apocalyptic', label: 'Post-Apocalyptic', emoji: '☢️' },
      { key: 'alien-invasion', label: 'Alien Invasion', emoji: '👽' },
      { key: 'steampunk', label: 'Steampunk', emoji: '⚙️' },
      { key: 'hard-sci-fi', label: 'Hard Sci-Fi', emoji: '🔬' },
    ],
  },
  {
    key: 'fantasy',
    label: 'Fantasy',
    color: '#673AB7',
    emoji: '🧙',
    children: [
      { key: 'high-fantasy', label: 'High Fantasy', emoji: '🏰' },
      { key: 'dark-fantasy', label: 'Dark Fantasy', emoji: '🌑' },
      { key: 'urban-fantasy', label: 'Urban Fantasy', emoji: '🌃' },
      { key: 'sword-sorcery', label: 'Sword & Sorcery', emoji: '⚔️' },
      { key: 'magical-girl', label: 'Magical Girl', emoji: '✨' },
      { key: 'isekai', label: 'Isekai', emoji: '🚪' },
      { key: 'fairy-tale', label: 'Fairy Tale', emoji: '🧚' },
    ],
  },
  {
    key: 'romance',
    label: 'Romance',
    color: '#E91E63',
    emoji: '💕',
    children: [
      { key: 'romantic-comedy', label: 'Romantic Comedy', emoji: '💘' },
      { key: 'tragic-romance', label: 'Tragic Romance', emoji: '💔' },
      { key: 'historical-romance', label: 'Historical Romance', emoji: '📜' },
      { key: 'fantasy-romance', label: 'Fantasy Romance', emoji: '🧚' },
      {
        key: 'coming-of-age-romance',
        label: 'Coming-of-Age Romance',
        emoji: '🌸',
      },
    ],
  },
  {
    key: 'thriller',
    label: 'Thriller',
    color: '#607D8B',
    emoji: '🔪',
    children: [
      {
        key: 'psychological-thriller',
        label: 'Psychological Thriller',
        emoji: '🧠',
      },
      { key: 'spy-thriller', label: 'Spy Thriller', emoji: '🕵️' },
      { key: 'techno-thriller', label: 'Techno Thriller', emoji: '💻' },
      { key: 'legal-thriller', label: 'Legal Thriller', emoji: '⚖️' },
      { key: 'political-thriller', label: 'Political Thriller', emoji: '🏛️' },
    ],
  },
  {
    key: 'mystery',
    label: 'Mystery',
    color: '#795548',
    emoji: '🔍',
    children: [
      { key: 'detective', label: 'Detective', emoji: '🕵️' },
      { key: 'whodunit', label: 'Whodunit', emoji: '❓' },
      { key: 'crime', label: 'Crime', emoji: '🚔' },
      { key: 'noir', label: 'Noir', emoji: '🎩' },
      { key: 'heist', label: 'Heist', emoji: '💰' },
    ],
  },
  {
    key: 'anime-specific',
    label: 'Anime-Specific',
    color: '#FF6B9D',
    emoji: '🎌',
    children: [
      { key: 'shounen', label: 'Shounen', emoji: '👦' },
      { key: 'shoujo', label: 'Shoujo', emoji: '👧' },
      { key: 'seinen', label: 'Seinen', emoji: '🧑' },
      { key: 'josei', label: 'Josei', emoji: '👩' },
      { key: 'mecha', label: 'Mecha', emoji: '🤖' },
      { key: 'slice-of-life', label: 'Slice of Life', emoji: '🌸' },
      { key: 'ecchi', label: 'Ecchi', emoji: '😳' },
      { key: 'harem', label: 'Harem', emoji: '💝' },
      { key: 'iyashikei', label: 'Iyashikei (Healing)', emoji: '☕' },
    ],
  },
  {
    key: 'documentary',
    label: 'Documentary',
    color: '#8D6E63',
    emoji: '📹',
    children: [
      { key: 'nature-doc', label: 'Nature', emoji: '🌿' },
      { key: 'history-doc', label: 'History', emoji: '📜' },
      { key: 'science-doc', label: 'Science', emoji: '🔬' },
      { key: 'true-crime-doc', label: 'True Crime', emoji: '🔍' },
    ],
  },
] as const;

export type GenreParentKey = (typeof GENRE_HIERARCHY)[number]['key'];
export type GenreChildKey =
  (typeof GENRE_HIERARCHY)[number]['children'][number]['key'];
export type GenreKey = GenreParentKey | GenreChildKey;
