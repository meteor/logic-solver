declare module 'logic-solver' {
  type Term = number | string
  const FALSE: Term
  const TRUE: Term
  function isTerm(value: any): value is Term
  function isNameTerm(value: any): value is string
  function isNumTerm(value: any): value is number

  type Operand = Term | Formula
  type Operands = Operand | ArrayOfOperands
  interface ArrayOfOperands extends Array<Operands> {}

  class Solver {
    constructor()
    toNameTerm(term: Term): string
    toNumTerm(term: Term, noCreate?: boolean): number
    require(...args: Operands[]): void
    forbid(...args: Operands[]): void
    solve(): Solution | null
    solveAssuming(assumption: Operand): Solution | null
    minimizeWeightedSum(solution: Solution, formulas: Operand[], weights: number[] | number): Solution | null
    maximizeWeightedSum(solution: Solution, formulas: Operand[], weights: number[] | number): Solution | null
  }

  interface Formula {}
  function isFormula(value: any): value is Formula
  function not(operand: Operand): Formula
  function or(...operands: Operands[]): Formula
  function and(...operands: Operands[]): Formula
  function xor(...operands: Operands[]): Formula
  function implies(operand1: Operand, operand2: Operand): Formula
  function equiv(operand1: Operand, operand2: Operand): Formula
  function exactlyOne(...operands: Operands[]): Formula
  function atMostOne(...operands: Operands[]): Formula

  function disablingAssertions<A>(func: () => A): A

  interface Solution {
    getMap(): Record<string, boolean>
    getTrueVars(): string[]
    evaluate(expression: Term | Formula): boolean
    evaluate(expression: Bits): number
    getFormula(): Formula
    getWeightedSum(formula: (Operand | Bits)[], weights: number[]): number
    ignoreUnknownVariables(): void
  }

  class Bits {
    constructor(formulas: Operand[])
  }
  function isBits(value: any): value is Bits
  function constantBits(wholeNumber: number): Bits
  function variableBits(baseName: string, N: number): Bits
  function equalBits(bits1: Bits, bits2: Bits): Formula
  function lessThan(bits1: Bits, bits2: Bits): Formula
  function lessThanOrEqual(bits1: Bits, bits2: Bits): Formula
  function greaterThan(bits1: Bits, bits2: Bits): Formula
  function greaterThanOrEqual(bits1: Bits, bits2: Bits): Formula
  function sum(...operands: (Operand | Bits)[]): Bits
  function weightedSum(formulas: (Operand | Bits)[], weights: number[] | number): Bits
}
