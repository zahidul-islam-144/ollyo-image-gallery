import React, { ChangeEvent, FC, FormEvent } from 'react';
import { BiImageAdd } from "react-icons/bi";
import { HTMLInputEvent } from '../utilities/types';

const AddImage:FC = () => {

    const handleAddImage = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target?.files as FileList
        const addedImageArray = Array.from(files) // converting FileList to File[]
        console.log("* added:", addedImageArray)
    }
    return (
        <div className='add_photo' >
            <input
                type="file"
                multiple={true}
                name="add-image"
                id="_addImage"
                accept='image/*'
                onChange={(e)=>handleAddImage(e)}
            />
            <label className='label_block' htmlFor="_addImage">
                <BiImageAdd className='add_icon'/>
                Add Image
            </label>
        </div>
    );
};

export default AddImage;