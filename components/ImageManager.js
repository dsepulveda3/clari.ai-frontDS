import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const ImageManager = (props) => {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSendClick = () => {
    props.onSendImageClick(cropData);
  }

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <br />
        <br />
        <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
      </div>
      <div>
        <div className="box" style={{ width: "50%", float: "right" }}>
        </div>
        <div
          className="box"
          style={{ width: "50%", float: "right", height: "300px" }}
        >
          <h1>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} />
          {cropData && <button onClick={handleSendClick}>Send Image</button>}
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default ImageManager;