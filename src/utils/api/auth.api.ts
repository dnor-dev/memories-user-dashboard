import api from "./axios";
import { AxiosInstance } from "axios";

class Auth {
  constructor(private readonly request: AxiosInstance) {}

  async signin(data: { email: string; password: string }) {
    return this.request.post("/user/signin", data);
  }

  async signup(data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request.post("/user/signup", data);
  }

  async getProfile() {
    return this.request.get("/user");
  }
}

const AuthService = new Auth(api);

export default AuthService;
