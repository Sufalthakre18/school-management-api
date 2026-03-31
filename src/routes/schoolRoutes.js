import express from "express";
import { addSchool, listSchools } from "../controller/schoolController.js";
import {
  validateAddSchool,
  validateListSchools,
} from "../middleware/validate.js";

const router = express.Router();

router.post("/addschool", validateAddSchool, addSchool);
router.get("/listschools", validateListSchools, listSchools);

export default router;