import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzMDY0ODc2LCJleHAiOjE3MjU2NTY4NzZ9.alxXRtLDM_Kj2Begn4oRXAULiLSH4DSNwop_tmotkD0'
  },
});

export default api;
