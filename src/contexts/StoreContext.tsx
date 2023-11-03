import React, { FC, ReactNode, createContext, useState } from "react";
import { ContextType, ImageArrayType } from "../utilities/types";
import { imageArrayList } from "../utilities/utils";

type PropsType = {
  children: ReactNode;
};

const defaultValues = {
  isDeleted: false,
  setIsDeleted: (): boolean | any => null,
  previewImageArray: [],
  setPreviewImageArray: (): any => [],
  selectedImages: [],
  setSelectedImages: (): any => [],
};

// creating context to share data,logic in whole project
export const MyContext = createContext<ContextType>(defaultValues);

//setting provider
const StoreProvider: FC<PropsType> = ({ children }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [previewImageArray, setPreviewImageArray] =
    useState<ImageArrayType[]>(imageArrayList);
  const [selectedImages, setSelectedImages] = useState<[]>([]);

  console.log("* previewImageArray:", previewImageArray);
  // console.log("* selectedImages:", selectedImages);
  return (
    <MyContext.Provider
      value={{
        previewImageArray,
        setPreviewImageArray,
        isDeleted,
        setIsDeleted,
        selectedImages,
        setSelectedImages,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default StoreProvider;
