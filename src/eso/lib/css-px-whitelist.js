// https://github.com/jquery/jquery/blob/438b1a3e8a52d3e4efd8aba45498477038849c97/src/css/isAutoPx.js

const ralphaStart = /^[a-z]/;

// The regex visualized:
//
//                         /----------\
//                        |            |    /-------\
//                        |  / Top  \  |   |         |
//         /--- Border ---+-| Right  |-+---+- Width -+---\
//        |                 | Bottom |                    |
//        |                  \ Left /                     |
//        |                                               |
//        |                              /----------\     |
//        |          /-------------\    |            |    |- END
//        |         |               |   |  / Top  \  |    |
//        |         |  / Margin  \  |   | | Right  | |    |
//        |---------+-|           |-+---+-| Bottom |-+----|
//        |            \ Padding /         \ Left /       |
// BEGIN -|                                               |
//        |                /---------\                    |
//        |               |           |                   |
//        |               |  / Min \  |    / Width  \     |
//         \--------------+-|       |-+---|          |---/
//                           \ Max /       \ Height /
const rautoPx = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;

export function isAutoPx(prop) {
  // The first test is used to ensure that:
  // 1. The prop starts with a lowercase letter (as we uppercase it for the second regex).
  // 2. The prop is not empty.
  return (
    ralphaStart.test(prop) &&
    rautoPx.test(prop[0].toUpperCase() + prop.slice(1))
  );
}
