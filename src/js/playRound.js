import { roundType } from "./constants.js";
import { state } from "./state.js";
import playerAttack from "./attack.js";
import playerHeal from "./heal.js";
import { writeLogToHTML } from "./writeLog.js";
import dragonAttack from "./dragon.js";
import checkIfEndOfGame from "./endGame.js";

export function playRound(type) {
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

  if (!checkIfEndOfGame()) {
    const dmg = dragonAttack();
    log.dragonText = `Dragon attacks and deals ${dmg} to the knight.`;
    checkIfEndOfGame();
  }

  state.logs.push(log);
  writeLogToHTML(log);
}

export default playRound;
