import IOperationOptions from "../interfaces/IOperationOptions.js";

export default class Operation {
  private onCalculated: any;

  constructor(
    opts: IOperationOptions,
    private operation: string[] = []
  ) {
    this.onCalculated = opts.onCalculated;
  }

  add(value: string): number {
    if (this.operation.length === 3) this.calculate()

    return this.operation.push(value);
  }

  getResult(): string {
    let result: string = "0";

    try {
      result = (eval(this.operation.join(''))).toString();
    } catch (e) {
      result = "ERROR"
    }

    return result
  }

  clean(): void {
    this.operation = []
  }

  undo(): void {
    this.operation.pop();
  }

  calculate(): void {
    let result = this.getResult();

    if (result.length > 12) result = result.substring(0, 12)

    this.operation = [result]

    this.onCalculated(result)
  }

  get lastPosition(): string {
    return this.operation.length ? this.operation[this.operation.length - 1] : "0";
  }

  set lastPosition(value: string) {
    const lastIndex = this.operation.length ? this.operation.length - 1 : 0;
    this.operation[lastIndex] = value
  }

  get firstPosition(): string {
    return this.operation[0]
  }

  get secondPosition(): string {
    return this.operation[1]
  }

  get length(): number {
    return this.operation.length
  }
}
