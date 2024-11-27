import { Request, Response } from "express";
import USERS from "../models/user";

export async function getUser(req: Request, res: Response) {
  try {
    const user= await USERS.find()
    res.json({ success: true,user });
    return
  } catch (error) {
    console.log("Error on getting User ", error);
    res.json({success:false,error:"Internal Server Error"})
    return
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    res.end("Hello");
  } catch (error) {
    console.log("Error on adding user ", error);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    res.end("Hello");
  } catch (error) {
    console.log("Error on updating user", error);
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    res.end("Hello");
  } catch (error) {
    console.log("Error on deleting user ", error);
  }
}
