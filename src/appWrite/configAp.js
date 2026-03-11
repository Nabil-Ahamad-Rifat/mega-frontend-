import { Client, Databases, Query, Storage, ID} from "appwrite";
import config from "../config/config.js";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(config.appwriteurl).setProject(config.projectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.database.createDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.log("appWrite error", error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status}) {
    try {
      return await this.database.updateDocument(
        config.databaseId,
        config.collectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        },
      );
    } catch (error) {
      console.log("appWrite error", error);
    }
  }
  async deletePost(slug){
    try {
        await this.database.deleteDocument(
            config.databaseId,
            config.collectionId,
            slug
        )
        return true;
    } catch (error) {
        console.log("appWrite error", error);
        return false;
    }
  }
  async getPosts(query =[Query.equal("status","active")] ){
    try {
        return await this.database.listDocuments(
            config.databaseId,
            config.collectionId,
            query
        )
    } catch (error) {
        console.log("appWrite error", error);
    }
  }
  async uploadImage(file){
    try {
        return await this.bucket.createFile(
            config.bucketId,
            ID.unicue(),
            file
        )
        
    } catch (error) {
        console.log("appWrite error", error);
    }
  }
  async delefile(fileId){
    try {
        await this.bucket.deleteFile(
            config.bucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("appWrite error", error);
        return false
    }
  }
}

const service = new Service();
export default service;
