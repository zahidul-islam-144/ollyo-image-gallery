import React, {
  ChangeEvent,
  DragEvent,
  FC,
  FormEvent,
  SyntheticEvent,
  useRef,
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

  const [dragImageIndex, setDragImageIndex] = useState<number | null>(null);
  const [dragOverImageIndex, setDragOverImageIndex] = useState<number | null>(
    null
  );
  const [checkedId, setCheckedId] = useState<number | null>(null);
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  const handleSorting = (): void => {
    const _duplicateArray = [...previewImageArray];

    // removre and save dragged image index
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
      (item) => item?.id === Number(value)
    );

    //if unchecked
    const filteredUnchecked = selectedImages.filter(
      (item) => item?.id !== Number(value)
    );

    if (checked) {
      setCheckedId(Number(value));
      setSelectedImages((prev: any) => [...prev, filteredChecked[0]]);
    } else {
      setCheckedId(null);
      setSelectedImages(filteredUnchecked);
    }
  };

  return (
    <div className="image_container">
      {previewImageArray.map((pItem, index) => (
        <>
          <div
            key={pItem?.id}
            className={`pItem${index + 1} singleImageBlock`}
            id={pItem?.id}
            onDragOver={(e:DragEvent<HTMLDivElement>)=>e.preventDefault()}
            onDragStart={(e) => (dragItem.current = index)}
            onDragEnter={(e) => (dragOverItem.current = index)}
            onDragEnd={handleSorting}
            draggable={true}
          >
            <img src={pItem?.image} alt={pItem?.id} />
            <div className={`hover_overlay  `}></div>
            <input
              type="checkbox"
              id={pItem?.id}
              // checked = {isChecked ? true : false}
              value={pItem?.id}
              name="image-selection"
              onChange={(e) => handleCheckBox(e)}
              onClick={() => setCheckedId(pItem)}
            />
          </div>
        </>
      ))}

      <AddImage />
    </div>
  );
};

export default GalleryImages;

/*

${
                selectedImages.filter((selectItem) => selectItem?.id === pItem) &&
                "select_overlay"
              }

*/
