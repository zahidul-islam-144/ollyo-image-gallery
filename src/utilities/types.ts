import { Dispatch, SetStateAction } from "react";

export interface ContextType {
    isDeleted: boolean,
    setIsDeleted: Dispatch<SetStateAction<boolean|any>>,
    previewImageArray: any[],
    setPreviewImageArray: Dispatch<SetStateAction<[]|any>>,
    selectedImages: string[] | any[],
    setSelectedImages: Dispatch<SetStateAction<[]|any>>,
  }

  export interface ImageArrayType {
    [key:string] : string | number | any;
  }

 export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
