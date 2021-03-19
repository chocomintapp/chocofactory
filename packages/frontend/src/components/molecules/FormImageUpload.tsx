import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ipfs, ipfsHttpsBaseUrl } from "../../modules/ipfs";
import { getFileType } from "../../modules/util";
import { ImageUploadIcon } from "../atoms/ImageUploadIcon";
import { Label } from "../atoms/Label";

export interface FormImageUploadProps {
  label: string;
  value: string;
  accept?: string;
  setState?: (input: string) => void;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({ label, value, accept, setState }) => {
  const [imagePreview, setImagePreview] = React.useState("");
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [type, setType] = React.useState("");

  const id = uuidv4();

  React.useEffect(() => {
    if (!value) return;
    const type = getFileType(value);
    setType(type);
    setImagePreview(value);
  }, [value]);

  const clickInputFile = () => {
    const element = document.getElementById(id) as HTMLElement;
    element.click();
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
    const type = getFileType(name.substring(name.lastIndexOf(".") + 1));
    const fileBuffer = await readAsArrayBufferAsync(file);
    const fileUint8Array = new Uint8Array(fileBuffer as Buffer);
    const path = `nft.${type}`;
    const { cid } = await ipfs.add({
      path: `images/${path}`,
      content: fileUint8Array,
    });
    return { url: `${ipfsHttpsBaseUrl}${cid}/${path}`, type };
  };

  const processImage = async (file: File) => {
    if (!setState) return;
    setImagePreview("");
    setIsImageLoading(true);
    const preview = URL.createObjectURL(file);
    const { url, type } = await uploadFileToIpfs(file);
    console.log(preview);
    setType(type);
    setImagePreview(preview);
    setState(url);
    setIsImageLoading(false);
  };

  return (
    <div>
      <Label text={label} />
      <div id="dropContainer h-full">
        <div className="mt-1 h-full flex justify-center border border-gray-300 border-dashed rounded-md">
          <div className={"cursor-pointer"} onClick={clickInputFile}>
            {!imagePreview ? (
              <div className={`h-20 w-20 m-10 ${isImageLoading && "opacity-25 animate-bounce"}`}>
                <ImageUploadIcon />
              </div>
            ) : (
              <>
                {type == "png" || type == "jpg" || type == "jpeg" || type == "gif" ? (
                  <div className="h-32 w-32 m-4">
                    <img className="rounded-md h-full object-cover mx-auto" src={imagePreview} />
                  </div>
                ) : type == "mp3" ? (
                  <div className="h-32 w-64 m-4">
                    <audio className="h-full" controls>
                      <source src={imagePreview} type="audio/mpeg" />
                    </audio>
                  </div>
                ) : type == "mp4" ? (
                  <div className="h-32 w-32 m-4">
                    <video className="rounded-md h-full object-cover mx-auto" controls>
                      <source src={imagePreview} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <div className={`h-20 w-20 m-10 ${isImageLoading && "opacity-25 animate-bounce"}`}>
                    <ImageUploadIcon />
                  </div>
                )}
              </>
            )}
            <input onChange={handleChange} id={id} type="file" accept={accept} className="sr-only" />
          </div>
        </div>
      </div>
    </div>
  );
};
