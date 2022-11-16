export default class DateTime {
    elementDate;
    elementTime;
    constructor(elementDate = document.querySelector("#datetime > div:nth-child(2)"), elementTime = document.querySelector("#datetime time")) {
        this.elementDate = elementDate;
        this.elementTime = elementTime;
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
}
//# sourceMappingURL=DateTime.js.map