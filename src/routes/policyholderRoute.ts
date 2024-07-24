import { Router } from "express";
import { createPolicyholder, getPolicyholders, getPolicyholderById, getTopParent } from "../controllers/policyholderController";


const router = Router();

//create a new policyholder
router.post("/policyholder", createPolicyholder);

//get all policyholders
router.get("/policyholders", getPolicyholders); 

//get a policyholder by id
router.get("/policyholders/:code", getPolicyholderById); 

//get top parent of a policyholder
router.get("/policyholders/:code/top", getTopParent);


export default router;

