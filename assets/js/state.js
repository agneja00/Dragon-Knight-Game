import { elements } from "./elements.js";

export const state = {
    round: 0,
    dragonHealth: 200,
    knightHealth: 100,
    update() {
        elements.dragonHealthText.textContent = state.dragonHealth;
        elements.knightHealthText.textContent = state.knightHealth;
    },
    increaseRound() {
        state.round++;
    },
};