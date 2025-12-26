import { state } from "./state.js";
import { UI } from "./ui.js";

export function startNewGame() {
  state.reset();
  UI.clearLogs();
  UI.updateHealth();
  UI.exitGameOverMode();
  UI.setPlayingState();
}

export default startNewGame;
