import { Request, Response } from "express";
import USERS from "../models/user";

export async function getUser(req: Request, res: Response) {
  try {
    const user = await USERS.find();
    res.json({ success: true, user });
    return;
  } catch (error) {
    console.log("Error on getting User ", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}

export async function addUser(req: Request, res: Response) {
  try {
    const body = req?.body;
    if (!body?.name || !body?.email || !body?.role) {
      res.json({ success: false, error: "Incomplete Details" });
      return;
    }
    const user = await USERS.create({
      ...body,
      status: "Active",
    });
    if (!user) {
      res.json({ success: false, error: "Error in creating user" });
      return;
    }
    res.json({ success: true, user });
    return;
  } catch (error) {
    console.log("Error on adding user ", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}

export async function updateUser(req: Request, res: Response) {
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

    const user = await USERS?.findByIdAndUpdate(body?.id, body?.update);

    if (!user) {
      res.json({ success: false, error: "Error on updating user" });
      return;
    }

    res.json({ success: true });
    return;
  } catch (error) {
    console.log("Error on updating user", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req?.query?.id;

    if (!id) {
      res.json({ success: false, error: "No User ID found" });
      return;
    }
    const user = await USERS?.findByIdAndDelete(id);
    if (!user) {
      res.json({ success: false, error: "Error on deleting user" });
      return;
    }

    res.json({ success: true });
    return;
  } catch (error) {
    console.log("Error on deleting user ", error);
    res.json({ success: false, error: "Internal Server Error" });
    return;
  }
}
