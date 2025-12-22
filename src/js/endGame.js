import { state } from "./state.js";
import { UI } from "./ui.js";

export function checkIfEndOfGame() {
  if (state.knightHealth <= 0) {
    state.gameOver = true;
    UI.hideImage("knight");
    UI.hideControlButtons();
    return true;
  }

  if (state.dragonHealth <= 0) {
    state.gameOver = true;
    UI.hideImage("dragon");
    UI.hideControlButtons();
    return true;
  }

  return false;
}

export default checkIfEndOfGame;
