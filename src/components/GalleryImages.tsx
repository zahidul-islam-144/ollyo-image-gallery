import React, {
  Dispatch,
  DragEvent,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { imageArray } from "../utilities/utils";
import AddImage from "./AddImage";
import { ImageArrayType } from "../utilities/types";

const GalleryImages: FC = () => {
  const [targetId, setTargetId] = useState<number | null>(null);
  const [imageArray2, setImageArray2] = useState<ImageArrayType[]>(imageArray);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("* dragOver:", e);
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    console.log("* dragStart:", e);
    setTargetId(Number(id));
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>, id: number) => {
    console.log("* handleOnDrop:", e);
    const dragImage = imageArray2.find((element) => element?.id == targetId);
    const dropImage = imageArray2.find(
      (element) => element.id == e.currentTarget.id
    );
    const updatedArray = handleMovement(dragImage?.id - 1, dropImage?.id - 1);
    setImageArray2(updatedArray);
  };

  const handleMovement = (from: any, to: any) => {
    const f = imageArray2.splice(from, 1)[0];
    imageArray2.splice(to, 0, f);
    return imageArray2;
  };

  console.log("* targetId:", targetId);
  return (
    <div className="image_container">
      {imageArray2.map((item, index) => (
        <>
          {/* {console.log('* item',item)} */}
          <div
            key={item?.id}
            className={`item${index + 1}`}
            id={item?.id}
            onDragOver={(e) => handleDragOver(e)}
            onDragStart={(e) => handleDragStart(e, item?.id)}
            onDrop={(e) => handleOnDrop(e, item?.id)}
          >
            <img src={item?.image} alt="product_photo" />
          </div>
        </>
      ))}

      <AddImage />
    </div>
  );
};

export default GalleryImages;

