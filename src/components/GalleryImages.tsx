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
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleOnDragStart = (
    e: DragEvent<HTMLDivElement>,
    dragItem_index: number
  ): void => {
    dragItem.current = dragItem_index;
  };

  const handleOnDragEnter = (dragOverItem_index: number): void => {
    dragOverItem.current = dragOverItem_index;
  };

  const handleSorting = (): void => {
    const _duplicateArray = [...previewImageArray];

    // remove and save dragged image index
    const draggedImageIndex = _duplicateArray.splice(dragItem.current, 1)[0];

    // switching the position
    _duplicateArray.splice(dragOverItem.current, 0, draggedImageIndex);

    //reset the index
    dragItem.current = null;
    dragOverItem.current = null;

    //updated the sortable array to the final array
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

  console.log("* selectedImages", selectedImages)
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
            onDragEnter={(e) => handleOnDragEnter(index)}
            onDragEnd={handleSorting}
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