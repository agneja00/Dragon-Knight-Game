import { elements } from "./elements.js";
import { UI } from "./ui.js";

export const state = {
  round: 0,
  width: 100,
  dragonMaxHealth: 200,
  knightMaxHealth: 100,
  dragonHealth: 200,
  knightHealth: 100,
  logs: [],
  rulesOpen: false,
  logsOpen: false,
  gameOver: false,
  updateHealth() {
    elements.health.dragon.textContent = this.dragonHealth;
    elements.health.knight.textContent = this.knightHealth;
    const dragonPercent = (this.dragonHealth / this.dragonMaxHealth) * 100;
    UI.changeHealth("dragon", dragonPercent);

    const knightPercent = (this.knightHealth / this.knightMaxHealth) * 100;
    UI.changeHealth("knight", knightPercent);
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
    this.dragonMaxHealth = 200;
    this.knightMaxHealth = 100;
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
