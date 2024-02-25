import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

class ConfigServices {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createBlog({ title, slug, featuredImage, content, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error in config service :: create blog", error);
    }
  }

  async updateBlog({ title, slug, featuredImage, content, status, userId }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          featuredImage,
          content,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error in config service :: update blog", error);
    }
  }

  async getBlogs(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Error in config service :: get blogs", error);
      return false;
    }
  }

  async getBlog(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteBucketId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in config service :: get blog", error);
    }
  }

  async deleteBlog(slug) {
    try {
      return await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Error in config service :: delete blog", error);
    }
  }

  async fileUpload(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error in config service :: file upload", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error in config service :: delete file", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error in config service :: Get file preview", error);
    }
  }
}

const configServices = new ConfigServices();

export default configServices;
