import axios, { AxiosInstance } from "axios";

const baseURL = `https://api.cloudinary.com/v1_1/dnor-dev/image`;

const defaultConfig = {
  baseURL,
  timeout: 60000,
};

const api = axios.create({ ...defaultConfig });

class CloudinaryApi {
  constructor(private readonly requestService: AxiosInstance) {}

  async uploadImage(file: string | ArrayBuffer | null) {
    const data = {
      file,
      upload_preset: "food_app",
    };
    return this.requestService.post("/upload", data);
  }
}

const CloudinaryApiService = new CloudinaryApi(api);

export default CloudinaryApiService;
