import React, { useRef, useState, useEffect } from 'react';


import './AdImageUpload.css';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
const AdImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState(props.file);
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
 //   props.onInput(props.id, pickedFile, fileIsValid);
      props.addFile(pickedFile,props.placeholder);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control" >
      <input
        
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload`}>
        <div className="image-upload__preview"   onClick={pickImageHandler}>
          {previewUrl && <img src={previewUrl} alt="Preview"  />}
          {!previewUrl && <AddAPhotoIcon fontSize="large"/> }
        </div>
       
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default AdImageUpload;
