export default class DateTime {
  constructor(
    private elementDate: HTMLDivElement | null = document.querySelector("#datetime > div:nth-child(2)"),
    private elementTime: HTMLTimeElement | null = document.querySelector("#datetime time")
  ) {
    this.renderizar();
    setInterval(() => this.renderizar(), 1000)
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
    this.time = `${hour}${colon}${minute}`
  }

  set date(content: string) {
    if (this.elementDate) this.elementDate.innerHTML = content
  }

  set time(content: string) {
    if (this.elementTime) this.elementTime.innerHTML = content
  }
}
