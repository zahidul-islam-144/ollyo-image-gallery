import React, { FC, useState } from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import useStore from "../hooks/useStore";

const TopHeader: FC = () => {
  const {
    previewImageArray,
    setPreviewImageArray,
    selectedImages,
    setSelectedImages,
    setIsDeleted,
  } = useStore();
  const hasLength: number = selectedImages?.length;

  const handleDelete = () => {
    console.log("* deleted");
    const result = previewImageArray?.filter(
      (pItem, index) => !selectedImages.some((sItem)=> sItem?.id === pItem?.id)
    );
    console.log("* deleted:result", result);
    setPreviewImageArray(result);
    setSelectedImages([]);
 
  };
  console.log("* selectedImages", selectedImages);
  return (
    <section className="topHeader_main">
      <div>
        {hasLength !== 0 ? <BsCheckSquareFill className="tickIcon" /> : <></>}
        <span>
          {hasLength !== 0 ? (
            <>
              {hasLength} {hasLength > 1 ? "Files" : "File"} Selected
            </>
          ) : (
            <>Galleries</>
          )}
        </span>
      </div>
      <div onClick={handleDelete}>
        {hasLength !== 0 && <span>Delete Files</span>}
      </div>
    </section>
  );
};

export default TopHeader;
