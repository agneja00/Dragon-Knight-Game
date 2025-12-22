import { elements } from "./elements.js";
import { roundType } from "./roundType.js";
import { state } from "./state.js";
import playRound from "./playRound.js";
import checkIfEndOfGame from "./endGame.js";
import startNewGame from "./startNewGame.js";

elements.buttons.attack.addEventListener("click", function () {
  playRound(roundType.attack);
  checkIfEndOfGame();
});

elements.buttons.defend.addEventListener("click", function () {
  playRound(roundType.defend);
  checkIfEndOfGame();
});

elements.buttons.heal.addEventListener("click", function () {
  playRound(roundType.heal);
  checkIfEndOfGame();
});

elements.buttons.rules.addEventListener("click", () => {
  state.rulesOpen = !state.rulesOpen;
  state.renderRules();
});

elements.buttons.playAgain.addEventListener("click", () => {
  startNewGame();
});

elements.buttons.logs.addEventListener("click", () => {
  if (!state.hasLogs()) return;

  state.logsOpen = !state.logsOpen;
  state.renderAllLogs();
});
