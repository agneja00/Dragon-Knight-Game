import { elements } from "./elements.js";
import { roundType } from "./constants.js";
import playRound from "./playRound.js";
import checkIfEndOfGame from "./endGame.js";

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
