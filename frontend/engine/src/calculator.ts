import { Calculation } from "./calculation.ts";
import { Lexer } from "./lexer.ts";
import { operations } from "./operations.ts";

export class Calculator {
  #lexer: Lexer;

  constructor(operationMap = operations) {
    this.#lexer = new Lexer(operationMap);
  }

  calculate(input: string) {
    const trimmed_input = input.trim();
    const nodes = this.#lexer.parse(trimmed_input);

    const calculation = new Calculation(nodes);
    return calculation.reduce();
  }

  showSteps(input: string) {
    const trimmed_input = input.trim();
    const nodes = this.#lexer.parse(trimmed_input);

    const calculation = new Calculation(nodes);
    return calculation.getSteps();
  }
}
