import express from 'express';
import { checkAccountBalance, createNewAccount, creditBalance, debitBalance, deleteAccount, deleteTransection, getAccountById, getAccountEditById, getAllAccount, getTransections, transferBalance, updateAccount } from '../controllers/accountHolderController.js';
import { authUser } from '../middlewares/authUser.js';
import { accountHolderSchemaValidationMiddelware } from '../middlewares/schemaValidationMiddleware.js';
const router=express.Router();

router.get("/", authUser, getAllAccount);
router.get("/:aadhar", authUser, getAccountById);
router.get("/edit/:aadhar", getAccountEditById);
router.post("/new", authUser, accountHolderSchemaValidationMiddelware, createNewAccount);
router.post("/credit", authUser, creditBalance);
router.post("/debit", authUser, debitBalance);
router.get("/balance/:aadhar", authUser, checkAccountBalance);
router.post("/transfer", authUser, transferBalance);
router.put("/:aadhar", authUser, updateAccount)
router.delete("/:aadhar", authUser, deleteAccount);
router.get("/transection/:aadhar", authUser, getTransections);
router.delete("/transection/:id",  deleteTransection);

export default router;