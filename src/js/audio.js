import { state } from "./state.js";

const soundFiles = {
  attack: "./assets/sounds/knight_attack.mp3",
  defend: "./assets/sounds/knight_defend.wav",
  heal: "./assets/sounds/knight_heal.wav",
  fire: "./assets/sounds/dragon_attack.mp3",
};

const music = new Audio("./assets/sounds/game_sound.mp3");
music.loop = true;
music.volume = 0.5;

state.musicEnabled = true;
state.soundEnabled = true;

export const AudioManager = {
  playSound(name) {
    if (!state.soundEnabled) return;
    const path = soundFiles[name];
    if (!path) return;

    const sound = new Audio(path);
    sound.play().catch(() => {});
  },

  playMusic() {
    if (!state.musicEnabled) return;
    music.play().catch(() => {});
  },

  stopMusic() {
    music.pause();
    music.currentTime = 0;
  },

  toggleMusic() {
    state.musicEnabled = !state.musicEnabled;
    state.musicEnabled ? this.playMusic() : this.stopMusic();
  },

  toggleSound() {
    state.soundEnabled = !state.soundEnabled;
  },
};

let musicStarted = false;

export function startMusic() {
  if (!musicStarted && state.musicEnabled) {
    AudioManager.playMusic();
    musicStarted = true;
  }
}

AudioManager.playMusic();
