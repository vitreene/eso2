import ComposantLib from "./composant-lib";
import { Bloc } from "../composants/Perso";
import { createImgClass } from "../composants/Img";

export default function initCreatePerso(imagesCollection) {
  const createPerso = new ComposantLib();
  const Img = createImgClass(imagesCollection);
  createPerso.register(Bloc);
  createPerso.register(Img);
  return createPerso;
}
