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
      {/*initialStep={1} completedColor="black" currentColor="red" defaultColor="grey"*/}
      <Stepper steps={steps} 
      />
    </div>
  );
}

export default App;
