import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5150/api';

const exportService = {
  exportPdf: async (resumeId) => {
    const response = await axios.post(`${API_URL}/export/${resumeId}/pdf`, {
      baseUrl: window.location.origin,
      paperSize: 'A4',
      margin: '1cm'
    }, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  exportDocx: async (resumeId) => {
    const response = await axios.post(`${API_URL}/export/${resumeId}/docx`, {
      baseUrl: window.location.origin
    }, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};

export default exportService;
