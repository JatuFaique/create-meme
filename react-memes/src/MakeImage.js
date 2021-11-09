import React, { Component } from "react";
import axios from "axios";
import { Button, ButtonGroup, DropdownMenu, Fade } from "reactstrap";
import { Dropdown, DropdownItem, DropdownToggle } from "reactstrap";
import "./MakeImage.css";

export default class MakeImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 16,
      dropdown: false,
      color: "white",
      memeResponse: [],
      randomInt: null,
      topText: "",
      bottomText: "",
      color: "white",
    };

    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then((response) => {
      //console.log('hi', response.data.data)
      this.setState({ memeResponse: response.data.data.memes });
    });
  }

  render() {
    const showRandImage = () => {
      if (this.state.randomInt !== null) {
        return (
          <div className="image-box">
            <img
              width={"500px"}
              height={"500px"}
              src={this.state.memeResponse[this.state.randomInt].url}
            ></img>
            <div
              className="image-text-top"
              style={{ color: this.state.color, fontSize: this.state.size }}
            >
              {this.state.topText}
            </div>
            <div
              className="image-text-bottom"
              style={{ color: this.state.color, fontSize: this.state.size }}
            >
              {this.state.bottomText}
            </div>
          </div>
        );
      } else {
        return <div></div>;
      }
    };
    return (
      <div>
        <h1>Create here</h1>
        <div>
          <Button
            onClick={(e) => {
              this.setState({
                randomInt: Math.floor(Math.random() * 101),
              });
            }}
          >
            Generate Random
          </Button>
          <label>
            Top Text
            <input
              onChange={(event) => {
                this.setState({ topText: event.target.value });
              }}
            ></input>
          </label>
          <label>
            Bottom Text
            <input
              onChange={(event) => {
                this.setState({ bottomText: event.target.value });
              }}
            ></input>
          </label>
          <ButtonGroup>
            <Button
              onClick={(e) => {
                this.setState({ color: "Red" });
              }}
            >
              Red
            </Button>
            <Button
              onClick={(e) => {
                this.setState({ color: "Blue" });
              }}
            >
              Blue
            </Button>
            <Button
              onClick={(e) => {
                this.setState({ color: "Green" });
              }}
            >
              Green
            </Button>
          </ButtonGroup>
          <Dropdown
            isOpen={this.state.dropdown}
            toggle={() => {
              this.setState({ dropdown: !this.state.dropdown });
            }}
          >
            <DropdownToggle caret>Select Size</DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: 16 });
                }}
              >
                16
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: 18 });
                }}
              >
                18
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: 20 });
                }}
              >
                20
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: 22 });
                }}
              >
                22
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <button onClick={showRandImage}>APPLY</button>
        {showRandImage()}
      </div>
    );
  }
}
