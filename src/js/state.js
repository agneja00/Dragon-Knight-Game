export const state = {
  round: 0,

  dragonMaxHealth: 200,
  knightMaxHealth: 100,
  dragonHealth: 200,
  knightHealth: 100,

  defendActive: false,
  isBusy: false,

  logs: [],

  rulesOpen: false,
  logsOpen: false,
  gameOver: false,

  soundEnabled: true,
  musicEnabled: true,
  endGameTimeout: null,

  increaseRound() {
    this.round++;
  },

  hasLogs() {
    return this.round > 0 && this.logs.length > 0;
  },

  toggleRules() {
    this.rulesOpen = !this.rulesOpen;
  },

  toggleLogs() {
    if (!state.hasLogs()) return;
    if (this.gameOver) return;
    this.logsOpen = !this.logsOpen;
  },

  reset() {
    if (this.endGameTimeout !== null) {
      clearTimeout(this.endGameTimeout);
      this.endGameTimeout = null;
    }
    this.round = 0;
    this.dragonHealth = this.dragonMaxHealth;
    this.knightHealth = this.knightMaxHealth;
    this.defendActive = false;
    this.isBusy = false;
    this.logs = [];
    this.rulesOpen = false;
    this.logsOpen = false;
    this.gameOver = false;
    this.soundEnabled = true;
    this.musicEnabled = false;
  },
};
