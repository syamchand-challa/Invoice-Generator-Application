import React, { useState, useRef, useEffect, useContext } from "react";
import { templates } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import InvoicePreview from "../components/InvoicePreview";
import { saveInvoice } from "../service/invoiceService.js";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService.js";
import { deleteInvoice } from "../service/invoiceService.js";
import { generatePdfFromElement } from "../util/pdfUtils";
import { useAuth, useUser } from "@clerk/clerk-react";




const PreviewPage = () => {
    const previewRef = useRef();
    const {selectedTemplate, invoiceData, setSelectedTemplate, baseURL } = useContext(AppContext);
    const [] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const{user:UserResource} = useUser();
    const { getToken } = useAuth();



  const handleSaveAndExit = async () => {
  try {
    setLoading(true);
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
      scrolly: -window.scrollY,
    });

    const imageData = canvas.toDataURL("image/png");
    const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

    const payload = {
      ...invoiceData,
      clerkId: UserResource.id, 
      thumbnailUrl,
      template: selectedTemplate,
    };

    const token = await getToken();
    const response = await saveInvoice(baseURL, payload, token);
    if (response.status === 200) {
      toast.success("Invoice saved successfully!");
      navigate("/dashboard");
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    toast.error("Failed to save invoice: " + error.message);
    console.error(error);
  } finally {
    setLoading(false);
  }
};

       const handleDelete = async () => {
    if (!invoiceData.id) {
        toast.error("No invoice selected to delete");
        return;
    }
    try {
        const token = await getToken();
        const response = await deleteInvoice(baseURL, invoiceData.id,token);
        if (response.status === 204) {
            toast.success("Invoice deleted successfully.");
            navigate("/dashboard");
        } else {
            toast.error("Unable to delete invoice.");
        }
    } catch (error) {
        toast.error("Failed to delete invoice: " + error.message);
    }
}


const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    try {
      setDownloading(true);
      await generatePdfFromElement(
        previewRef.current,
        `invoice_${Date.now()}.pdf`
      );
    } catch (error) {
      toast.error("Failed to download PDF.");
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  useEffect(() => {
      if (!invoiceData || !invoiceData.items?.length) {
        toast.error("Invoice data is empty.");
        navigate("/dashboard");
      }
    }, [invoiceData, navigate]);

 
    return (
        <div className="previewpage container-fliud d-flex flex-column p-3 min-vh-100">

             {/* Action Buttons */}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">

              {/* List of template buttons */}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                 {templates.map(({ id, label }) => (
               <button
              key={id}
              style={{ minWidth: "100px", height:"38px"}}
              onClick={() => setSelectedTemplate(id)}
              className={`btn btn-sm rounded-pill p-2 ${ selectedTemplate === id ? "btn-warning" : "btn-outline-secondary"}`}>
              {label}
          </button>
          ))}
          </div>
           {/* List of actions buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2">
        <button
        className="btn btn-primary d-flex align-items-center justify-content-center"
         onClick={handleSaveAndExit}
          disabled={loading}
          >
          {loading && <Loader2 className="me-2 spin-animation" size={18} />}
          {loading ? "Saving..." : "Save and Exit"}
          </button>
      {invoiceData.id && <button className="btn btn btn-danger" onClick={handleDelete}>Delete Invoice</button>}
     <button className="btn btn btn-secondary">Back to Dashboard</button>
          <button className="btn btn-success d-flex align-items-center justify-content-center" disabled={loading}onClick={handleDownloadPdf}>
        {downloading && (

            <Loader2 className="me-2 spin-animation" size={18}/>

        )}
        {downloading ? "Downloading...": "Downloading PDF"}
      </button>

                </div>
            </div>

            {/* Display the invoice preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">

               <div ref={previewRef}  className="invoice-preview">
                <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
               </div>

            </div>

        </div>
    )
}
export default PreviewPage;