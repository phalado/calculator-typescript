export default class Operation {
    operation;
    onCalculated;
    constructor(opts, operation = []) {
        this.operation = operation;
        this.onCalculated = opts.onCalculated;
    }
    add(value) {
        if (this.operation.length === 3)
            this.calculate();
        return this.operation.push(value);
    }
    getResult() {
        let result = "0";
        try {
            result = (eval(this.operation.join(''))).toString();
        }
        catch (e) {
            result = "ERROR";
        }
        return result;
    }
    clean() {
        this.operation = [];
    }
    calculate() {
        let result = this.getResult();
        if (result.length > 12)
            result = result.substring(0, 12);
        this.operation = [result];
        this.onCalculated(result);
    }
    get lastPosition() {
        return this.operation.length ? this.operation[this.operation.length - 1] : "0";
    }
    set lastPosition(value) {
        const lastIndex = this.operation.length ? this.operation.length - 1 : 0;
        this.operation[lastIndex] = value;
    }
    get length() {
        return this.operation.length;
    }
}
//# sourceMappingURL=Operation.js.map