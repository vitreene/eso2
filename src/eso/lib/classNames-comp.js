// remplace, /force-remplace, +add, -remove, :toggle, *temporaire ?
// amélioration : multi classes

export function setClassNames(getClasses, classNames, defaultClassNames = "") {
	!Array.isArray(classNames) && (classNames = [classNames]);
	!Array.isArray(defaultClassNames) &&
		(defaultClassNames = [defaultClassNames]);

	let newClassNames = [];
	let newClassName = [];
	// TODO accepter un tableau

	for (const getClass of getClasses.split(" ").filter(Boolean)) {
		const newClass = typeof getClass === "string" && {
			operator: getClass.substr(0, 2),
			name: getClass.slice(2)
		};
		// console.log("newClass", newClass);

		if (newClass) {
			const isInList = classNames.indexOf(newClass.name) > -1;
			switch (newClass.operator) {
				// ajouter class
				case "+=":
					newClassName = isInList
						? classNames
						: classNames.concat(newClass.name);

					break;
				// remove class
				case "-=":
					newClassName =
						newClassName + " " + classNames.filter(cl => cl !== newClass.name);
					break;
				//toggle class
				case ":=":
					newClassName = isInList
						? classNames.filter(cl => cl !== newClass.name)
						: classNames.concat(newClass.name);
					break;
				// ?? uniquement cette classe
				case "/=":
					newClassName = newClass.name;
					break;
				// sinon remplacer tout
				default:
					newClassName = defaultClassNames.concat(getClass);
					break;
			}
		} else newClassName = classNames;
		newClassNames.push(newClassName);
	}
	return newClassNames;
}
