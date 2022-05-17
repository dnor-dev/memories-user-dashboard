import api from "./axios";
import { AxiosInstance } from "axios";

class Post {
  constructor(private readonly request: AxiosInstance) {}

  async getPosts() {
    return this.request.get("/posts");
  }

  async createPosts(data: {
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
  }) {
    return this.request.post("/posts", data);
  }

  async deletePosts(id: string) {
    return this.request.delete(`/posts/${id}`);
  }
}

const PostService = new Post(api);

export default PostService;
