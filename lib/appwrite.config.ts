import * as sdk from 'node-appwrite';
import { ID, Account } from 'node-appwrite';

export const {
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    USER_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();
export const account = new Account(client);

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);

// type LoginUserAccount = {
//   email: string,
//   password: string,
// };

// type CreateUserAccount = {
//   email: string,
//   password: string,
//   name: string,
// };

// export class AppwriteService {
//   async createUserAccount({ email, password, name }: CreateUserAccount) {
//     try {
//       const userAccount = await account.create(ID.unique(), email, password, name);
//       if (userAccount) {
//         return this.login(email, password); // Fixing method call
//       } else {
//         return userAccount;
//       }
//     } catch (error: any) {
//       throw error;
//     }
//   }

//   async login(email: string, password: string) { // Updated to only accept email and password
//     try {
//       return await account.createSession(email, password);
//     } catch (error: any) {
//       throw error;
//     }
//   }

//   async isLoggedIn(): Promise<boolean> {
//     try {
//       const data = await this.getCurrentUser();
//       return Boolean(data);
//     } catch (error) {
//       return false;
//     }
//   }

//   async getCurrentUser() {
//     try {
//       return account.get();
//     } catch (error) {
//       console.log("getCurrentUser error: " + error);
//       return null;
//     }
//   }

//   async logout() {
//     try {
//       return await account.deleteSession("current");
//     } catch (error) {
//       console.log("logout error: " + error);
//     }
//   }
// }

// const appwriteService = new AppwriteService();
// export default appwriteService;
