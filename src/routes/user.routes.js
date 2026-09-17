import { Router } from "express";
import { userRegister } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields(               //In this step we are doing file handling by using (multer)
        {
            name: "avator",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1 
        }
    ),
    userRegister)


export  {router as userRouter}