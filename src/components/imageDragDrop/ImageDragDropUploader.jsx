import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import './imageDragDrop.css'
const ImageDragDropUploader = ({values,setValues}) => {
  
  const fileTypes = ["JPG", "PNG"];
  const [file, setFile] = useState(null);


  const handleChange = (file) => {
    setValues({...values,image:file})
    setFile(file)
  };

  return (
    <div className="flex flex-col mt-3">
      <label className="font-semibold text-[15px] mb-2" htmlFor="">
        Upload Image:
      </label>
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        classes="file-uploader" // Add a custom class for the uploader
        dropMessageStyle={{
          color: "#000", // Set drop message text color to black
        }}
      />
      <p className="my-3 text-sm text-center font-semibold capitalize">
        {file && `File name: ${file?.name}`}
      </p>

     
    </div>
  );
};

export default ImageDragDropUploader;
