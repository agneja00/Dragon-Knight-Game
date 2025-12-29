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

export async function playRound(type) {
  if (state.gameOver) return;

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
      log.playerText = `Knight attacks and deals ${dmg} to the dragon.`;
      UI.changeCharacterImg("knight", "attack");
      UI.animateKnight("attack");
      break;
    }
    case roundType.defend:
      state.defendActive = true;
      log.playerText = `Knight defends and prepares a counter strike.`;
      UI.changeCharacterImg("knight", "defend");
      UI.animateKnight("defend");
      break;
    case roundType.heal: {
      const heal = playerHeal();
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

  await delay(3000);

  const dmg = dragonAttack();
  log.dragonText = `Dragon attacks and deals ${dmg} to the knight.`;

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
}

export default playRound;
