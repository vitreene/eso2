import ComposantLib from "./composant-lib";
import { Perso } from "../composants/Perso";

const createPerso = new ComposantLib();
createPerso.register(Perso);

export default createPerso;
