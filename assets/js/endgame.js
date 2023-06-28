import { elements } from "./elements.js";
import { state } from "./state.js";

export function checkIfEndOfGame() {
    if (state.knightHealth <= 0) {
        elements.knightImage.remove();
        elements.controlsContainer.remove();
    } else if (state.dragonHealth <= 0) {
        elements.dragonImage.remove();
        elements.controlsContainer.remove();
    }
}

export default checkIfEndOfGame;