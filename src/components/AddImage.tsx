import React, { ChangeEvent, FC, memo } from "react";
import { BiImageAdd } from "react-icons/bi";
import useStore from "../hooks/useStore";

const AddImage: FC = () => {
  const { previewImageArray, setPreviewImageArray } = useStore();

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files as FileList;
    // converting FileList to File[] using Array.from(obj) method
    const addedImageArray = Array.from(files);
    // updated adding new image into an existing array (previewImageArray)
    addedImageArray?.forEach((newImg) =>
      setPreviewImageArray((prev: any) => [
        ...prev,
        {
          id: previewImageArray.length + 1,
          image: URL.createObjectURL(newImg),
        },
      ])
    );
  };


  return (
    <div className="add_photo">
      <input
        type="file"
        multiple={true}
        name="add-image"
        id="_addImage"
        accept="image/*"
        onChange={(e) => handleAddImage(e)}
      />
      <label className="label_block" htmlFor="_addImage">
        <BiImageAdd className="add_icon" />
        Add Image
      </label>
    </div>
  );
};

export default memo(AddImage);
