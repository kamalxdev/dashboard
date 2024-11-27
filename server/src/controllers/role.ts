import { Request, Response } from "express";
import ROLES from "../models/role";

export async function getRoles(req: Request, res: Response) {
  try {
    const role= await ROLES.find()
    res.json({ success: true,role });
    return
  } catch (error) {
    console.log("Error on getting Roles ", error);
    res.json({success:false,error:"Internal Server Error"})
    return
  }
}

export async function addRole(req: Request, res: Response) {
    try {
        res.end("Hello");
      } catch (error) {
        console.log("Error on adding Roles ", error);
      }
}

export async function updateRole(req: Request, res: Response) {
    try {
        res.end("Hello");
      } catch (error) {
        console.log("Error on updating Roles ", error);
      }
}

export async function deleteRole(req: Request, res: Response) {
    try {
        res.end("Hello");
      } catch (error) {
        console.log("Error on deleting Roles ", error);
      }
}
