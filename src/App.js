import "./App.css";
import Board from "./components/Board";
import Control from "./components/Control";
function App() {
  return (
    <div className="app">
      <div className="wrap">
        <Control />
        <Board />
      </div>
    </div>
  );
}

export default App;
