import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthServices {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
    let promise = this.account.createSession(
      "pateldhruv123890@gmail.com",
      "REEBOKdhru@123"
    );
    promise.then(
      function (response) {
        console.log(response); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      await this.login({ email, password });
      return user;
    } catch (error) {
      console.log("Error in auth service :: create account", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Error in auth service :: login service", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error in auth service :: get current user service", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in auth service :: logout service", error);
    }
  }
}

const authServices = new AuthServices();

export default authServices;
