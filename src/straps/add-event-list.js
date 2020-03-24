import { timeLiner, chrono } from "../scene/init";

export default function addEventList(data) {
  const c = chrono();
  console.log("addEventList", data, c);
  // id:01 est la timeline dédiée, par dessus static
  timeLiner.addEventList(data, { id: "01", chrono: c });
}
