import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
  const formData = new FormData();
  formData.append("file", imageData);
  formData.append("upload_preset", "invoices-thumbnail"); // Cloudinary preset name
  // Note: cloud_name formData lo append cheyyakudadhu, URL lo untundhi


  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dfkkdnkze/image/upload",
    formData
  );

  // Return Cloudinary image URL
  return res.data.secure_url;
};
