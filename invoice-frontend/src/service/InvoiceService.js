import axios from "axios";

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
