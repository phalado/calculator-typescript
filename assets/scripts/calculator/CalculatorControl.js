import DateTime from "./DateTime.js";
import Operation from "./Operation.js";
import Screen from "./Screen.js";
export default class CalculatorControl {
    screen;
    operation;
    dateTime;
    constructor(screen = new Screen(), operation = new Operation({
        onCalculated: (result) => this.screen.content = result
    }), dateTime = new DateTime()) {
        this.screen = screen;
        this.operation = operation;
        this.dateTime = dateTime;
        this.eventsButtons();
    }
    static NUMBER_BUTTONS = [
        'zero', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'
    ];
    static OPERATION_NUMBERS = [
        'adicao', 'subtracao', 'divisao', 'multiplicacao'
    ];
    defaultOptions = {
        ponto: () => console.log('ponto'),
        limpar: () => this.clean(),
        desfazer: () => console.log("desfazer"),
        porcentagem: () => console.log('porcentagem'),
        igual: () => this.calculate()
    };
    clean() {
        this.operation.clean();
        this.screen.content = "0";
        this.dateTime.symbol = "";
    }
    calculate() {
        this.operation.calculate();
    }
    addOperation(value) {
        this.operation.add(value);
    }
    addOperator(operator) {
        if (isNaN(Number(this.operation.lastPosition))) {
            this.operation.lastPosition = operator;
        }
        else {
            if (this.operation.length === 0)
                this.addOperation("0");
            this.addOperation(operator);
        }
        this.dateTime.symbol = operator;
    }
    addNumber(number) {
        if (isNaN(Number(this.operation.lastPosition))) {
            this.addOperation(number.toString());
        }
        else {
            number = Number(this.operation.lastPosition.toString() + number.toString());
            this.operation.lastPosition = number.toString();
        }
        this.screen.content = number.toString();
    }
    eventsButtons() {
        document.querySelectorAll("#teclado button").forEach(element => {
            element.addEventListener("click", (event) => {
                const target = event.target;
                switch (true) {
                    case CalculatorControl.NUMBER_BUTTONS.includes(target.id):
                        this.addNumber(Number(target.dataset.valor));
                        break;
                    case CalculatorControl.OPERATION_NUMBERS.includes(target.id):
                        this.addOperator(String(target.dataset.valor));
                        break;
                    default:
                        this.defaultOptions[target.id]();
                        break;
                }
            });
        });
    }
}
//# sourceMappingURL=CalculatorControl.js.map