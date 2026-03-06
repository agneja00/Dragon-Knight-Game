export const elements = {
  health: {
    dragon: document.querySelector(".dragon-health"),
    knight: document.querySelector(".knight-health"),
  },
  buttons: {
    attack: document.querySelector(".attack-btn"),
    defend: document.querySelector(".defend-btn"),
    heal: document.querySelector(".heal-btn"),
    playAgain: document.querySelector(".play-again-btn"),
    music: document.querySelector(".music-toggle-btn"),
    rules: document.querySelector(".rules-btn"),
    logs: document.querySelector(".logs-btn"),
  },
  images: {
    inscription: document.querySelector(".game-over-inscription"),
    dragon: document.querySelector(".dragon-image"),
    knight: document.querySelector(".knight-image"),
  },
  containers: {
    charactersHealthContainer: document.querySelector(".game-characters"),
    charactersImagesContainer: document.querySelector(
      ".game-characters-images-container",
    ),
    gameAction: document.querySelector(".game-action"),
    characterIndicator: document.querySelector(".turn-indicator"),
    rules: document.querySelector(".rules"),
    logs: document.querySelector(".logs"),
    controls: document.querySelector(".game-controls"),
  },
};
