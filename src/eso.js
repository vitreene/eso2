import { bind as hyper, wire } from "hyperhtml";
import "./style.scss";

const slots = {
  aS: [1, 2, 3],
  bS: ["a", "b", "c", "d"],
  cS: ["888"]
};

function update() {
  hyper(document.body)`
  <div className="container">
      <section>
          ${slots["aS"]}
      </section>
      <section>
          ${slots["bS"]}
      </section>
      <section>
          ${slots["cS"]}
      </section>
  </div>
    `;
}

update(slots);
