import { DEFAULT_DURATION } from "../../data/constantes";
import { effect } from "./effect";

/* 
propTo :
- object : {effect: 'FadeIn', duration: 500}
- object : { ...to, duration ? }
// déprécié
- string : 'FadeIn'

*/

export function selectTransition(propTo, propFrom) {
	let actualTo;
	switch (true) {
		case typeof propTo === "string":
			actualTo = { to: effect[propTo].to, duration: DEFAULT_DURATION };
			break;
		case !!propTo.effect:
			actualTo = {
				to: effect[propTo.effect].to,
				duration: propTo.duration || DEFAULT_DURATION
			};
			break;

		default:
			const { duration = DEFAULT_DURATION, ...to } = propTo;
			actualTo = { to, duration };
			break;
	}
	let from = propFrom;

	if (!propFrom || Object.keys(propFrom).length === 0) {
		switch (true) {
			case typeof propTo === "string":
				from = effect[propTo].from;
				break;
			case !!propTo.effect:
				from = effect[propTo.effect].from;
				break;

			default:
				break;
		}
	}

	const transition = {
		from,
		...actualTo
	};

	return transition;
}
/*   let transition;
  if (typeof propTo === "string")
    transition = {
      from,
      duration: DEFAULT_DURATION, // personnaliser
      to: propTo
    };
  else {
    const { duration = DEFAULT_DURATION, ...to } = propTo;
    transition = {
      from,
      duration,
      to
    };
  }
 */
