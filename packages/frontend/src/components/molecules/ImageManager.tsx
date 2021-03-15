import React from "react";

import { ImageUpload } from "./ImageUpload";

export interface ImageManagerProps {
  imageList: string[];
}

export const ImageManager: React.FC<ImageManagerProps> = ({ imageList }) => {
  const onChange = () => {
    console.log("ok");
  };

  return (
    <section>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {imageList.map((image, i) => {
          return (
            <li key={i} className="rounded-xl overflow-hidden shadow-md">
              <img className="w-full" src={image} />
            </li>
          );
        })}
        <li className="rounded-xl overflow-hidden">
          <ImageUpload status="normal" imagePreview="" onChange={onChange} />
        </li>
      </ul>
    </section>
  );
};
