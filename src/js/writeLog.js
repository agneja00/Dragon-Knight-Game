import { elements } from "./elements.js";
import { state } from "./state.js";

export const writeLogToHTML = (roundLog) => {
  if (state.currentLogTimer) {
    clearTimeout(state.currentLogTimer);
    state.currentLogTimer = null;
  }

  const roundId = roundLog.round;
  if (!roundLog.playerText && !roundLog.dragonText) return;

  const showText = async () => {
    elements.gameLogActiveAction.textContent = roundLog.playerText || "";
    await new Promise((r) => setTimeout(r, 3000));
    if (state.round !== roundId) return;

    elements.gameLogActiveAction.textContent = roundLog.dragonText || "";
    await new Promise((r) => setTimeout(r, 3000));
    if (state.round !== roundId) return;

    elements.gameLogActiveAction.textContent = "";
  };

  state.currentLogTimer = showText();

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
