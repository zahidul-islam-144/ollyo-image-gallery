import React, {
  ChangeEvent,
  DragEvent,
  FC,
  FormEvent,
  SyntheticEvent,
  useState,
} from "react";
import { imageArrayList } from "../utilities/utils";
import AddImage from "./AddImage";
import { ImageArrayType } from "../utilities/types";
import useStore from "../hooks/useStore";

const GalleryImages: FC = () => {
  const {
    previewImageArray,
    setPreviewImageArray,
    selectedImages,
    setSelectedImages,
    isDeleted,
  } = useStore();
  const [targetId, setTargetId] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("* dragOver:", e);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    // console.log("* dragStart:", e);
    setTargetId(Number(id));
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>, id: number) => {
    console.log("* handleOnDrop:", e);
    const dragImage = previewImageArray.find(
      (element) => element?.id == targetId
    );
    const dropImage = previewImageArray.find(
      (element) => element.id == e.currentTarget.id
    );
    const updatedArray = handleMovement(dragImage?.id - 1, dropImage?.id - 1);
    setPreviewImageArray(updatedArray);
  };

  const handleMovement = (from: any, to: any) => {
    const f = previewImageArray.splice(from, 1)[0];
    previewImageArray.splice(to, 0, f);
    return previewImageArray;
  };

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e?.target;

    const filteredChecked = previewImageArray.filter(
      (item) => item?.id === Number(value));

    const filteredUnchecked = selectedImages.filter(
      (item) => item?.id !== Number(value))

    if (checked) {
      setSelectedImages((prev: any) => [...prev, filteredChecked[0]]);
    } else {
      setSelectedImages(filteredUnchecked);
    }
    console.log("* checkBox:", value, checked, filteredChecked[0]);
  };



  console.log("* selectedImages:", selectedImages);
  // console.log("* isChecked:", isChecked);
  return (
    <div className="image_container">
      {previewImageArray.map((pItem, index) => (
        <>
          <div
            key={pItem?.id}
            className={`pItem${index + 1}`}
            id={pItem?.id}
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => handleDragStart(e, pItem?.id)}
            onDrop={(e) => handleOnDrop(e, pItem?.id)}
            draggable={true}
            
          >
            <img src={pItem?.image} alt={pItem?.id} />
            <input
              type="checkbox"
              id={pItem?.id}
              // checked = {isChecked ? true : false}
              value={pItem?.id}
              name="image-selection"
              onChange={(e) => handleCheckBox(e)}
            />
          </div>
        </>
      ))}

      <AddImage />
    </div>
  );
};

export default GalleryImages;
