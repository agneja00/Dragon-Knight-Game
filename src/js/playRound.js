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
      break;
    }

    case roundType.defend:
      log.playerText = `Knight defends.`;
      break;

    case roundType.heal: {
      const heal = playerHeal();
      log.playerText = `Knight heals himself and receives ${heal} health.`;
      break;
    }
  }

  state.updateHealth();
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

  state.updateHealth();
  writeActiveLog(log.dragonText);

  state.logs.push(log);
  UI.writeLog(log);

  clearActiveLogLater();
  checkIfEndOfGame();
}

export default playRound;
