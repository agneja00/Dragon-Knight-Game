import { elements } from "./elements.js";

export const writeActiveLog = (text) => {
  elements.containers.gameAction.textContent = text || "";
};

export const clearActiveLogLater = (ms = 3000) => {
  setTimeout(() => {
    elements.containers.gameAction.textContent = "";
  }, ms);
};
