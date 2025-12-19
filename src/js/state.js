import { elements } from "./elements.js";

export const state = {
  round: 0,
  dragonHealth: 200,
  knightHealth: 100,
  logs: [],
  rulesOpen: false,
  logsOpen: false,
  currentLogTimer: null,
  gameOver: false,
  update() {
    elements.dragonHealthText.textContent = this.dragonHealth;
    elements.knightHealthText.textContent = this.knightHealth;
  },
  increaseRound() {
    this.round++;
  },
  hasLogs() {
    return this.round > 0 && this.logs.length > 0;
  },
  renderRules() {
    elements.gameRulesContainer.classList.toggle("active", this.rulesOpen);
  },
  renderAllLogs() {
    elements.gameLogsContainer.classList.toggle("active", this.logsOpen);
  },

  playAgain() {
    if (this.currentLogTimer) {
      clearTimeout(this.currentLogTimer);
      this.currentLogTimer = null;
    }

    this.round = 0;
    this.dragonHealth = 200;
    this.knightHealth = 100;
    this.logs = [];
    this.rulesOpen = false;
    this.logsOpen = false;
    this.gameOver = false;

    this.update();
    this.renderRules();
    this.renderAllLogs();
  },
};
