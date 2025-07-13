export interface Question {
  id: number;
  question: string;
  description: string;
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string;
    answer_f: string;
  };
  multiple_correct_answers: string; // "true" or "false"
  correct_answers: {
    answer_a_correct: string; // "true" or "false"
    answer_b_correct: string; // "true" or "false"
    answer_c_correct: string; // "true" or "false"
    answer_d_correct: string; // "true" or "false"
    answer_e_correct: string; // "true" or "false"
    answer_f_correct: string; // "true" or "false"
  };
  category: string;
  difficulty: string;
  tags: Array<{ name: string }>;
}