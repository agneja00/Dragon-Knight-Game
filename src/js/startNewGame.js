import { state } from "./state.js";
import { UI } from "./ui.js";

export function startNewGame() {
  state.reset();
  UI.showControlButtons();
  UI.showImages();
}

export default startNewGame;
