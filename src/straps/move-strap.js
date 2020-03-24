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

export function moveStrap(emitter) {
  return class Move {
    constructor(data) {
      this.data = data;
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
      const relative = {
        x: newPointer.x - this.pointer.x,
        y: newPointer.y - this.pointer.y
      };
      const relativePointer = {
        x: `${relative.x < 0 ? "-" : "+"}=${Math.abs(relative.x) / zoom.value}`,
        y: `${relative.y < 0 ? "-" : "+"}=${Math.abs(relative.y) / zoom.value}`
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
      const dynStyle = {
        pointerEvents: this.pointerEvents,
        left: `${this.pointer.x < 0 ? "-" : "+"}=${Math.abs(
          this.pointer.x / zoom.value
        )}`,
        top: `${this.pointer.y < 0 ? "-" : "+"}=${Math.abs(
          this.pointer.y / zoom.value
        )}`,
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
      console.log("POINTERDOWN", id, event);
      console.log("e", e);
      e.preventDefault();

      this.pointerEvents = e.target.style.pointerEvents || "";

      emitter.emit([DEFAULT_NS, event], {
        position: { pointerEvents: "none" }
      });

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
