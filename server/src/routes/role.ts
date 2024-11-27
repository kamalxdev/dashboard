import { Router } from "express";
import { addRole, deleteRole, getRoles, updateRole } from "../controllers/role";

const router = Router();

router.get("/", getRoles);
router.post("/", addRole);
router.put("/", updateRole);
router.delete("/", deleteRole);

module.exports = router
