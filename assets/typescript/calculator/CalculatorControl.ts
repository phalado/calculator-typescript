import DateTime from "./DateTime.js";
import Operation from "./Operation.js";
import Screen from "./Screen.js";

export default class CalculatorControl {
  constructor(
    private screen = new Screen(),
    private operation = new Operation({
      onCalculated: (result: string) => this.screen.content = result
    })
  ) {
    new DateTime
    this.eventsButtons();
  }

  static NUMBER_BUTTONS: string[] = [
    'zero', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'
  ]
  
  static OPERATION_NUMBERS: string[] = [
    'adicao', 'subtracao', 'divisao', 'multiplicacao'
  ]
  
  defaultOptions: Object = {
    ponto: () => console.log('ponto'),
    limpar: () => console.log('limpar'),
    desfazer: () => console.log("desfazer"),
    porcentagem: () => console.log('porcentagem'),
    igual: () => this.calculate()
  }

  calculate(): void {
    this.operation.calculate();
  }

  addOperation(value: string): void {
    this.operation.add(value)
  }

  addOperator(operator: string): void {
    if (isNaN(Number(this.operation.lastPosition))) {
      this.operation.lastPosition = operator;
    } else {
      if (this.operation.length === 0) this.addOperation("0")

      this.addOperation(operator)
    }
  }

  addNumber(number: number): void {
    if (isNaN(Number(this.operation.lastPosition))) {
      this.addOperation(number.toString())
    } else {
      number = Number(this.operation.lastPosition.toString() + number.toString())
      this.operation.lastPosition = number.toString();
    }

    this.screen.content = number.toString()
  }

  eventsButtons(): void {
    document.querySelectorAll("#teclado button").forEach(element => {
      element.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLButtonElement

        switch (true) {
          case CalculatorControl.NUMBER_BUTTONS.includes(target.id):
            this.addNumber(Number(target.dataset.valor))
            break;
          case CalculatorControl.OPERATION_NUMBERS.includes(target.id):
            this.addOperator(String(target.dataset.valor))
            break;
          default:
            (this.defaultOptions as any)[target.id]()
            break;
        }
      })
    })
  }
}
