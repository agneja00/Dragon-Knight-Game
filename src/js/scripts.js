import { elements } from "./elements.js";
import { roundType } from "./roundType.js";
import { state } from "./state.js";
import playRound from "./playRound.js";
import startNewGame from "./startNewGame.js";
import { UI } from "./ui.js";
import { AudioManager, startMusic } from "./audio.js";

document.addEventListener("click", startMusic, { once: true });

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
  state.toggleRules();
  UI.renderRules();
});

elements.buttons.logs.addEventListener("click", () => {
  if (state.logsOpen) {
    UI.closeLogs();
  } else if (state.hasLogs()) {
    UI.openLogs();
  }
});

elements.buttons.playAgain.addEventListener("click", () => {
  startNewGame();
});

elements.buttons.music.addEventListener("click", () => {
  AudioManager.toggleMusic();
  elements.buttons.music.textContent = state.musicEnabled
    ? "Music On"
    : "Music Off";
});
