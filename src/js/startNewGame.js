import { elements } from "./elements.js";
import { state } from "./state.js";

export function startNewGame() {
  if (state.knightHealth <= 0) {
    elements.knightImage.style.display = "block";
  }
  if (state.dragonHealth <= 0) {
    elements.dragonImage.style.display = "block";
  }

  state.playAgain();
  elements.attackButton.style.display = "block";
  elements.defendButton.style.display = "block";
  elements.healButton.style.display = "block";
  elements.playAgainButton.style.display = "none";
}

export default startNewGame;
