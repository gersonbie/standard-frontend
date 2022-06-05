import axios from "axios";

export const REQUEST_TIMEOUT = 90 * 1000;
export const APIKit = axios.create({
  baseURL: "https://standard-backend.herokuapp.com",
  timeout: REQUEST_TIMEOUT,
});

export const uploadFile = (ficheiro) => {
  return new Promise((resolve, reject) => {
    if (ficheiro) {
      const formData = new FormData();
      formData.append("file", ficheiro, ficheiro.name);
      formData.append("appname", "standardbank");
      axios
        .post(
          "https://filestorage.ejitech.co.mz/controllers/upload.php",
          formData
        )
        .then((response) => resolve(response.data.url))
        .catch((err) => reject(err));
    }else{
      resolve(null);
    }
    
  });
};
