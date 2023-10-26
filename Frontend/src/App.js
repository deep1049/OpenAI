import logo from "./logo.svg";
import "./App.css";
import Pincode from "./components/Pincode";
import StateArea from "./components/StateArea";
import Assignment from "./components/Assignment";

function App() {
  return (
    <div className="App">
      <Assignment />
      <Pincode />
      <StateArea />
    </div>
  );
}

export default App;
