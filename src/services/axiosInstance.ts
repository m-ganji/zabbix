import axios from "axios";
const instance = axios.create({
  baseURL: "https://persian-zabbix-backend.com/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
    },
});

const instanceZabbix = axios.create({
  baseURL: "http://172.16.160.26/zabbix/api_jsonrpc.php",
});

export { instance, instanceZabbix };
