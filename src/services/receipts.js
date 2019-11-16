import axios from "axios";

export const fetchReceipts = request => {
  return axios
    .post("https://167.172.44.51/api/photo", request)
    .then(response => {
      return response.data.results;
    })
    .catch(e => {
      console.log(e);
      throw e;
    });
};

export const makeReceiptsRequest = file => {
  const data = new FormData();
  data.append("file", file, file.name);
  return data;
};
