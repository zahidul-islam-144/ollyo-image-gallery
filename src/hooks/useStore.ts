import { useContext } from "react";
import { MyContext } from "../contexts/StoreContext";

// global store custom hook
const useStore = () => {
  const contextData = useContext(MyContext);
  return contextData;
};

export default useStore;
