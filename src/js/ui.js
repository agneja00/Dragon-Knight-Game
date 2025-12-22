import { elements } from "./elements.js";

export const UI = {
  showControlButtons() {
    elements.buttons.attack.style.display = "block";
    elements.buttons.defend.style.display = "block";
    elements.buttons.heal.style.display = "block";
    elements.buttons.playAgain.style.display = "none";
  },

  hideControlButtons() {
    elements.buttons.attack.style.display = "none";
    elements.buttons.defend.style.display = "none";
    elements.buttons.heal.style.display = "none";
    elements.buttons.playAgain.style.display = "block";
  },

  showImages() {
    elements.images.dragon.style.display = "block";
    elements.images.knight.style.display = "block";
  },

  hideImage(character) {
    if (character === "dragon") elements.images.dragon.style.display = "none";
    if (character === "knight") elements.images.knight.style.display = "none";
  },

  writeLog(roundLog) {
    const logItem = document.createElement("li");
    logItem.className = "log";

    const roundTitle = document.createElement("h3");
    roundTitle.className = "round-title";
    roundTitle.textContent = `Round ${roundLog.round}:`;

    const roundLogsContainer = document.createElement("div");
    roundLogsContainer.className = "player-and-dragon-log-container";

    if (roundLog.playerText) {
      const playerLog = document.createElement("p");
      playerLog.textContent = roundLog.playerText;
      roundLogsContainer.append(playerLog);
    }

    if (roundLog.dragonText) {
      const dragonLog = document.createElement("p");
      dragonLog.textContent = roundLog.dragonText;
      roundLogsContainer.append(dragonLog);
    }

    logItem.append(roundTitle, roundLogsContainer);
    elements.containers.logs.append(logItem);
  },
};
