/** 
la fonction onScene gere le flux des objets.
- liste le contenu de chaque slot,
- pour chaque element, 
    - dans quel slot il se trouve,
    - son statut : entre (enter), sort (exit), deplacé
    - déplacement : 
        - retrait de l'emplacement (unmount),
        - ajout dans le nouvel emplacement (mount)
        
    ces événements sont transmis à l'objet lui-meme
*/

/**
    * Slots : collection des ids des slots: pour chaque slot, liste des valets
    * onScene: liste des valets visibles, dans leur slot
    * update, propiétés employées : 
        * layer et slot pour créer slotId
        * id du Valet
    * fonctions :
        * enter: ajouter un composant à onscene
        * move: deplacement d'un slot à un autre
        * reorder: changement de position dans un slot
        * leave : retrait de onScene (async)
   
    onScene renvoie :
    les ids des slots à updater
    l'objet update augmenté
        - reslot
        - enter
        - leave (callback)

    onScene précede la phase d'update du composant lui-meme
    
*/

/* 
simplifier leave :
- le Valet recoit le flag "exit"
- en fin de transition, il emet un event "leave" 
- le composant est retiré de la scène.
*/

/* 
- reslot est géré à part, avant update
- il faut pouvoir ensuite lire sa nouvelle position , puis le mettre a jour avant rafraichissement de l'écran
    // reslot : position du node avant et après déplacement
    // créer une transition
    // le tout avant réaffichage
*/

//TODO ecrire les tests
export function createOnScene(slots) {
	// if (!slots || typeof slots !== "object") return false;
	if (!slots || !(slots instanceof Map)) return false;
	const _slots = new Map(Array.from(slots.keys(), id => [id, []]));
	const _onScene = new Map();

	return function onScene(update) {
		let action = update => ({ changed: null, update });
		if (!update.id) return getError("id", update);
		if (_onScene.has(update.id)) {
			const isLeaving = update.leave;
			const changeSlot = update.layer && update.slot;
			changeSlot && (action = moveToSlot);
			isLeaving && (action = leaveScene);
		} else action = addToScene;

		return action(update);
	};

	function addToScene(update) {
		const slotId = getSlotId(update);
		if (!slotId || !_slots.has(slotId)) return getError("slot", update);

		// TODO trier selon l'ordre
		const inslot = _slots.get(slotId).concat(update.id);
		_slots.set(slotId, inslot);
		_onScene.set(update.id, slotId);
		const changed = { add: [slotId, inslot] };
		return {
			changed,
			update: { ...update, enter: true }
		};
	}
	function moveToSlot(update) {
		const oldSlotId = _onScene.get(update.id);
		const slotId = getSlotId(update);

		const oldInslot = _slots.get(oldSlotId).filter(s => s !== update.id);
		if (!_slots.get(slotId)) return getError("move", update);

		const inslot = _slots.get(slotId).concat(update.id);
		_slots.set(oldSlotId, oldInslot);
		_slots.set(slotId, inslot);
		_onScene.set(update.id, slotId);

		const changed = {
			remove: [oldSlotId, oldInslot],
			add: [slotId, inslot]
		};
		return {
			changed,
			update: { ...update, reslot: true }
		};
	}

	function leaveScene(update) {
		const { id } = update;
		const slotId = _onScene.get(id);
		const inslot = _slots.get(slotId).filter(s => s !== id);
		_slots.set(slotId, inslot);
		_onScene.delete(id);
		const changed = { remove: [slotId, inslot] };
		return {
			changed,
			update
		};
	}

	function getSlotId(update) {
		return joinId(update.layer, update.slot);
	}
	function getError(errorId, update) {
		return {
			_onScene,
			_slots,
			changed: errors[errorId],
			update
		};
	}
}

export function joinId(...args) {
	return args.filter(a => a !== "").join("_");
}

const errors = {
	move: "error move: not a valid slot",
	slot: "error: not a valid slot",
	id: "error: not a valid id"
};
