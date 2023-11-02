import { Dispatch, SetStateAction } from "react";

export interface ContextType {
    isSelect: boolean,
    setIsSelect: Dispatch<SetStateAction<boolean|any>>;
  }

  export interface ImageArrayType {
    [key:string] : string | number | any;
  }