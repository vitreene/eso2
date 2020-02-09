import hyper from "hyperhtml";

class Clock extends hyper.Component {
  get defaultState() {
    return { date: new Date() };
  }

  onclick() {
    console.log("click");
    this.date();
  }

  onconnected() {
    console.log("finally live", this);
    setInterval(() => {
      this.date();
    }, 1000);
  }
  date() {
    this.setState({ date: new Date() });
  }
  render() {
    return this.html`
      <div onconnected=${this}>
        <h1>Hello, world!</h1>
  <div onclick=${this}>It is <p>${this.state.date.toLocaleTimeString()}</p>.</div>
      </div>`;
  }
}

const clock = new Clock();
hyper(document.body)`${clock}`;

console.log("clock", clock);
setTimeout(
  () => clock.setState({ date: new Date("01 Jan 1970 00:00:00 GMT") }),
  1000
);
