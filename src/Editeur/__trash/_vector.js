import "./style.css";
import { render, svg } from "lighterhtml";

const bloc = (line) =>
  render(
    document.body,
    svg`<svg id="my-svg" viewBox="0 0 200 200"  xmlns="http://www.w3.org/2000/svg">
${line}
</svg>`
  );

class Vector {
  static rad2deg(theta) {
    return (theta * 180) / Math.PI;
  }
  static deg2rad(angle) {
    return (angle * Math.PI) / 180;
  }
  constructor(x = 0, y = 0) {
    this.setPoint(x, y);
  }
  setPoint(x, y) {
    this.x = x;
    this.y = y;
  }
  get distance() {
    return Math.hypot(this.x, this.y);
  }
  set distance(d) {
    const theta = this.theta;
    this.x = Math.cos(theta) * d;
    this.y = Math.sin(theta) * d;
  }
  get theta() {
    return -Math.atan2(-this.y, this.x);
  }
  set theta(theta) {
    const distance = this.distance;
    this.x = Math.cos(theta) * distance;
    this.y = Math.sin(theta) * distance;
  }

  setDelta(x, y) {
    this.dx = x;
    this.dy = y;
  }

  render() {
    bloc(
      svg`<line x1=${this.dx} y1=${this.dy} x2=${this.dx + this.x} y2=${this
        .dy + this.y} stroke="black" />`
    );
  }
}

export function Editeur() {
  const v = new Vector(20, 40);
  v.setDelta(100, 100);
  //   v.setPoint(100, 100);
  v.theta = 0.3;
  v.distance = 60;
  v.render();
  anim();

  let theta = -1;

  function anim() {
    requestAnimationFrame(function() {
      v.theta = theta * Math.PI;
      v.render();
      theta += 0.01;

      if (theta <= 10) anim();
    });
  }
}
