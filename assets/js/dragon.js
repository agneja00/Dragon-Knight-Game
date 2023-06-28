import { state } from "./state.js";
import generateNumberTo from "./utils.js";

export function dragonAttack() {
    const damage = generateNumberTo(20);
    state.knightHealth -= damage;
    state.update();

    return damage;
}

export default dragonAttack;