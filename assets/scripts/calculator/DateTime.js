export default class DateTime {
    elementDate;
    elementTime;
    elementSymbol;
    constructor(elementDate = document.querySelector("#full-date"), elementTime = document.querySelector("#datetime time"), elementSymbol = document.querySelector("#operation-symbol")) {
        this.elementDate = elementDate;
        this.elementTime = elementTime;
        this.elementSymbol = elementSymbol;
        this.renderizar();
        setInterval(() => this.renderizar(), 1000);
    }
    renderizar() {
        const dateNow = new Date();
        const day = dateNow.getDate();
        const month = dateNow.toLocaleDateString("en", { month: "long" });
        const year = dateNow.getFullYear();
        const hour = dateNow.getHours();
        const minute = dateNow.getMinutes().toString().padStart(2, '0');
        const colon = dateNow.getSeconds() % 2 === 0 ? ":" : " ";
        this.date = `${year} ${month} ${day}`;
        this.time = `${hour}${colon}${minute}`;
    }
    set date(content) {
        if (this.elementDate)
            this.elementDate.innerHTML = content;
    }
    set time(content) {
        if (this.elementTime)
            this.elementTime.innerHTML = content;
    }
    set symbol(content) {
        if (this.elementSymbol)
            this.elementSymbol.innerHTML = content;
    }
}
//# sourceMappingURL=DateTime.js.map