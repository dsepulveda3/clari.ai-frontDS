import React, { useContext, useState, createRef } from "react";
import { AppContext } from '../pages/_app'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import useTranslate from './../hooks/TranslationHook'


export const ImageManager = (props) => {
  const { lang } = useContext(AppContext);
  const [D, T] = useTranslate(lang, "main");
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const [isFolded, setIsFolded] = useState(true);
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

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div>
      <button onClick={toggleFold}>
        {isFolded ? T(D.open_scan_image) : T(D.close_scan_image)}
      </button>
      {isFolded ? null : (
        <div>
          <div style={{ width: "100%" }}>
            <label for='uploadImage' style={{ 
              display: "inline-block",
              padding: "0.5rem 1rem",
              color: "#fff",
              backgroundColor: "#007bff",
              cursor: "pointer",
              }}>
                {T(D.browse_image)}</label>
            <input type="file" id='uploadImage' onChange={onChange} style={{display: "none"}}/>
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
                  {T(D.crop_image)}
                </button>
              </h1>
              <img style={{ width: "100%" }} src={cropData} />
              {cropData && <button onClick={handleSendClick}>{T(D.upload_image)}</button>}
            </div>
          </div>
          <br style={{ clear: "both" }} />
        </div>
      )}
    </div>
  );
};

export default ImageManager;