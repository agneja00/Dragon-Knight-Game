import { state } from "./state.js";
import { generateNumberTo } from "./utils.js";

export function playerHeal() {
  const heal = generateNumberTo(30);
  state.knightHealth = Math.min(100, state.knightHealth + heal);
  return heal;
}

export default playerHeal;
