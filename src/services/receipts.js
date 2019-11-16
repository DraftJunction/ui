import axios from "axios";

export const fetchReceipts = request => {
  debugger;
  return axios
    .post("http://167.172.44.51:1323/photo", request)
    .then(a => {
      debugger;
    })
    .catch(e => {
      debugger;
    });
};

export const makeReceiptsRequest = file => {
  const data = new FormData();
  data.append("file", file, file.name);
  return data;
};
