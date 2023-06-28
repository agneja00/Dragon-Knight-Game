import { elements } from "./elements.js";
import { roundType } from "./constants.js";
import playRound from "./playRound.js";

elements.attackButton.addEventListener("click", function () {
  playRound(roundType.attack);
});

elements.defendButton.addEventListener("click", function () {
  playRound(roundType.defend);
});

elements.healButton.addEventListener("click", function () {
  playRound(roundType.heal);
});