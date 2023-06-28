import { elements } from "./elements.js";
import { state } from "./state.js";

export const writeLogToHTML = (roundLog) => {
    if (!elements.combatLog) {
        setupCombatLog();
    }

    const liElement = document.createElement("li");
    const titleElement = document.createElement("span");
    const titleBoldElement = document.createElement("b");
    const playerInfoElement = document.createElement("span");
    const dragonInfoElement = document.createElement("span");

    titleElement.append(titleBoldElement);
    liElement.append(titleElement, playerInfoElement, dragonInfoElement);

    titleBoldElement.textContent = `Round ${state.round}`;
    playerInfoElement.textContent = roundLog.playerText;
    dragonInfoElement.textContent = roundLog.dragonText;

    elements.combatLog.append(liElement);
}

const setupCombatLog = () => {
    const heading = document.createElement("h2");
    heading.textContent = "Combat Log";
    elements.gameLogContainer.append(heading);

    elements.combatLog = document.createElement("ul");
    elements.combatLog.className = "combat-log";
    elements.gameLogContainer.append(elements.combatLog);
}