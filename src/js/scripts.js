import { elements } from "./elements.js";
import { roundType } from "./constants.js";
import { state } from "./state.js";
import playRound from "./playRound.js";
import checkIfEndOfGame from "./endGame.js";
import startNewGame from "./startNewGame.js";

elements.attackButton.addEventListener("click", function () {
  playRound(roundType.attack);
  checkIfEndOfGame();
});

elements.defendButton.addEventListener("click", function () {
  playRound(roundType.defend);
  checkIfEndOfGame();
});

elements.healButton.addEventListener("click", function () {
  playRound(roundType.heal);
  checkIfEndOfGame();
});

elements.rulesButton.addEventListener("click", () => {
  state.rulesOpen = !state.rulesOpen;
  state.renderRules();
});

elements.logsButton.addEventListener("click", () => {
  if (!state.hasLogs()) return;

  state.logsOpen = !state.logsOpen;
  state.renderAllLogs();
});

elements.playAgainButton.addEventListener("click", () => {
  startNewGame();
});
