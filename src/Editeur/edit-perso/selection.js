import {
  createMachine,
  state,
  transition,
  guard,
  action,
  immediate,
  reduce,
  interpret,
} from 'robot3';
import { SCENE_ID, EDIT_ID } from '../lib/constantes';

export function selectionFactory(enable) {
  const scene = document.getElementById(SCENE_ID);

  const context = () => ({
    deep: 0,
    selected: new Set(),
    below: null,
  });

  // reducers ///////////////////
  function select(ctx, ev) {
    console.log(ev.belows);

    const below = !isBackground(ev.belows[ctx.deep]) && ev.belows[ctx.deep];
    const selected = new Set();
    below && selected.add(below);
    return { ...ctx, selected, below };
  }

  function toggleSelect(ctx, ev) {
    if (isBackground(ev.belows[ctx.deep])) return ctx;
    const below = ev.belows[ctx.deep];
    const selected = new Set(ctx.selected);
    below && selected.has(below) ? selected.delete(below) : selected.add(below);
    return { ...ctx, selected, below };
  }

  function selectUnder(ctx, ev) {
    let maxDeep = Infinity;
    ev.belows.forEach((node, index) => isBackground(node) && (maxDeep = index));
    const deep = maxDeep === 0 ? 0 : (ctx.deep + 1) % maxDeep;
    return { ...ctx, deep };
  }

  function resetDeep(ctx) {
    return { ...ctx, deep: 0 };
  }

  // actions : side effects ///////////////////
  function addEnable(ctx) {
    ctx.below && enable.add(ctx.below);
  }

  function removeEnable(ctx) {
    ctx.selected.forEach((node) => enable.remove(node));
  }

  function toggleEnable(ctx) {
    if (!ctx.below) return;
    ctx.selected.has(ctx.below)
      ? enable.add(ctx.below)
      : enable.remove(ctx.below);
  }

  // helpers ///////////////////
  function isBackground(node) {
    return node.isEqualNode(scene);
  }
  function isUnder(_, ev) {
    return ev.alt;
  }
  function isMulti(_, ev) {
    return ev.shift;
  }
  function isEditMode(_, ev) {
    console.log('isEditMode', ev.edit);
    return ev.edit;
  }

  /////////////
  const selectMachine = createMachine(
    {
      idle: state(transition('click', 'selectMode')),
      selectMode: state(
        immediate('editMode', guard(isEditMode)),
        immediate('selectUnder', guard(isUnder)),
        immediate('multiSelect', guard(isMulti), reduce(resetDeep)),
        immediate('select', reduce(resetDeep), action(removeEnable))
      ),
      selectUnder: state(
        immediate('multiSelect', guard(isMulti), reduce(selectUnder)),
        immediate('select', reduce(selectUnder), action(removeEnable))
      ),
      multiSelect: state(
        immediate('idle', reduce(toggleSelect), action(toggleEnable))
      ),
      select: state(immediate('idle', reduce(select), action(addEnable))),
      editMode: state(
        immediate(
          'idle',
          action(() => console.log('FIN EDIT MODE'))
        )
      ),
    },
    context
  );

  const service = interpret(selectMachine, () => {
    // console.log(
    //   '-------->  ',
    //   service.machine.current,
    //   service.context
    // );
  });

  return function selectElement(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log('selectElement', e);

    const shift = e.shiftKey;
    const alt = e.altKey;
    // TODO belows doit renvoyer un Perso
    const belows = document.elementsFromPoint(e.clientX, e.clientY);

    const editElement = document.getElementById(EDIT_ID);
    const edit =
      editElement &&
      //   !editElement.isEqualNode(e.target) &&
      editElement.contains(e.target) &&
      e.target;

    service.send({ type: 'click', edit, shift, alt, belows });
  };
}
