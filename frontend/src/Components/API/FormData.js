import axios from 'axios'

const formApi = axios.create({
  
    baseURL: "http://52.66.235.203:5000/form",
    timeout: 5000,
    headers: {
      'Accept-Version': 1,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

export default formApi