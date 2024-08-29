import { Models } from "node-appwrite";

export interface User extends Models.Document {
  userId: string| undefined;
  name: string| undefined;
  email: string| undefined;
  phone: string| undefined;
  
  birthDate: Date| undefined;
  gender: Gender;
  role: string| undefined;
  password:string| undefined;
  
  designation:string;
  department:string;
  
 
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;

}

export interface Appointment extends Models.Document {
  user: User;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}