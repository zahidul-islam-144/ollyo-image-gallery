import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { HTMLInputEvent, ImageArrayType } from "../utilities/types";
import useStore from "../hooks/useStore";

const AddImage: FC = () => {
  const { previewImageArray, setPreviewImageArray } = useStore();
  const [newImageArray, setNewImageArray] = useState<ImageArrayType[]>([]);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files as FileList;
    // converting FileList to File[] using Array.from(obj) method
    const addedImageArray = Array.from(files);
    // updated adding newly image into existing array
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

export default AddImage;
