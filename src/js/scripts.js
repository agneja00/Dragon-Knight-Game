import { elements } from "./elements.js";
import { roundType } from "./roundType.js";
import { state } from "./state.js";
import playRound from "./playRound.js";
import startNewGame from "./startNewGame.js";

elements.buttons.attack.addEventListener("click", function () {
  playRound(roundType.attack);
});

elements.buttons.defend.addEventListener("click", function () {
  playRound(roundType.defend);
});

elements.buttons.heal.addEventListener("click", function () {
  playRound(roundType.heal);
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
