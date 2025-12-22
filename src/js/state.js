import { elements } from "./elements.js";

export const state = {
  round: 0,
  dragonHealth: 200,
  knightHealth: 100,
  logs: [],
  rulesOpen: false,
  logsOpen: false,
  gameOver: false,
  updateHealth() {
    elements.health.dragon.textContent = this.dragonHealth;
    elements.health.knight.textContent = this.knightHealth;
  },
  increaseRound() {
    this.round++;
  },
  hasLogs() {
    return this.round > 0 && this.logs.length > 0;
  },
  renderRules() {
    elements.containers.rules.classList.toggle("active", this.rulesOpen);
  },
  renderAllLogs() {
    elements.containers.logs.classList.toggle("active", this.logsOpen);
  },

  reset() {
    this.round = 0;
    this.dragonHealth = 200;
    this.knightHealth = 100;
    this.logs = [];
    this.rulesOpen = false;
    this.logsOpen = false;
    this.gameOver = false;
    this.updateHealth();
    this.renderRules();
    this.renderAllLogs();
  },
};
