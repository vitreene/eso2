import { zoom } from "../runtime";
import { DEFAULT_NS, STRAP } from "../data/constantes";
/* 
- pointeur lit la position de la souris / touch
-> emet : 
- position
- decalage depuis le debut, 
- decalage depuis la precedente mesure
- move/id : lit l'id et le decalage, envoie un event ciblé.: 
-  il peut emetre deux events à la fois : le complet et le ciblé.

TODO 
- observables.fromEvent
- touch events
- des parametres sont envoyés à pointeur qui filtre ce qu'il veut recevoir. 
*/

/* 
FIXME : au mousedown, la position verticale du pointer est mal calculée, ce qui entraine un décalage en débutt de déplacement. 
cependant, en modifiant la css de #app, puis en la rétablissant, le déplacmeent est ensuite correct...
*/

export function moveStrap(emitter) {
  return class Move {
    constructor(data) {
      console.log("DATA", data);
      this.data = data;
      // store : quelques propriétés de l'objet (scale, rotate...)
      this.store = null;
      this.down();
      this.below = null;
      this.pointerEvents = null;
    }

    initialMousePosition = {
      x: 0,
      y: 0
    };
    pointer = {
      x: 0,
      y: 0
    };

    move = e => {
      const { id, event } = this.data;
      // sous le pointer
      const below = document.elementFromPoint(e.clientX, e.clientY);
      const belowChanged = below && below.id !== this.below;
      const absPointer = {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      };

      const newPointer = {
        x: absPointer.x - this.initialMousePosition.x,
        y: absPointer.y - this.initialMousePosition.y
      };

      // const relative = {
      //   x: newPointer.x - this.pointer.x,
      //   y: newPointer.y - this.pointer.y
      // };

      // const sign = {
      //   x: relative.x < 0 ? "-" : "+",
      //   y: relative.y < 0 ? "-" : "+"
      // };

      const distance = hypothenuse(newPointer.x, newPointer.y);
      const angle = Math.atan2(newPointer.y, newPointer.x);

      const coords = {
        x: distance * Math.cos(angle - this.store.rotate) * this.store.scale,
        y: distance * Math.sin(angle - this.store.rotate) * this.store.scale
      };

      const relativePointer = {
        x: `${newPointer.x / zoom.value}`,
        y: `${newPointer.y / zoom.value}`
        // x: `${coords.x / zoom.value}`,
        // y: `${coords.y / zoom.value}`
      };

      // diffuser l'event
      if (belowChanged) {
        emitter.emit([STRAP, "guard_hover"], {
          leave: this.below,
          hover: below.id,
          id,
          event
        });

        this.below = below.id;
      }
      emitter.emit([DEFAULT_NS, event], {
        dynStyle: {
          dX: relativePointer.x,
          dY: relativePointer.y
        }
      });
      emitter.emit([STRAP, "pointer"], {
        relativeFromStart: newPointer,
        relativeFromLast: relativePointer,
        pointerFromStart: this.pointer,
        pointeur: absPointer
      });

      this.pointer = newPointer;
    };

    up = e => {
      e.preventDefault();

      const { id, event } = this.data;
      document.removeEventListener("pointermove", this.move);
      document.removeEventListener("pointerup", this.up);

      // top, left sur le composant, x,y pour le support
      const sign = {
        x: this.pointer.x < 0 ? "-" : "+",
        y: this.pointer.y < 0 ? "-" : "+"
      };

      const dynStyle = {
        pointerEvents: this.pointerEvents,
        left: `${sign.x}=${Math.abs(this.pointer.x / zoom.value)}`,
        top: `${sign.y}=${Math.abs(this.pointer.y / zoom.value)}`,
        dX: 0,
        dY: 0
      };

      const absPointer = {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      };
      emitter.emit([DEFAULT_NS, event], {
        dynStyle
      });

      emitter.emit([STRAP, "end_" + event], {
        id,
        event,
        dynStyle,
        pointer: absPointer,
        target: this.below
      });
    };

    down = () => {
      const { id, event, e } = this.data;
      e.preventDefault();
      const store = this.data.store();
      this.store = {
        scale: (store.scale && 1 / store.scale) || 1,
        rotate: (store.rotate && (store.rotate * Math.PI) / 180) || 0
      };
      console.log("POINTERDOWN", id, event, this.store);

      document.addEventListener("pointermove", this.move);
      document.addEventListener("pointerup", this.up);

      this.initialMousePosition = {
        x: e.clientX,
        y: e.clientY
      };

      this.pointer = {
        x: 0,
        y: 0
      };
    };
  };
}

function hypothenuse(width, height) {
  return Math.sqrt(width * width + height * height);
}
