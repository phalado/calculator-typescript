import DateTime from "./DateTime.js";
import Operation from "./Operation.js";
import Screen from "./Screen.js";

export default class CalculatorControl {
  constructor(
    private screen = new Screen(),
    private operation = new Operation({
      onCalculated: (result: string) => this.screen.content = result
    }),
    private dateTime = new DateTime()
  ) {
    this.eventsButtons();
  }

  static NUMBER_BUTTONS: string[] = [
    'zero', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'
  ]
  
  static OPERATION_NUMBERS: string[] = [
    'adicao', 'subtracao', 'divisao', 'multiplicacao'
  ]
  
  defaultOptions: Object = {
    ponto: () => this.addPoint(),
    limpar: () => this.clean(),
    desfazer: () => this.undo(),
    porcentagem: () => this.percent(),
    igual: () => this.calculate()
  }

  clean(): void {
    this.operation.clean();
    this.screen.content = "0"
    this.dateTime.symbol = ""
  }

  undo(): void {
    if(this.operation.lastPosition === "0") return

    if (isNaN(Number(this.operation.lastPosition))) {
      this.operation.undo();
      this.dateTime.symbol = ""
    } else {
      const str: string = this.operation.lastPosition
      this.operation.lastPosition = str.substring(0, str.length - 1)
      this.screen.content = this.operation.lastPosition
    }
  }

  calculate(): void {
    this.operation.calculate();
    this.dateTime.symbol = ""
  }

  percent(): void {
    if (this.operation.length < 3) {
      this.addOperator('/')
      this.addNumber(100)
    } else if (this.operation.secondPosition === "*") {
      this.operation.lastPosition = (Number(this.operation.lastPosition) / 100).toString();
    } else {
      const number: number = (Number(this.operation.lastPosition) * 100) / Number(this.operation.firstPosition)
      this.operation.lastPosition = number.toString()
    }

    this.calculate()
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

    this.dateTime.symbol = operator;
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

  addPoint(): void {
    let number: string;

    if (isNaN(Number(this.operation.lastPosition))) {
      number = "0."
    } else {
      number = this.operation.lastPosition.toString() + "."
    }
    
    this.addOperation(number)
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
