import React, { Component, Fragment } from "react";
import css from "../styles/Stepper.module.css";

export default class Stepper extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.initialStep);
    this.state = {
      currentStep: this.props.initialStep ? this.props.initialStep : 0,
    };
  }

  getColor = (status) => {
    switch (status) {
      case "completed":
        return "purple";
      case "current":
        return "green";
      default:
        return "gray";
    }
  };

  handleClick = (currentStep) => {
    this.setState({
      currentStep: currentStep,
    });
  };
  render() {
    return (
      <div className={css.stepperBody}>
        {this.props.steps.map((step, index) => (
          <Fragment>
            <Step
              color={
                index < this.state.currentStep
                  ? this.getColor("completed")
                  : index === this.state.currentStep
                  ? this.getColor("current")
                  : this.getColor()
              }
              index={index}
              handleClick={this.handleClick}
            >
              {step.title}{" "}
            </Step>
            {index !== this.props.steps.length - 1 ? (
              <div
                style={{
                  backgroundColor:
                    index < this.state.currentStep
                      ? this.getColor("completed")
                      : this.getColor(),
                }}
                className={css.linkage}
              ></div>
            ) : (
              ""
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}

class Step extends Component {
  render() {
    return (
      <div className={css.stepBody} onClick={()=>this.props.handleClick(this.props.index)}>
        <div
          style={{ backgroundColor: this.props.color }}
          className={css.stepCircle}
        >
          {this.props.index+1}
        </div>
        {this.props.children}
      </div>
    );
  }
}
