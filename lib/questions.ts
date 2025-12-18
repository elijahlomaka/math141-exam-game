export type ExamQuestion = {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

// Placeholder question bank (to be replaced later)
export const PLACEHOLDER_QUESTIONS: ExamQuestion[] = [
  {
    id: "q1",
    prompt: "Which HTTP method is typically used to retrieve data?",
    choices: ["POST", "GET", "PUT", "DELETE"],
    correctIndex: 1,
  },
  {
    id: "q2",
    prompt: "In JavaScript, what does `Array.prototype.map()` return?",
    choices: [
      "A new array",
      "The original array mutated",
      "A single value",
      "A Promise",
    ],
    correctIndex: 0,
  },
  {
    id: "q3",
    prompt: "Which of these is a valid CSS length unit?",
    choices: ["px", "ptx", "xp", "pp"],
    correctIndex: 0,
  },
  {
    id: "q4",
    prompt: "What does SQL stand for?",
    choices: [
      "Structured Query Language",
      "Simple Query Language",
      "Standard Question Language",
      "System Query Logic",
    ],
    correctIndex: 0,
  },
  {
    id: "q5",
    prompt: "Which data structure uses FIFO order?",
    choices: ["Stack", "Queue", "Tree", "Graph"],
    correctIndex: 1,
  },
  {
    id: "q6",
    prompt: "In Git, which command creates a new branch?",
    choices: ["git branch <name>", "git switch --delete", "git reset --hard", "git fetch --prune"],
    correctIndex: 0,
  },
  {
    id: "q7",
    prompt: "What is the time complexity of binary search on a sorted array?",
    choices: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctIndex: 1,
  },
  {
    id: "q8",
    prompt: "Which of these is NOT a primitive type in JavaScript?",
    choices: ["string", "number", "boolean", "object"],
    correctIndex: 3,
  },
  {
    id: "q9",
    prompt: "What does JSON stand for?",
    choices: [
      "Java Standard Output Network",
      "JavaScript Object Notation",
      "Joined String Object Notation",
      "Java Source Object Name",
    ],
    correctIndex: 1,
  },
  {
    id: "q10",
    prompt: "Which symbol begins a single-line comment in TypeScript/JavaScript?",
    choices: ["<!--", "//", "/*", "#"],
    correctIndex: 1,
  },
  {
    id: "q11",
    prompt: "Which HTML element is used for the largest heading by default?",
    choices: ["<h1>", "<heading>", "<head>", "<title>"],
    correctIndex: 0,
  },
  {
    id: "q12",
    prompt: "In React, which hook is used for component state?",
    choices: ["useMemo", "useEffect", "useState", "useRef"],
    correctIndex: 2,
  },
];

export function shuffle<T>(items: readonly T[]): T[] {
  const arr = items.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

