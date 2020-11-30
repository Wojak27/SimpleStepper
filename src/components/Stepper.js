// Package imports
import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import css from "../styles/Stepper.module.css";
import { v4 as uuidv4 } from "uuid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Stepper(props) {
  //const [isBackwards, setIsBackwards] = useState(false);

  const getColor = (status) => {
    switch (status) {
      case "completed":
        return props.completedColor ? props.completedColor : "purple";
      case "current":
        return props.currentColor ? props.currentColor : "orange";
      default:
        return props.defaultColor ? props.defaultColor : "gray";
    }
  };

  const handleClick = (currentStepState) => {};
  return (
    <div className={css.stepperWrapper}>
      <div className={css.stepperBody}>
        {props.steps.map((step, index) => (
          <Fragment>
            <Step
              dafaultBGColor={
                index + 1 === props.currentStep && !props.isBackwards
                  ? getColor("current")
                  : index - 1 === props.currentStep && props.isBackwards
                  ? getColor("current")
                  : getColor()
              }
              color={
                index < props.currentStep
                  ? getColor("completed")
                  : index === props.currentStep
                  ? getColor("current")
                  : getColor()
              }
              animated={
                index === props.currentStep && index !== 0
                  ? true
                  : index + 1 === props.currentStep && !props.isBackwards
                  ? true
                  : index - 1 === props.currentStep && props.isBackwards
                  ? true
                  : false
              }
              key={uuidv4()}
              index={index}
              isCurrent={index === props.currentStep ? true : false}
              handleClick={handleClick}
            >
              {step.title}{" "}
            </Step>
            {/* This is for preventing the last link fall behind the circle */}
            {index !== props.steps.length - 1 ? (
              <Linkage
                key={uuidv4()}
                isBackwards={props.isBackwards}
                backgroundColor={
                  index < props.currentStep
                    ? getColor("completed")
                    : index === props.currentStep && props.isBackwards
                    ? getColor("completed")
                    : getColor()
                }
                defaultBGColor={getColor()}
                animated={
                  index === props.currentStep && props.isBackwards
                    ? true
                    : index + 1 === props.currentStep && !props.isBackwards
                    ? true
                    : false
                }
              />
            ) : (
              ""
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

class Linkage extends Component {
  render() {
    console.log("animated is backwards");
    console.log(`${this.props.animated} ${this.props.isBackwards}`);
    console.log("");
    return (
      <Fragment>
        {this.props.animated && this.props.isBackwards ? (
          <div
            style={{
              backgroundColor: this.props.defaultBGColor,
            }}
            className={css.linkage}
          >
            <div
              key={this.props.key}
              style={{
                backgroundColor: this.props.backgroundColor,
              }}
              className={css.linkageAnimatedLeft}
            ></div>
          </div>
        ) : this.props.animated ? (
          <div
            style={{
              backgroundColor: this.props.defaultBGColor,
            }}
            className={css.linkage}
          >
            <div
              key={this.props.key}
              style={{
                backgroundColor: this.props.backgroundColor,
              }}
              className={css.linkageAnimatedRight}
            ></div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: this.props.backgroundColor,
            }}
            className={css.linkage}
          ></div>
        )}
      </Fragment>
    );
  }
}

class Step extends Component {
  render() {
    return (
      <Fragment>
        {this.props.animated ? (
          <div
            className={css.stepBody}
            onClick={() => this.props.handleClick(this.props.index)}
          >
            <div
              style={{ backgroundColor: this.props.dafaultBGColor }}
              className={css.stepCircle}
            >
              <div className={css.textDiv}>{this.props.index + 1}</div>
              <div
                key={this.props.key}
                style={{
                  backgroundColor: this.props.color,
                  animationDelay: this.props.isCurrent ? "0.7s" : "",
                  animationDuration: this.props.isCurrent ? "0.5s" : "1s",
                }}
                className={css.stepCircleAnimate}
              ></div>
            </div>
            <div className={css.stepperTitle}>{this.props.children}</div>
          </div>
        ) : (
          <div
            className={css.stepBody}
            onClick={() => this.props.handleClick(this.props.index)}
          >
            <div
              style={{ backgroundColor: this.props.color }}
              className={css.stepCircle}
            >
              {this.props.index + 1}
            </div>
            <div className={css.stepperTitle}>{this.props.children}</div>
          </div>
        )}
      </Fragment>
    );
  }
}
