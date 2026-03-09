import { state } from "./state.js";
import { UI } from "./ui.js";

export function checkIfEndOfGame() {
  if (state.knightHealth <= 0) {
    endGame("defeat");
    return true;
  }

  if (state.dragonHealth <= 0) {
    endGame("victory");
    return true;
  }

  return false;
}

function endGame(result) {
  state.gameOver = true;
  UI.setGameOverState();
  UI.setTurnIndicator(null);

  if (result === "defeat") {
    UI.showKnightDead();
  } else {
    UI.showDragonDead();
  }

  state.endGameTimeout = setTimeout(() => {
    if (!state.gameOver) return;

    UI.enterGameOverMode();
    result === "defeat" ? UI.showDefeat() : UI.showVictory();
  }, 4000);
}

export default checkIfEndOfGame;
