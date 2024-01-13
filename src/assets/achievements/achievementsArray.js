let id = 1;

// {
//   "id": "ach-1",
//   "achievementType": "",
//   "name": "",
//   "achievementLevel": 0,
//   "badgeUrl": "",
//   "selfAwardable": false,
//   "requirements": [
//     {
//       "id": 1,
//       "requirement": {}
//     }
//   ]
// },

export const achievementsAndBadgesArray = [

  {
    id: `ach-${id++}`,
    achievementType: '',
    name: '',
    achievementLevel: 0,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {},
      },
    ],
  },

  // Signup Achievements
  {
    id: `ach-${id++}`,
    achievementType: 'login',
    name: 'Login 3 days in a row',
    achievementLevel: 1,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {
          model: 'loginRecord',
          record: 'daysInARow',
          score: 3,
        },
      },
    ],
  },

  // Login Achievements
  {
    id: `ach-${id++}`,
    achievementType: 'login',
    name: 'Login 3 days in a row',
    achievementLevel: 1,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {
          model: 'loginRecord',
          record: 'daysInARow',
          score: 3,
        },
      },
    ],
  },
  {
    id: `ach-${id++}`,
    achievementType: 'login',
    name: 'Login 1 week in a row',
    achievementLevel: 2,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {
          model: 'loginRecord',
          record: 'daysInARow',
          score: 7,
        },
      },
    ],
  },
  {
    id: `ach-${id++}`,
    achievementType: 'login',
    name: 'Login 2 week in a row',
    achievementLevel: 3,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {
          model: 'loginRecord',
          record: 'daysInARow',
          score: 14,
        },
      },
    ],
  },
  {
    id: `ach-${id++}`,
    achievementType: 'login',
    name: 'Login 1 month in a row',
    achievementLevel: 4,
    badgeUrl: '',
    selfAwardable: false,
    requirements: [
      {
        id: 1,
        requirement: {
          model: 'loginRecord',
          record: 'daysInARow',
          score: 30,
        },
      },
    ],
  },
];

const arr = [
  {gen: []},
]