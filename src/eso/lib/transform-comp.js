const tList = {
	x: "translateX",
	y: "translateY",
	r: "rotate",
	dX: "matrixX",
	dY: "matrixY"
};

export function extractTransform(oldStyle) {
	const style = {};
	const transform = {};
	for (const prop in oldStyle) {
		tList[prop]
			? (transform[prop] = oldStyle[prop])
			: (style[prop] = oldStyle[prop]);
	}
	return { style, transform };
}

export function withTransform(props) {
	const { dX, dY, ...other } = props;

	let transform = "";
	for (const tr in other) {
		const unit = tr === "rotate" ? "deg" : "px";
		transform += tList[tr] + "(" + other[tr] + unit + ") ";
	}
	if (dX || dY) {
		transform += ` matrix(1,0,0,1,${dX || 0},${dY || 0})`;
	}
	return { transform };
}
