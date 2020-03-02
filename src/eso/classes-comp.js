import { cx } from "emotion";

export const doClasses = {
	update(props, state) {
		return props;
	},
	prerender(...classNames) {
		return cx(classNames);
	}
};
