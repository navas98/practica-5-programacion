import { ObjectId } from "mongo";
import {  UserCollection } from "../db/dbconnection.ts";
import { UserSchema } from "../db/schema.ts";
import { User } from "../types.ts";
import * as bcrypt from "bcrypt"
import { createJWT } from "./utils/jwt.ts";
export const Mutation = {
  singup:async(_:unknown,args:{
    username:string,
    password:string,
  }):Promise<Omit<UserSchema,"password"> >=>{
    const {username, password}=args;
    const exist=await UserCollection.findOne({username});
    
    if(exist)throw new Error("User alredy exists");
    
    const fecha=new Date();
    const hash=await bcrypt.hash(password);
    
    const _id=await UserCollection.insertOne({
      username,
      password:hash,
      date:fecha,
      idioma:"esp"
    });
    return {
      _id,
      username,
      date:fecha,
      idioma:"esp"
    }
  },
  login:async(_:unknown,args:{
    username:string,password:string
  })=>{
    try {
      const {username, password}=args;
    const token=crypto.randomUUID();
        const user =await UserCollection.findOne({
          username
        })
        if(!user)throw new Error("user and password do not match");
        const ok =await bcrypt.compare(password,user.password);
        if(!ok)throw new Error("user and password do not match");
        return await createJWT({
          username,date:user.date,idioma:user.idioma,id:user._id.toString(),secretKey:"miclavesecreta"
        })
    } catch (error) {
      throw new Error(error);
    }
    
  
  }
}
