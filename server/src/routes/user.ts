import { Router } from "express";
import { addUser, deleteUser, getUser, updateUser } from "../controllers/user";

const router = Router();

router.get("/", getUser);
router.post("/", addUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router

