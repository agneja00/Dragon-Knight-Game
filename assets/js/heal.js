import { state } from "./state.js";
import generateNumberTo from "./utils.js";

export function playerHeal() {
    const healing = generateNumberTo(30);
    const sum = state.knightHealth + healing;

    if (sum > 100) {
        state.knightHealth = 100;
    } else {
        state.knightHealth = sum;
    }

    state.update();

    return healing;
}

export default playerHeal;