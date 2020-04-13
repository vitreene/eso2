function dummy() {}

export class Move {
  initialMousePosition = {
    x: 0,
    y: 0,
  };
  pointer = {
    x: 0,
    y: 0,
  };

  constructor(data) {
    this.data = data;
    this.callback = data.callback || dummy;
    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
    this.down();
  }
  down() {
    const { id, e } = this.data;
    e.preventDefault();
    console.log("this.data", this.data);
    console.log("POINTERDOWN", id);
    document.addEventListener("pointermove", this.move);
    document.addEventListener("pointerup", this.up);

    this.initialMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    this.pointer = {
      x: 0,
      y: 0,
    };
  }

  move(e) {
    e.preventDefault();

    console.log("MOVE", e);

    const absPointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };

    const newPointer = {
      x: absPointer.x - this.initialMousePosition.x,
      y: absPointer.y - this.initialMousePosition.y,
    };

    this.callback(this.data.id, newPointer.x, newPointer.y);
    this.pointer = newPointer;
  }

  up(e) {
    e.preventDefault();
    console.log("UP", e);
    document.removeEventListener("pointermove", this.move);
    document.removeEventListener("pointerup", this.up);
  }
}
