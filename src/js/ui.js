import { elements } from "./elements.js";
import { state } from "./state.js";

const defaultImages = {
  knight: "./assets/images/knight.webp",
  dragon: "./assets/images/dragon.webp",
};

const imageTimers = {
  knight: null,
  dragon: null,
};

const UI_GROUPS = {
  controls: [
    elements.buttons.attack,
    elements.buttons.defend,
    elements.buttons.heal,
  ],
  playAgain: [elements.buttons.playAgain],
  health: [elements.containers.charactersHealthContainer],
  inscription: [elements.images.inscription],
  images: [elements.images.knight, elements.images.dragon],
};

export const UI = {
  setHidden(list, hidden) {
    list.forEach((el) => el.classList.toggle("hidden", hidden));
  },

  setPlayingState() {
    this.setHidden(UI_GROUPS.controls, false);
    this.setHidden(UI_GROUPS.playAgain, true);
    this.setHidden(UI_GROUPS.health, false);
    this.setHidden(UI_GROUPS.inscription, true);
    this.showCharacter("knight");
    this.showCharacter("dragon");
    this.renderAllLogs();
    this.setTurnIndicator(true);
  },

  setGameOverState() {
    this.setHidden(UI_GROUPS.controls, true);
    this.setHidden(UI_GROUPS.playAgain, false);
  },

  setButtonsDisabled(disabled) {
    UI_GROUPS.controls.forEach((btn) => {
      btn.disabled = disabled;
    });
  },

  setTurnIndicator(isPlayerTurn) {
    const indicator = elements.containers.characterIndicator;
    if (!indicator) return;

    if (isPlayerTurn === null) {
      indicator.classList.add("hidden");
      return;
    }

    indicator.classList.remove("hidden");
    if (isPlayerTurn) {
      indicator.textContent = "⚔️ Your turn";
      indicator.classList.remove("dragon-turn");
    } else {
      indicator.textContent = "🐉 Dragon's turn";
      indicator.classList.add("dragon-turn");
    }
  },

  renderRules() {
    elements.containers.rules.classList.toggle("active", state.rulesOpen);
  },

  openLogs() {
    state.logsOpen = true;
    elements.containers.logs.classList.toggle("active");
    this.renderAllLogs();
  },

  closeLogs() {
    state.logsOpen = false;
    elements.containers.logs.classList.toggle("active");
  },

  renderAllLogs() {
    elements.containers.logs.classList.toggle("active", state.logsOpen);
  },

  clearLogs() {
    elements.containers.logs.innerHTML = "";
  },

  changeHealthBackground(character, percent) {
    const healthEl =
      character === "dragon" ? elements.health.dragon : elements.health.knight;
    healthEl.style.width = `${percent}%`;

    if (percent === 0) {
      healthEl.style.background = "none";
      return;
    }

    const colors = {
      dragon: {
        high: ["#6f1414", "#a61f1f"],
        medium: ["#7a3a00", "#b85500"],
        low: ["#5a0a0a", "#ff2020"],
      },
      knight: {
        high: ["#1f3b5c", "#2e5f99"],
        medium: ["#1f4a2e", "#2e8a50"],
        low: ["#4a3a00", "#ccaa00"],
      },
    };

    const palette = colors[character];
    const level = percent > 60 ? "high" : percent > 30 ? "medium" : "low";
    const [from, to] = palette[level];

    healthEl.style.background = `linear-gradient(90deg, ${from}, ${to})`;
  },

  updateHealth() {
    const dragonPercent = (state.dragonHealth / state.dragonMaxHealth) * 100;
    const knightPercent = (state.knightHealth / state.knightMaxHealth) * 100;

    elements.health.dragon.textContent = state.dragonHealth;
    elements.health.knight.textContent = state.knightHealth;

    this.changeHealthBackground("dragon", dragonPercent);
    this.changeHealthBackground("knight", knightPercent);
  },

  changeCharacterImg(character, action, duration = 3000) {
    const img = elements.images[character];
    if (!img) return;

    clearTimeout(imageTimers[character]);
    img.src = `./assets/images/${character}_${action}.webp`;

    if (action === "dead") return;

    imageTimers[character] = setTimeout(() => {
      img.src = defaultImages[character];
      imageTimers[character] = null;
    }, duration);
  },

  showKnightDead() {
    this.changeCharacterImg("knight", "dead", 0);
  },

  showDragonDead() {
    this.changeCharacterImg("dragon", "dead", 0);
  },

  hideCharacter(character) {
    const container = elements.images[character].closest(
      ".game-character-image",
    );
    if (container) container.classList.add("hidden");
  },

  showCharacter(character) {
    const img = elements.images[character];
    const container = img.closest(".game-character-image");

    if (container) container.classList.remove("hidden");

    img.src = defaultImages[character];
    img.classList.remove("hidden");
  },

  showVictory() {
    this.hideCharacter("knight");
    this.setHidden(UI_GROUPS.health, true);
    this.setHidden(UI_GROUPS.inscription, false);
    elements.images.inscription.src = "./assets/images/victory.webp";
  },

  showDefeat() {
    this.hideCharacter("dragon");
    this.setHidden(UI_GROUPS.health, true);
    this.setHidden(UI_GROUPS.inscription, false);
    elements.images.inscription.src = "./assets/images/defeat.webp";
  },

  hideResult() {
    this.showCharacter("dragon");
    this.showCharacter("knight");
    this.setHidden(UI_GROUPS.inscription, true);
    this.setHidden(UI_GROUPS.health, false);
  },

  enterGameOverMode() {
    elements.containers.charactersImagesContainer.classList.add(
      "game-over-mode",
    );
  },

  exitGameOverMode() {
    elements.containers.charactersImagesContainer.classList.remove(
      "game-over-mode",
    );
  },

  animateKnight(action) {
    if (state.gameOver) return;

    const img = elements.images.knight;
    if (!img) return;

    const classMap = {
      attack: "knight-attack",
      defend: "knight-defend",
    };

    const className = classMap[action];
    if (!className) return;

    img.classList.add(className);

    setTimeout(() => {
      img.classList.remove(className);
    }, 400);
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
