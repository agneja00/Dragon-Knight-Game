import { roundType } from "./roundType.js";
import { state } from "./state.js";
import { playerAttack, playerHeal } from "./playerActions.js";
import dragonAttack from "./dragonActions.js";
import {
  writeActiveLog,
  clearActiveLogLater,
} from "./writeAndCleanActiveLog.js";
import { UI } from "./ui.js";
import checkIfEndOfGame from "./endGame.js";
import { delay } from "./utils.js";
import { AudioManager } from "./audio.js";

export async function playRound(type) {
  if (state.gameOver || state.isBusy) return;

  state.isBusy = true;
  UI.setButtonsDisabled(true);
  UI.setTurnIndicator(true);

  try {
    state.increaseRound();

    const log = {
      round: state.round,
      type,
      playerText: "",
      dragonText: "",
    };

    switch (type) {
      case roundType.attack: {
        const dmg = playerAttack();
        AudioManager.playSound("attack");
        log.playerText = `Knight attacks and deals ${dmg} to the dragon.`;
        UI.changeCharacterImg("knight", "attack");
        UI.animateKnight("attack");
        break;
      }

      case roundType.defend: {
        state.defendActive = true;
        AudioManager.playSound("defend");
        log.playerText = `Knight defends and prepares a counter strike.`;
        UI.changeCharacterImg("knight", "defend");
        UI.animateKnight("defend");
        break;
      }

      case roundType.heal: {
        const heal = playerHeal();
        AudioManager.playSound("heal");
        log.playerText = `Knight heals himself and receives ${heal} health.`;
        UI.changeCharacterImg("knight", "heal");
        break;
      }
    }

    UI.updateHealth();
    writeActiveLog(log.playerText);

    if (checkIfEndOfGame()) {
      state.logs.push(log);
      UI.writeLog(log);
      clearActiveLogLater();
      return;
    }

    UI.setTurnIndicator(false);
    await delay(3000);

    const dmg = dragonAttack();
    log.dragonText = `Dragon attacks and deals ${dmg} to the knight.`;
    AudioManager.playSound("fire");

    UI.changeCharacterImg("dragon", "attack");
    UI.updateHealth();
    writeActiveLog(log.dragonText);

    if (checkIfEndOfGame()) {
      state.logs.push(log);
      UI.writeLog(log);
      clearActiveLogLater();
      return;
    }

    state.logs.push(log);
    UI.writeLog(log);
    clearActiveLogLater();
    UI.setTurnIndicator(true);
  } finally {
    state.isBusy = false;
    UI.setButtonsDisabled(false);
  }
}

export default playRound;
