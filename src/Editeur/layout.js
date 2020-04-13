import { render, html } from "lighterhtml";

export const main = document.getElementById("app");
export const app = (scene, editor) =>
  render(
    main,
    html`
      ${scene} ${editor}
    `
  );

export const scene = (elems) =>
  html`
    <div id="scene">
      ${elems.map(
        (el) =>
          html`
            <div id=${el} class="elem">${el}</div>
          `
      )}
    </div>
  `;
export const editor = (edit) =>
  html`
    <div id="editor">${edit}</div>
  `;
