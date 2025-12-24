import { elements } from "./elements.js";
import { state } from "./state.js";

const defaultImages = {
  knight: "./assets/images/knight.png",
  dragon: "./assets/images/dragon.png",
};

const imageTimers = {
  knight: null,
  dragon: null,
};

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
    elements.images.dragon.src = "./assets/images/dragon.png";
    elements.images.knight.src = "./assets/images/knight.png";
    elements.images.dragon.style.display = "block";
    elements.images.knight.style.display = "block";
    elements.images.knight.style.float = "right";
  },

  hideImage(character) {
    if (character === "dragon") elements.images.dragon.style.display = "none";
    if (character === "knight") elements.images.knight.style.display = "none";
  },

  changeHealth(character, percent) {
    if (character === "dragon") {
      elements.health.dragon.style.width = `${percent}%`;
      if (percent === 0) elements.health.dragon.style.background = "none";
      if (state.dragonHealth === state.dragonMaxHealth) {
        elements.health.dragon.style.background =
          "linear-gradient(linear-gradient(90deg, #6f1414, #a61f1f))";
      }
    }

    if (character === "knight") {
      elements.health.knight.style.width = `${percent}%`;
      if (percent === 0) elements.health.knight.style.background = "none";
      if (state.knightHealth === state.knightMaxHealth) {
        elements.health.knight.style.background =
          "linear-gradient(90deg, #1f3b5c, #2e5f99)";
      }
    }
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
  changeCharacterImg(character, action, duration = 3000) {
    const img = elements.images[character];
    if (!img) return;

    if (imageTimers[character]) {
      clearTimeout(imageTimers[character]);
      imageTimers[character] = null;
    }

    if (character === "knight" && action !== "dead") {
      img.style.float =
        action === "attack" || action === "defend" ? "left" : "right";
    }

    img.src = `./assets/images/${character}_${action}.png`;

    if (action === "dead") return;

    imageTimers[character] = setTimeout(() => {
      img.src = defaultImages[character];
      if (character === "knight") img.style.float = "right";
      imageTimers[character] = null;
    }, duration);
  },
};
