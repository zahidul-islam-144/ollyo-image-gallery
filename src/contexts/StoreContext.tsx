import React, { FC, ReactNode, createContext, useState } from "react";
import { ContextType } from "../utilities/types";

type PropsType = {
  children: ReactNode;
};

const defaultValues = {
  isSelect: false,
  setIsSelect: (): boolean | any => null,
};

// creating context to share data,logic in whole project
export const MyContext = createContext<ContextType>(defaultValues);


//setting provider
const StoreProvider:FC<PropsType> = ({ children }) => {
  const [isSelect, setIsSelect] = useState<boolean>(true);

  return (
    <MyContext.Provider value={{ isSelect, setIsSelect }}>
      {children}
    </MyContext.Provider>
  );
};

export default StoreProvider;
