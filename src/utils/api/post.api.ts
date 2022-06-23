import api from "./axios";
import { AxiosInstance } from "axios";

class Post {
  constructor(private readonly request: AxiosInstance) {}

  async getPosts() {
    return this.request.get(`/posts`);
  }

  async createPosts(data: {
    title: string;
    message: string;
    tags: string[];
    selectedFile: string;
  }) {
    return this.request.post("/posts", data);
  }

  async updatePosts(
    data: {
      title: string;
      message: string;
      tags: string[];
      selectedFile: string;
      createdAt: string;
    },
    id: string,
  ) {
    return this.request.patch(`/posts/${id}`, data);
  }

  async deletePosts(id: string) {
    return this.request.delete(`/posts/${id}`);
  }

  async likePosts(id: string) {
    return this.request.patch(`/posts/${id}/likePosts`);
  }

  async commentPosts(id: string, comment: string) {
    return this.request.post(`/posts/${id}/postComments`, { comment });
  }

  async searchPosts(data: { searchQuery: string; tags: string }) {
    return this.request.get(
      `/posts/search?searchQuery=${data.searchQuery || "none"}&tags=${
        data.tags || "none"
      }`,
    );
  }

  async getPost(id: any) {
    return this.request.get(`/posts/${id}`);
  }
}

const PostService = new Post(api);

export default PostService;
