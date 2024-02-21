import axios from "axios";
const instance = axios.create({
  baseURL: "https://persian-zabbix-backend.com/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export { instance };
