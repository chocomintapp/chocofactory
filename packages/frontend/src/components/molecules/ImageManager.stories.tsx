import React from "react";
import { images } from "../../__fixtures__/mock.stories.json";
import { ImageManager, ImageManagerProps } from "./ImageManager";

const args: ImageManagerProps = {
  imageList: images,
};

export default {
  title: "Molecules/ImageManager",
  component: ImageManager,
  args,
};

export const Control: React.FC<ImageManagerProps> = (props) => <ImageManager {...props}>{props.children}</ImageManager>;
