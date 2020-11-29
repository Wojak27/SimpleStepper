import "./App.css";
import Stepper from "./components/Stepper";

const steps = [
  {
    title: "First step",
  },
  {
    title: "Second step",
  },
  {
    title: "Third step",
  },
];

function App() {
  return (
    <div className="App">
      <Stepper steps={steps} initialStep={1} />
    </div>
  );
}

export default App;
