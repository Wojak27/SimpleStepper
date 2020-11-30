import "./App.css";
import Stepper from "./components/Stepper";
import { Button } from "react-bootstrap";
import { useState } from "react";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [isBackwards, setIsBackwards] = useState(false)
  const goForward =()=>{
    setCurrentStep(currentStep + 1);
    setIsBackwards(false)
  }

  const goBackwards =()=>{
    setCurrentStep(currentStep - 1);
    setIsBackwards(true)
  }

  return (
    <div className="App">
      <Stepper steps={steps} currentStep={currentStep} isBackwards={isBackwards}/>
      <Button
        variant="danger"
        onClick={goBackwards}
      >
        Previous
      </Button>
      <Button
        variant="info"
        onClick={goForward}
      >
        Next
      </Button>
    </div>
  );
}

export default App;
