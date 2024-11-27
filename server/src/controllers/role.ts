import { Request, Response, Router } from "express";
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
    const body = req?.body;
    if (!body?.name || !body?.permissions) {
      res.json({ success: false, error: "Incomplete Details" });
      return;
    }
    const role = await ROLES.create({
      ...body
    });
    if (!role) {
      res.json({ success: false, error: "Error in creating user" });
      return;
    }
    res.json({ success: true, role });
    return;
  } catch (error) {
    console.log("Error on adding role ", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}

export async function updateRole(req: Request, res: Response) {
  try {
    const body = req?.body;

    if (!body?.id) {
      res.json({ success: false, error: "No User ID found" });
      return;
    }

    if (!body?.update) {
      res.json({ success: false, error: "No data found to update", body });
      return;
    }

    const role = await ROLES?.findByIdAndUpdate(body?.id, body?.update);

    if (!role) {
      res.json({ success: false, error: "Error on updating role" });
      return;
    }

    res.json({ success: true });
    return;
  } catch (error) {
    console.log("Error on updating role", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}

export async function deleteRole(req: Request, res: Response) {
  try {
    const id = req?.query?.id;

    if (!id) {
      res.json({ success: false, error: "No Role ID found" });
      return;
    }
    const role = await ROLES?.findByIdAndDelete(id);
    if (!role) {
      res.json({ success: false, error: "Error on deleting role" });
      return;
    }
    res.json({ success: true });
    return;
  } catch (error) {
    console.log("Error on deleting role ", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}
