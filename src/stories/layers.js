// import { wire } from "hyperhtml";

export const grid_01_styles = `
      #grid-01 {
        position: absolute;
        top:0;
        left:0;
        display: grid;
        margin: 2rem;
        grid-template-columns: 6fr 4fr;
        grid-template-rows: 4fr 3fr repeat(3, 1fr);
        width: calc(100% - 4rem);
        height: calc(100vmin - 4rem);
      }

      #grid-01_s01 {
        grid-column: 1 / 3;
        grid-row: 1;
      }

      #grid-01_s02 {
        grid-column: 1;
        grid-row: 2/6;
      }

      #grid-01_s03 {
        grid-row: 2;
      }
      #grid-01_s04,
      #grid-01_s05,
      #grid-01_s06 {
        grid-column: 2;
      }
      .grid-item {
        outline: 2px solid green;
      }
    
`;

export const fond_styles = `
      #fond {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-items: center;
      }`;

// export const grid_01 = wire()`
//   <section id="grid-01">
//       <article class="grid-item" id="grid-01_s01">01</article>
//       <article class="grid-item" id="grid-01_s02">02</article>
//       <article class="grid-item" id="grid-01_s03">03</article>
//       <article class="grid-item" id="grid-01_s04">04</article>
//       <article class="grid-item" id="grid-01_s05">05</article>
//       <article class="grid-item" id="grid-01_s06">06</article>
//     </section>
// `;
