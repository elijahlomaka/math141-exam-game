export type ExamQuestion = {
  id: number;
  question: string;
  choices: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

export const QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: "What is the value of sin(0)?",
    choices: ["-1", "0", "1", "Undefined"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What is the value of cos(0)?",
    choices: ["0", "-1", "1", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "What is the value of sin(π/2)?",
    choices: ["0", "-1", "1", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "What is the value of cos(π)?",
    choices: ["0", "-1", "1", "Undefined"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "Which angle has a sine value of -1?",
    choices: ["0", "π/2", "π", "3π/2"],
    correctIndex: 3,
  },
  {
    id: 6,
    question: "Which angle has a cosine value of 0?",
    choices: ["0", "π/2", "π", "2π"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "What is the value of tan(π/4)?",
    choices: ["0", "-1", "1", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "Which angle has an undefined tangent?",
    choices: ["0", "π/4", "π/2", "π"],
    correctIndex: 2,
  },
  {
    id: 9,
    question: "What is the period of sin(x)?",
    choices: ["π", "2π", "1", "360"],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "What is the period of cos(x)?",
    choices: ["π", "2π", "180", "1"],
    correctIndex: 1,
  },
  {
    id: 11,
    question: "What is the period of tan(x)?",
    choices: ["2π", "π", "1", "Undefined"],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "What is the range of sin(x)?",
    choices: ["(-∞, ∞)", "[0, 1]", "[-1, 1]", "(0, 1)"],
    correctIndex: 2,
  },
  {
    id: 13,
    question: "What is the range of cos(x)?",
    choices: ["[0, 1]", "[-1, 1]", "(-∞, ∞)", "[-2, 2]"],
    correctIndex: 1,
  },
  {
    id: 14,
    question: "What is the domain of tan(x)?",
    choices: ["All real numbers", "All real numbers except odd multiples of π/2", "[-1,1]", "Only integers"],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "What is the value of sin(π)?",
    choices: ["-1", "1", "0", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 16,
    question: "What is the value of cos(π/2)?",
    choices: ["1", "-1", "0", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 17,
    question: "Which trig identity is always true?",
    choices: ["sin²x + cos²x = 1", "sin x = cos x", "tan x = 1", "sin x = 0"],
    correctIndex: 0,
  },
  {
    id: 18,
    question: "If sin(x) = 0, what is the smallest positive solution?",
    choices: ["π/2", "π", "π/4", "3π/2"],
    correctIndex: 1,
  },
  {
    id: 19,
    question: "What is the value of tan(0)?",
    choices: ["1", "-1", "0", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 20,
    question: "What is the value of sin(3π/2)?",
    choices: ["1", "-1", "0", "Undefined"],
    correctIndex: 1,
  },
  {
    id: 21,
    question: "What is the value of cos(2π)?",
    choices: ["0", "-1", "1", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 22,
    question: "Which angle lies in Quadrant II?",
    choices: ["π/6", "π/3", "2π/3", "7π/4"],
    correctIndex: 2,
  },
  {
    id: 23,
    question: "In Quadrant III, which trig functions are positive?",
    choices: ["Sine only", "Cosine only", "Tangent only", "All of them"],
    correctIndex: 2,
  },
  {
    id: 24,
    question: "What is sin(-x)?",
    choices: ["sin(x)", "-sin(x)", "cos(x)", "-cos(x)"],
    correctIndex: 1,
  },
  {
    id: 25,
    question: "What is cos(-x)?",
    choices: ["-cos(x)", "sin(x)", "cos(x)", "-sin(x)"],
    correctIndex: 2,
  },
  {
    id: 26,
    question: "What is the inverse of f(x) = x + 3?",
    choices: ["x + 3", "3 - x", "x - 3", "-x - 3"],
    correctIndex: 2,
  },
  {
    id: 27,
    question: "If f(x) = 2x, what is f⁻¹(x)?",
    choices: ["2x", "x/2", "x - 2", "-2x"],
    correctIndex: 1,
  },
  {
    id: 28,
    question: "What is the domain of f(x) = √x?",
    choices: ["All real numbers", "x ≥ 0", "x > 0", "x ≤ 0"],
    correctIndex: 1,
  },
  {
    id: 29,
    question: "What is the range of f(x) = x²?",
    choices: ["All real numbers", "x ≥ 0", "y ≥ 0", "y ≤ 0"],
    correctIndex: 2,
  },
  {
    id: 30,
    question: "Which function is even?",
    choices: ["sin(x)", "tan(x)", "cos(x)", "x³"],
    correctIndex: 2,
  },
  {
    id: 31,
    question: "Which function is odd?",
    choices: ["cos(x)", "x²", "sin(x)", "|x|"],
    correctIndex: 2,
  },
  {
    id: 32,
    question: "What is sin(π/6)?",
    choices: ["√3/2", "1/2", "1", "0"],
    correctIndex: 1,
  },
  {
    id: 33,
    question: "What is cos(π/3)?",
    choices: ["0", "1/2", "√3/2", "1"],
    correctIndex: 1,
  },
  {
    id: 34,
    question: "What is tan(π/3)?",
    choices: ["1", "√3", "1/√3", "0"],
    correctIndex: 1,
  },
  {
    id: 35,
    question: "Which identity equals 1?",
    choices: ["tan x · cot x", "sin x + cos x", "sin²x", "cos x"],
    correctIndex: 0,
  },
  {
    id: 36,
    question: "If cos(x) = 1, what is x?",
    choices: ["π", "π/2", "0", "3π/2"],
    correctIndex: 2,
  },
  {
    id: 37,
    question: "What is the amplitude of y = 3sin(x)?",
    choices: ["1", "3", "6", "π"],
    correctIndex: 1,
  },
  {
    id: 38,
    question: "What does amplitude affect?",
    choices: ["Period", "Phase shift", "Height of wave", "Domain"],
    correctIndex: 2,
  },
  {
    id: 39,
    question: "What is the period of y = sin(2x)?",
    choices: ["2π", "π", "1", "π/2"],
    correctIndex: 1,
  },
  {
    id: 40,
    question: "What is the period of y = cos(x/2)?",
    choices: ["π", "2π", "4π", "π/2"],
    correctIndex: 2,
  },
  {
    id: 41,
    question: "What is sin(2π)?",
    choices: ["1", "-1", "0", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 42,
    question: "Which angle is coterminal with π/2?",
    choices: ["3π/2", "5π/2", "π", "π/4"],
    correctIndex: 1,
  },
  {
    id: 43,
    question: "What is the range of y = 2cos(x)?",
    choices: ["[-1,1]", "[-2,2]", "(-∞,∞)", "[0,2]"],
    correctIndex: 1,
  },
  {
    id: 44,
    question: "Which value is NOT in the range of sin(x)?",
    choices: ["0", "-1", "1", "2"],
    correctIndex: 3,
  },
  {
    id: 45,
    question: "What is cos(3π/2)?",
    choices: ["1", "-1", "0", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 46,
    question: "If tan(x) = -1, which angle works?",
    choices: ["π/4", "3π/4", "π/6", "π"],
    correctIndex: 1,
  },
  {
    id: 47,
    question: "What is sin(-π/2)?",
    choices: ["1", "0", "-1", "Undefined"],
    correctIndex: 2,
  },
  {
    id: 48,
    question: "Which angle has cosine equal to -1/2?",
    choices: ["π/3", "2π/3", "π/6", "5π/6"],
    correctIndex: 1,
  },
  {
    id: 49,
    question: "What is the domain of f(x) = 1/x?",
    choices: ["All real numbers", "x ≠ 0", "x > 0", "x ≥ 0"],
    correctIndex: 1,
  },
  {
    id: 50,
    question: "Which identity is correct?",
    choices: ["sin x = 1/csc x", "sin x = 1/sec x", "cos x = tan x", "tan x = cos x"],
    correctIndex: 0,
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

