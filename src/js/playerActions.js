import { state } from "./state.js";
import { generateNumberTo } from "./utils.js";

export function playerAttack() {
  const damage = generateNumberTo(10);
  state.dragonHealth = Math.max(0, state.dragonHealth - damage);
  return damage;
}

export function playerHeal() {
  const heal = generateNumberTo(30);
  state.knightHealth = Math.min(100, state.knightHealth + heal);
  return heal;
}
