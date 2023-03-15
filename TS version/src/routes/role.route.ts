import * as role from "../controllers/role.controller";
import { checkUserScope } from "../middleware/checkUserScope";
import * as validation from "../middleware/validation";
import { Router } from "express";

const router = Router();

router.post("/", validation.createRole, role.create);
router.get("/", checkUserScope('role-get'), role.getAll)
export = router;

