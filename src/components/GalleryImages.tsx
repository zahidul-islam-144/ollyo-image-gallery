import React, {
  ChangeEvent,
  DragEvent,
  FC,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import AddImage from "./AddImage";
import useStore from "../hooks/useStore";

const GalleryImages: FC = () => {
  const {
    previewImageArray,
    setPreviewImageArray,
    selectedImages,
    setSelectedImages,
  } = useStore();

  // const [isDragging, setIsDragging] = useState<boolean | null>(null);

  // set the draggable data
  const handleOnDragStart = (
    e: DragEvent<HTMLDivElement>,
    dragItem_index: number
  ): void => {
    const setDraggedIndex = e?.dataTransfer?.setData(
      "draggedIndex",
      dragItem_index.toString()
    );
  };

  // get the dropped data
  const handleOnDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    const getDragOverItem = e?.dataTransfer?.getData("draggedIndex");
    handleSwap(Number(getDragOverItem), dropIndex);
  };

  // swapping position from -> to
  const handleSwap = (draggedIndex: number, dropIndex: number) => {
    const _duplicateArray = [...previewImageArray];

    // get the current-items (images)
    const dragged = _duplicateArray[draggedIndex];
    const drop = _duplicateArray[dropIndex];

    //swapping their position
    _duplicateArray[draggedIndex] = drop;
    _duplicateArray[dropIndex] = dragged;

    // Update their indexes to reflect their new positions
    dragged.index = dropIndex;
    drop.index = draggedIndex;

    setPreviewImageArray(_duplicateArray);
  };

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, checked } = e?.target;

    // if checked
    const filteredChecked = previewImageArray.filter(
      (item: any) => item?.id === Number(value)
    );

    //if unchecked
    const filteredUnchecked = selectedImages.filter(
      (item: any) => item?.id !== Number(value)
    );

    if (checked) {
      setSelectedImages((prev: any) => [...prev, filteredChecked[0]]);
    } else {
      setSelectedImages(filteredUnchecked);
    }
  };

  return (
    <div className="image_container">
      {previewImageArray.map((pItem: any, index: number) =>
        previewImageArray.length !== 0 ? (
          <div
            key={pItem?.id}
            className={`pItem${index + 1} singleImageBlock`}
            id="singleImageBlock"
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDragStart={(e) => handleOnDragStart(e, index)}
            onDrop={(e) => handleOnDrop(e, index)}
            draggable={true}
          >
            <img src={pItem?.image} alt={pItem?.id} />
            <div
              className={`hover_overlay  ${
                selectedImages.find(
                  (selectItem) => selectItem?.id === pItem?.id
                ) && "select_overlay"
              }`}
            ></div>
            <input
              type="checkbox"
              id={pItem?.id}
              checked={
                selectedImages.find(
                  (selectItem) => selectItem?.id === pItem?.id
                )
                  ? true
                  : false
              }
              className={`${
                selectedImages.find(
                  (selectItem) => selectItem?.id === pItem?.id
                ) && "checked"
              }`}
              value={pItem?.id}
              name="image-selection"
              onChange={(e) => handleCheckBox(e)}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )
      )}
      <AddImage />

      {previewImageArray?.length === 0 && (
        <h3>No Data found! Please, Insert Image.</h3>
      )}
    </div>
  );
};

export default memo(GalleryImages);
