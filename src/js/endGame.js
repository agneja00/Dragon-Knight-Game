import { elements } from "./elements.js";
import { state } from "./state.js";

export function checkIfEndOfGame() {
  if (state.knightHealth <= 0) {
    state.gameOver = true;
    elements.knightImage.style.display = "none";
    elements.attackButton.style.display = "none";
    elements.defendButton.style.display = "none";
    elements.healButton.style.display = "none";
    elements.playAgainButton.style.display = "block";
    return true;
  }

  if (state.dragonHealth <= 0) {
    state.gameOver = true;
    elements.dragonImage.style.display = "none";
    elements.attackButton.style.display = "none";
    elements.defendButton.style.display = "none";
    elements.healButton.style.display = "none";
    elements.playAgainButton.style.display = "block";
    return true;
  }

  return false;
}

export default checkIfEndOfGame;
