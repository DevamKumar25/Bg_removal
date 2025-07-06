import express from "express";
import { clerkWebhooks, userCredit,paymentRazorpay, verifyRazorpay } from "../controllers/UserController.js";
import { authUser } from "../middlewares/auth.js";

const userRouter = express.Router();



userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credit", authUser, userCredit);
userRouter.post("/pay-razor", authUser, paymentRazorpay);
userRouter.post('/verify-razor',verifyRazorpay)


export default userRouter;



