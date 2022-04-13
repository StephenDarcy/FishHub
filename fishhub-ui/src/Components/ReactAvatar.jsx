import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
import UserService from "../Services/UserService";
import SampleUserImg from "../Images/sample-user.png";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// some code taken from sample application for react-avatar-editor
export default class ReactAvatar extends React.Component {
  state = {
    image: SampleUserImg,
    allowZoomOut: true,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 50,
    width: 200,
    height: 200,
    disableCanvasRotation: false,
    isTransparent: false,
    backgroundColor: null,
  };

  handleNewImage = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  handleUpload = async (img) => {
    let data = {
      avatar: img,
    };
    await UserService.uploadAvatar(data).then(() => {
      console.log("sent");
    });
  };

  handleSave = () => {
    const img = this.editor.getImageScaledToCanvas().toDataURL();

    this.handleUpload(img);
  };

  handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    this.setState({ scale });
  };

  handleDisableCanvasRotation = ({
    target: { checked: disableCanvasRotation },
  }) => {
    this.setState({ disableCanvasRotation });
  };

  rotateScale = (e) => {
    const scale = parseFloat(e.target.value);
    e.preventDefault();
    this.setState({
      rotate: scale,
    });
  };

  rotateLeft = (e) => {
    e.preventDefault();

    this.setState({
      rotate: (this.state.rotate - 90) % 360,
    });
  };

  rotateRight = (e) => {
    e.preventDefault();
    this.setState({
      rotate: (this.state.rotate + 90) % 360,
    });
  };

  logCallback() {
    // eslint-disable-next-line no-console
    //console.log("callback", e);
  }

  setEditorRef = (editor) => {
    if (editor) this.editor = editor;
  };

  handlePositionChange = (position) => {
    this.setState({ position });
  };

  setBackgroundColor = (e) => {
    this.setState({ backgroundColor: e.target.value });
  };

  setTransparent = (e) => {
    const isTransparent = e.target.checked;
    // set color to white initially
    const backgroundColor = isTransparent ? "#FFFFFF" : null;

    this.setState({ backgroundColor, isTransparent });
  };

  render() {
    return (
      <div>
        <Dropzone
          onDrop={(acceptedFiles) => {
            this.setState({ image: acceptedFiles[0] });
          }}
          noClick
          multiple={false}
          style={{
            width: this.state.width,
            height: this.state.height,
            marginBottom: "35px",
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <ReactAvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={
                  this.state.width / (100 / this.state.borderRadius)
                }
                backgroundColor={this.state.backgroundColor}
                onLoadFailure={this.logCallback.bind(this, "onLoadFailed")}
                onLoadSuccess={this.logCallback.bind(this, "onLoadSuccess")}
                onImageReady={this.logCallback.bind(this, "onImageReady")}
                image={this.state.image}
                className="editor-canvas"
                disableCanvasRotation={this.state.disableCanvasRotation}
              />

              <input
                name="newImage"
                type="file"
                onChange={this.handleNewImage}
                {...getInputProps()}
                style={{ display: "initial" }}
              />
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={this.handleSave}
                disableElevation
              >
                Upload
              </Button>
            </div>
          )}
        </Dropzone>
        <Row>
          <h6 style={{ textAlign: "left", marginTop: 20 }}>
            If needed, adjust your image
          </h6>
          <Col>
            <Row>
              Adjust Rotation
              <input
                name="scale"
                type="range"
                onChange={this.rotateScale}
                min="0"
                max="360"
                step="1"
                defaultValue="0"
              />
            </Row>
            <Row>
              Adjust the zoom
              <input
                name="scale"
                type="range"
                onChange={this.handleScale}
                min={this.state.allowZoomOut ? "0.1" : "1"}
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </Row>
          </Col>
          <Col>
            <Row>
              Rotate
              <Col>
                <Button onClick={this.rotateLeft}>Left</Button>
              </Col>
              <Col>
                <Button onClick={this.rotateRight}>Right</Button>
              </Col>
            </Row>
            <Row>
              <Row>
                Transparent?
                <input
                  type="checkbox"
                  onChange={this.setTransparent}
                  defaultChecked={this.state.isTransparent}
                ></input>
              </Row>
              <Row>
                {this.state.isTransparent && (
                  <div style={{ marginLeft: "1rem" }}>
                    Background color:
                    <input
                      name="backgroundColor"
                      type="color"
                      defaultValue={this.state.backgroundColor}
                      onChange={this.setBackgroundColor}
                    />
                  </div>
                )}
              </Row>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
