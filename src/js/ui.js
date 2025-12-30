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
    } else if (
      character === "dragon" &&
      state.dragonHealth === state.dragonMaxHealth
    ) {
      healthEl.style.background = "linear-gradient(90deg, #6f1414, #a61f1f)";
    } else if (
      character === "knight" &&
      state.knightHealth === state.knightMaxHealth
    ) {
      healthEl.style.background = "linear-gradient(90deg, #1f3b5c, #2e5f99)";
    }
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
    img.src = `./assets/images/${character}_${action}.png`;

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
      ".game-character-image"
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
    elements.images.inscription.src = "./assets/images/victory.png";
  },

  showDefeat() {
    this.hideCharacter("dragon");
    this.setHidden(UI_GROUPS.health, true);
    this.setHidden(UI_GROUPS.inscription, false);
    elements.images.inscription.src = "./assets/images/defeat.png";
  },

  hideResult() {
    this.showCharacter("dragon");
    this.showCharacter("knight");
    this.setHidden(UI_GROUPS.inscription, true);
    this.setHidden(UI_GROUPS.health, false);
  },

  enterGameOverMode() {
    elements.containers.charactersImagesContainer.classList.add(
      "game-over-mode"
    );
  },

  exitGameOverMode() {
    elements.containers.charactersImagesContainer.classList.remove(
      "game-over-mode"
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
