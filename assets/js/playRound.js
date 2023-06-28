import { roundType } from "./constants.js";
import { state } from "./state.js";
import playerAttack from "./attack.js";
import playerHeal from "./heal.js";
import { writeLogToHTML } from "./writeLog.js";
import dragonAttack from "./dragon.js";
import checkIfEndOfGame from "./endgame.js";

export function playRound(type) {
    state.increaseRound();

    const log = {
        playerText: null,
        dragonText: null,
    };

    switch (type) {
        case roundType.attack:
            const damage = playerAttack();
            log.playerText = `Knight attacks and deals ${damage} to the dragon.`;
            break;

        case roundType.defend:
            log.playerText = `Not implemented`;
            break;

        case roundType.heal:
            const healing = playerHeal();
            log.playerText = `Knight heals himself and receives ${healing} health.`;
            break;
    }

    const damage = dragonAttack(); {
        log.dragonText = `Dragon attacks and deals ${damage} to the knight.`;

        writeLogToHTML(log);

        checkIfEndOfGame();
    }
}

export default playRound;