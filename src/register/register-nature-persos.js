import ComposantLib from "./composant-lib";
import { Bloc } from "../composants/Perso";
import { Img } from "../composants/Img";

const createPerso = new ComposantLib();
createPerso.register(Bloc);
createPerso.register(Img);

export default createPerso;
