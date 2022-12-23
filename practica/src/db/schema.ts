import { User } from "../types.ts";
import { ObjectId } from "mongo";

export type UserSchema = Omit<User, "id"|"team"> & {
  _id: ObjectId;
  password:string;
};
