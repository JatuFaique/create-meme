import React, { Component } from "react";

import html2canvas from "html2canvas";
import { Button, ButtonGroup, DropdownMenu, Fade } from "reactstrap";
import { Dropdown, DropdownItem, DropdownToggle } from "reactstrap";
import "./MakeImage.css";

export default class GenMeme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 16,
      dropdown: false,
      color: "white",
      memeResponse: [],
      randomInt: 7,
      topText: "",
      bottomText: "",
      color: "white",
    };
    this.exportAsImage = this.exportAsImage.bind(this);
  }

  downloadImage = (blob, fileName) => {
    const fakeLink = window.document.createElement("a");
    fakeLink.style = "display:none;";
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };
  exportAsImage = (imageFileName) => {
    var data = document.getElementById("image-box");
    console.log(data);
    html2canvas(data, { useCORS: true }).then((canvas) => {
      var image = canvas.toDataURL("image/jpeg", 1.0);
      this.downloadImage(image, imageFileName);
    });
  };

  render() {
    return (
      <div className="page-box">
        <div className="features-box">
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
              className="btn-prim"
              onClick={(e) => {
                this.setState({ color: "Red" });
              }}
            >
              Red
            </Button>
            <Button
              className="btn-prim"
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
                  this.setState({ size: "2rem" });
                }}
              >
                16
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: "2.5rem" });
                }}
              >
                18
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: "3rem" });
                }}
              >
                20
              </DropdownItem>
              <DropdownItem
                onClick={(e) => {
                  this.setState({ size: "3.2rem" });
                }}
              >
                22
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <button
            style={{ margin: "10px" }}
            className="btn-prim"
            onClick={() => this.exportAsImage("meme")}
          >
            Export
          </button>
        </div>
        <div className="image-box" id="image-box">
          <picture></picture>
          <img width={"500px"} height={"500px"} src={this.props.image}></img>
          <div
            className="image-text-top"
            style={{ color: this.state.color, fontSize: this.state.size }}
          >
            <p>{this.state.topText}</p>
          </div>
          <div
            className="image-text-bottom"
            style={{ color: this.state.color, fontSize: this.state.size }}
          >
            <p>{this.state.bottomText}</p>
          </div>
        </div>
      </div>
    );
  }
}
