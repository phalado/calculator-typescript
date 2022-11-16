export default class Screen {
    element;
    constructor(element = document.querySelector("#values")) {
        this.element = element;
        this.content = "0";
    }
    set content(value) {
        if (value.toString().length > 12)
            value = "ERROR";
        if (this.element)
            this.element.innerHTML = value;
    }
    get content() {
        return this.element?.innerHTML || "0";
    }
}
//# sourceMappingURL=Screen.js.map