import express from 'express';
import { loginEmployee, registerEmployee } from '../controllers/employeeController.js';
const router=express.Router();

router.post("/signup", registerEmployee);
router.post("/login", loginEmployee);

export default router;