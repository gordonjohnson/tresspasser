/**
 * This file contains the configuration for each of the puzzles
 */

import { StageLayout } from "./types";

// https://ratchet-galaxy.com/en/games/ps2/ratchet-and-clank/solutions/trespasser

const STAGES: ReadonlyArray<StageLayout> = [
  {
    name: "remake #1 rilgar 0:23",
    difficulty: "Easy",
    ports: [2, 9],
    rings: [
      null,
      { lasers: [5], blockers: [] },
      { lasers: [0], blockers: [] },
      null
    ]
  },
  {
    name: "remake #3 nebula g34 1:31",
    difficulty: "Easy",
    ports: [5, 10],
    rings: [
      null,
      { lasers: [3], blockers: [4] },
      { lasers: [0], blockers: [] },
      null
    ]
  },
  {
    name: "remake #5 Nebula G34 2:27",
    difficulty: "Easy",
    ports: [1, 2, 4, 6],
    rings: [
      null,
      { lasers: [10, 11], blockers: [] },
      { lasers: [5, 7], blockers: [] },
      null
    ]
  },
  {
    name: "remake #4 Nebula G34 1:56",
    difficulty: "Easy",
    ports: [0, 1, 2],
    rings: [
      null,
      { lasers: [2], blockers: [3, 4, 5, 9, 10, 11] },
      { lasers: [9], blockers: [0, 1, 5, 6, 7, 10, 11] },
      { lasers: [2], blockers: [0, 1, 3, 4, 5, 6, 7, 11] }
    ]
  },
  {
    name: "remake #12 Pokitaru 7:04",
    difficulty: "Easy",
    ports: [0, 1, 2, 10, 11],
    rings: [
      null,
      { lasers: [7, 9], blockers: [], disabled: true },
      { lasers: [1, 5], blockers: [], disabled: true },
      { lasers: [11], blockers: [] }
    ]
  },
  {
    name: "remake #2 kerwan 1:00",
    difficulty: "Easy",
    ports: [4, 6, 7, 9],
    rings: [
      null,
      { lasers: [7, 10], blockers: [9] },
      { lasers: [2, 4, 7], blockers: [] },
      null
    ]
  },
  {
    name: "remake #11 Pokitaru 6:22",
    difficulty: "Easy",
    ports: [3, 5, 6, 7],
    rings: [
      null,
      { lasers: [9, 11], blockers: [], disabled: true },
      { lasers: [0], blockers: [5, 7], disabled: true },
      { lasers: [7], blockers: [] }
    ]
  },
  {
    name: "remake #6 Batalia 3:00",
    difficulty: "Easy",
    ports: [6, 8, 9, 11],
    rings: [
      null,
      { lasers: [3, 5], blockers: [10] },
      { lasers: [11], blockers: [6, 8] },
      { lasers: [10], blockers: [3, 5, 9] }
    ]
  },
  {
    name: "remake #6 Batalia HARD 1:17",
    difficulty: "Hard",
    ports: [6, 8, 9, 11],
    rings: [
      null,
      { lasers: [4, 6], blockers: [11] },
      { lasers: [1, 8], blockers: [3, 5] },
      { lasers: [1], blockers: [8] }
    ]
  },

  {
    name: "remake #2 kerwan HARD 0:00",
    difficulty: "Hard",
    ports: [4, 6, 7, 9],
    rings: [
      null,
      { lasers: [6, 9], blockers: [], disabled: true },
      { lasers: [6, 7], blockers: [8], disabled: true },
      { lasers: [4], blockers: [3, 5] }
    ]
  },
  // LEVELS AFTER THIS POINT REQUIRE TOGGLE RING POWER
  {
    name: "----- remake #7 Batalia 3:32",
    difficulty: "Easy",
    ports: [2, 7, 9],
    rings: [
      null,
      { lasers: [6, 8], blockers: [10] },
      { lasers: [], blockers: [1, 3, 5, 7, 9, 11] },
      { lasers: [4], blockers: [2] }
    ]
  },
  {
    name: "remake #8 Quartu 4:11",
    difficulty: "Easy",
    ports: [6, 7, 8, 9],
    rings: [
      null,
      { lasers: [3, 4], blockers: [2], disabled: true },
      { lasers: [9, 10], blockers: [], disabled: true },
      { lasers: [7, 9], blockers: [0, 4] }
    ]
  },
  {
    name: "remake #8 HARD Quartu 1/3 2:36",
    difficulty: "Hard",
    ports: [0, 3, 4, 7, 8],
    rings: [
      null,
      { lasers: [5, 6], blockers: [], disabled: true },
      { lasers: [1, 4, 5], blockers: [], disabled: true },
      { lasers: [2, 7], blockers: [4, 5] }
    ]
  },
  {
    name: "remake #9 Quartu 4:50",
    difficulty: "Easy",
    ports: [0, 2, 3, 5, 10],
    rings: [
      null,
      { lasers: [0], blockers: [3], disabled: true },
      { lasers: [9, 10, 11], blockers: [], disabled: true },
      { lasers: [3, 5], blockers: [] }
    ]
  },
  {
    name: "remake #9 Hard Quartu 3/3 3:22",
    difficulty: "Hard",
    ports: [0, 4, 7, 8],
    rings: [
      null,
      { lasers: [3, 6, 11], blockers: [2, 10], disabled: true },
      { lasers: [2, 10], blockers: [5, 7, 11], disabled: true },
      { lasers: [1], blockers: [3] }
    ]
  },
  {
    name: "remake #10 Quartu 5:33",
    difficulty: "Easy",
    ports: [0, 3, 4, 7],
    rings: [
      { lasers: [0], blockers: [], disabled: true },
      { lasers: [11], blockers: [0, 3, 6, 7, 9], disabled: true },
      { lasers: [5], blockers: [], disabled: true },
      { lasers: [2], blockers: [1, 4, 5] }
    ]
  },
  {
    name: "remake #10 HARD - Quartu 2/3 2:56",
    difficulty: "Hard",
    ports: [1, 2, 9, 10, 11],
    rings: [
      { lasers: [9], blockers: [0], disabled: true },
      { lasers: [4], blockers: [2], disabled: true },
      { lasers: [11], blockers: [10], disabled: true },
      { lasers: [7, 11], blockers: [8, 9, 10] }
    ]
  },

  {
    name: "remake #12 HARD Pokitaru 2/2 2:14",
    difficulty: "Hard",
    ports: [1, 4, 6, 7, 11],
    rings: [
      null,
      { lasers: [3, 10], blockers: [], disabled: true },
      { lasers: [4], blockers: [1, 3, 8], disabled: true },
      { lasers: [1, 8], blockers: [] }
    ]
  },
  {
    name: "remake #13 Deplanetized 7:33",
    difficulty: "Easy",
    ports: [6, 7, 9],
    rings: [
      { lasers: [3], blockers: [5, 11], disabled: true },
      { lasers: [7], blockers: [0, 2, 5], disabled: true },
      { lasers: [2], blockers: [3, 11], disabled: true },
      { lasers: [8], blockers: [0, 3] }
    ]
  },
  {
    name: "remake HARD #13 Deplanetizer 1/4 3:39",
    difficulty: "Hard",
    ports: [2, 4, 7, 11],
    rings: [
      { lasers: [11], blockers: [4], disabled: true },
      { lasers: [1, 11], blockers: [2], disabled: true },
      { lasers: [8], blockers: [6, 11], disabled: true },
      { lasers: [7, 11], blockers: [] }
    ]
  },
  {
    name: "remake #14 Deplanetizer 8:21",
    difficulty: "Easy",
    ports: [1, 2, 6, 9],
    rings: [
      { lasers: [5], blockers: [1], disabled: true },
      { lasers: [5], blockers: [3, 6, 9], disabled: true },
      { lasers: [6], blockers: [2], disabled: true },
      { lasers: [8], blockers: [6] }
    ]
  },
  {
    name: "remake #14 Deplanetizer 2/4 4:00",
    difficulty: "Hard",
    ports: [6, 7, 8, 9],
    rings: [
      { lasers: [3, 5], blockers: [], disabled: true },
      { lasers: [7], blockers: [2, 5], disabled: true },
      { lasers: [0, 4], blockers: [1, 9], disabled: true },
      { lasers: [10], blockers: [6] }
    ]
  },
  {
    name: "remake #15 Deplanetizer 9:02",
    difficulty: "Easy",
    ports: [4, 6, 8, 11],
    rings: [
      { lasers: [5], blockers: [2, 6], disabled: true },
      { lasers: [2], blockers: [11], disabled: true },
      { lasers: [8], blockers: [0, 1, 10], disabled: true },
      { lasers: [0], blockers: [3, 8] }
    ]
  },
  {
    name: "remake #15 HARD Deplanetizer 3/4 4:19",
    difficulty: "Hard",
    ports: [3, 6, 8, 11],
    rings: [
      { lasers: [5], blockers: [6], disabled: true },
      { lasers: [1, 8], blockers: [4, 11], disabled: true },
      { lasers: [8], blockers: [0, 1, 10], disabled: true },
      { lasers: [0, 5], blockers: [8] }
    ]
  },
  {
    name: "remake #16 Deplanetizer 9:50",
    difficulty: "Easy",
    ports: [0, 1, 2, 4, 11],
    rings: [
      { lasers: [6], blockers: [5], disabled: true },
      { lasers: [10], blockers: [1, 7], disabled: true },
      { lasers: [9, 11], blockers: [0], disabled: true },
      { lasers: [3, 5], blockers: [1, 6] }
    ]
  },
  {
    name: "DEBUG",
    difficulty: "Easy",
    ports: [6, 5],
    rings: [
      { lasers: [], blockers: [] },
      { lasers: [], blockers: [] },
      { lasers: [], blockers: [] },
      { lasers: [0], blockers: [] }
    ]
  }

  // {
  //   name: "orginal #1 Aridia",
  //   difficulty: "Easy",
  //   ports: [0, 4, 8],
  //   rings: [
  //     null,
  //     { lasers: [9], blockers: [] },
  //     { lasers: [11], blockers: [] },
  //     { lasers: [1], blockers: [] }
  //   ]
  // },

  // {
  //   name: "original #2 Eudora",
  //   difficulty: "Easy",
  //   ports: [4, 5, 7, 9],
  //   rings: [
  //     null,
  //     { lasers: [2], blockers: [] },
  //     { lasers: [3], blockers: [] },
  //     { lasers: [0, 11], blockers: [] }
  //   ]
  // },

  // {
  //   name: "original #3 Eudora #2",
  //   difficulty: "Easy",
  //   ports: [6, 8, 9, 11],
  //   rings: [
  //     null,
  //     { lasers: [0], blockers: [] },
  //     { lasers: [3], blockers: [11] },
  //     { lasers: [4, 6], blockers: [] }
  //   ]
  // }
];

export default STAGES;
