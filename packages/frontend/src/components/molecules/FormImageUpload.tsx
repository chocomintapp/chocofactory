import React from "react";
import { ipfs, ipfsHttpsBaseUrl } from "../../modules/ipfs";
import { ImageUploadIcon } from "../atoms/ImageUploadIcon";
import { Label } from "../atoms/Label";

export interface FormImageUploadProps {
  label: string;
  setState: (input: any) => void;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({ label, setState }) => {
  const [imagePreview, setImagePreview] = React.useState("");
  const [isImageLoading, setIsImageLoading] = React.useState(false);

  const clickInputFile = () => {
    document.getElementById("file")!.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processImage(event.target.files[0]);
    }
  };

  const readAsArrayBufferAsync = (file: File) => {
    return new Promise((resolve) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsArrayBuffer(file);
    });
  };

  const uploadFileToIpfs = async (file: File) => {
    const { name } = file;
    const type = name.substring(name.lastIndexOf(".") + 1);
    const fileBuffer = await readAsArrayBufferAsync(file);
    const fileUint8Array = new Uint8Array(fileBuffer as Buffer);
    const path = `nft.${type}`;
    const { cid } = await ipfs.add({
      path: `images/${path}`,
      content: fileUint8Array,
    });
    return `${ipfsHttpsBaseUrl}${cid}/${path}`;
  };

  const processImage = async (file: File) => {
    setImagePreview("");
    setIsImageLoading(true);
    const preview = URL.createObjectURL(file);
    const url = await uploadFileToIpfs(file);
    setImagePreview(preview);
    setState(url);
    setIsImageLoading(false);
  };

  return (
    <div>
      <Label text={label} />
      <div id="dropContainer h-full">
        <div className="mt-1 h-full flex justify-center p-8 border border-gray-300 border-dashed rounded-xl shadow-sm">
          <div className={"cursor-pointer"} onClick={clickInputFile}>
            <div
              className={`
              ${isImageLoading ? "" : ""}`}
            >
              {!imagePreview ? (
                <ImageUploadIcon />
              ) : (
                <img className="rounded-xl shadow-md object-cover mx-auto" src={imagePreview} />
              )}
            </div>
            <input onChange={handleChange} id="file" type="file" accept="image/*" className="sr-only" />
          </div>
        </div>
      </div>
    </div>
  );
};
