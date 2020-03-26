import ComposantLib from "./composant-lib";
import { Bloc, Img } from "../composants/Perso";

const createPerso = new ComposantLib();
createPerso.register(Bloc);
createPerso.register(Img);

export default createPerso;
