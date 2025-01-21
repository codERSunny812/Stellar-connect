import Resizer from "react-image-file-resizer";
const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;



//function to resize the image before uploading
export const resizeFile = (file) => {
  console.log("inside resize file function");
  console.log("file in resize function:",file);
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, //original file
      800,  //max width
      800,   //max height
      "JPEG",   //output format
      90,  //quality
      0,    //rotation
      (uri) => {
        resolve(uri);   //callback function  for resized file
      },
      "file"
    );
  });
};


// function to upload the file to cloudinary and return the file URL
export const fileUpload =async(file)=>{
  console.log("inside file upload function");
  console.log("file in file upload function:",file);
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "Stellar_connect");

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to Cloudinary");
    }


    const data = await response.json();
    return data.secure_url; // Return the file URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }


}