import React, { FC, useState } from "react";
import { BsCheckSquareFill } from "react-icons/bs";
import useStore from "../hooks/useStore";

const TopHeader: FC = () => {
    const { isSelect } = useStore();

  return (
    <section className="topHeader_main">
      <div>
        {!isSelect ? (
          <span>Gallery</span>
        ) : (
          <>
            <BsCheckSquareFill className="tickIcon" />
            <span>Files Selected</span>
          </>
        )}
      </div>
      <div>{isSelect && <span>Delete Files</span>}</div>
    </section>
  );
};

export default TopHeader;
