import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getInvoices = async () => {
  const response = await axios.get(`${API_BASE_URL}/invoices`);
  return response.data;
};

export const getAllInvoices = (baseURL, token) => {
  return axios.get(`${baseURL}/invoices`, {
    headers: {
      Authorization: `Bearer ${token}`,   // correct header
    },
  });
};

export const saveInvoice = (baseURL, payload, token) => {
  return axios.post(`${baseURL}/invoices`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteInvoice = (baseURL, id, token) => {
  return axios.delete(`${baseURL}/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
