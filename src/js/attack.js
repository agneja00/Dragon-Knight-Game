import { state } from "./state.js";
import { generateNumberTo } from "./utils.js";

export function playerAttack() {
  const damage = generateNumberTo(10);
  state.dragonHealth = Math.max(0, state.dragonHealth - damage);
  state.update();
  return damage;
}

export default playerAttack;
