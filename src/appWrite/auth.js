/* eslint-disable no-useless-catch */
import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new this.Client();
  account;
  constructor() {
    this.client.setEndpoint(config.appwriteurl).setProject(config.projectId);
    this.account = new Account(this.client );
  }

  async createAcchount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      const result = await this.account.createEmailPasswordSession({
        email,
        password,
      });
      if(result){
        return result
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      throw error;
    }
  }
  async getcurretUser (){
    try {
        return await this.account.get()
    } catch (error) {
        console.log("appwrite error", error)
    }
    return null;
  }
  async logout(){
    try {
        await this.account.deleteSession("current");
    } catch (error) {
        console.log("appwrite error", error)
    }
  }
}
const authService = new AuthService();

export default authService;
