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
    difficulty: "Easy",
    name: "remake #4 Nebula G34 1:56",
    ports: [0, 1, 2],
    rings: [
      null,
      { lasers: [2], blockers: [3, 4, 5, 9, 10, 11] },
      { lasers: [9], blockers: [0, 1, 5, 6, 7, 10, 11] },
      { lasers: [2], blockers: [0, 1, 3, 4, 5, 6, 7, 11] }
    ]
  },
  {
    difficulty: "Easy",
    name: "remake #5 Nebula G34 2:27",
    ports: [1, 2, 4, 6],
    rings: [
      null,
      { lasers: [10, 11], blockers: [] },
      { lasers: [5, 7], blockers: [] },
      null
    ]
  },
  {
    difficulty: "Easy",
    name: "remake #6 Batalia 3:00",
    ports: [6, 8, 9, 11],
    rings: [
      null,
      { lasers: [3, 5], blockers: [10] },
      { lasers: [11], blockers: [6, 8] },
      { lasers: [10], blockers: [3, 5, 9] }
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
