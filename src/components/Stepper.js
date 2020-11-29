// Package imports
import React, { Component, Fragment } from "react";
import css from "../styles/Stepper.module.css";
import PropTypes from "prop-types";
import shortid from "shortid";
import { v4 as uuidv4 } from 'uuid';

export default class Stepper extends Component {
  static propTypes = {
    currentStep: PropTypes.number.isRequired,
    currentColor: PropTypes.string,
    completedColor: PropTypes.string,
    defaultColor: PropTypes.string,
  };

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
        return this.props.completedColor ? this.props.completedColor : "purple";
      case "current":
        return this.props.currentColor ? this.props.currentColor : "orange";
      default:
        return this.props.defaultColor ? this.props.defaultColor : "gray";
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
              dafaultBGColor={
                index + 1 === this.state.currentStep
                  ? this.getColor("current")
                  : this.getColor()
              }
              color={
                index < this.state.currentStep
                  ? this.getColor("completed")
                  : index === this.state.currentStep
                  ? this.getColor("current")
                  : this.getColor()
              }
              animated={
                index === this.state.currentStep
                  ? true
                  : index === this.state.currentStep - 1
                  ? true
                  : false
              }
              key={uuidv4()}
              index={index}
              isCurrent={index === this.state.currentStep ? true : false}
              handleClick={this.handleClick}
            >
              {step.title}{" "}
            </Step>
            {/* This is for preventing the last link fall behind the circle */}
            {index !== this.props.steps.length - 1 ? (
              <Linkage
                backgroundColor={
                  index < this.state.currentStep
                    ? this.getColor("completed")
                    : this.getColor()
                }
                defaultBGColor={this.getColor()}
                animated={index + 1 === this.state.currentStep ? true : false}
              />
            ) : (
              ""
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}

class Linkage extends Component {
  render() {
    return (
      <Fragment>
        {this.props.animated ? (
          <div
            style={{
              backgroundColor: this.props.defaultBGColor,
            }}
            className={css.linkage}
          >
            <div
              style={{
                backgroundColor: this.props.backgroundColor,
              }}
              className={css.linkageAnimated}
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
                style={{ backgroundColor: this.props.color, animationDelay: (this.props.isCurrent ? "0.7s":""), animationDuration: (this.props.isCurrent ? "0.5s":"1s") }}
                className={css.stepCircleAnimate}
              ></div>
            </div>
            {this.props.children}
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
            {this.props.children}
          </div>
        )}
      </Fragment>
    );
  }
}
