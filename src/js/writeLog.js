import { elements } from "./elements.js";

export const writeActiveLog = (text) => {
  elements.gameLogActiveAction.textContent = text || "";
};

export const clearActiveLogLater = (ms = 3000) => {
  setTimeout(() => {
    elements.gameLogActiveAction.textContent = "";
  }, ms);
};

export const writeLogToHTML = (roundLog) => {
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
  elements.gameLogsContainer.append(logItem);
};
