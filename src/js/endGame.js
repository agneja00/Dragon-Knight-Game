import { state } from "./state.js";
import { UI } from "./ui.js";

export function checkIfEndOfGame() {
  if (state.knightHealth <= 0) {
    UI.changeCharacterImg("knight", "dead", 0);
    state.gameOver = true;
    UI.hideControlButtons();
    return true;
  }

  if (state.dragonHealth <= 0) {
    UI.changeCharacterImg("dragon", "dead", 0);
    state.gameOver = true;
    UI.hideControlButtons();
    return true;
  }

  return false;
}

export default checkIfEndOfGame;
