import { asyncHandler } from '../utils/asyncHandler.js'
import { APIError } from '../utils/APIError.js'
import { User } from '../models/user.model.js'
import { APIResponse  } from '../utils/APIResponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'


const userRegister = asyncHandler( async (req, res) => {
    res.status(200).json({
        message : "Hello Jee!"
    })


//steps of userRegister (what can we do in userRegister)

//.1) Get user details from frontend
//.2) Validation - not empty
//.3) Check if user already exists: username, email 
//.4) Check for image or check for avator
//.5) Upload on cloudinary, avator
//.6) Create user object, create entry in DB
//.7) Remove password and refresh token field from response
//.8) Check user creation
//.9) Return response to frontend

//step: 01

    const { fullName, email, username, password } = req.body;
console.log("Full-Name: ", fullName, "Email: ", email, "Password: ", password)

//step: 02

if(
    [fullName, email, username, password].some((field) =>
        field.trim() === "" ) 
){
    throw new APIError(400, "All field are required ")
}


//step: 03

const existUser = User.findOne({
    $or: [{ username }, { email }]
})

if(existUser){
    throw new APIError(408, "User with email or username already exists")
}

//step: 04

const avatorLocalPath = req.files?.avator[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatorLocalPath) {
    throw new APIError(400, "Avator file is required")
}

//step: 05 

const avator = await uploadOnCloudinary(avatorLocalPath);
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avator){
    throw new APIError(400, "Avator file is required")
}


//step: 06

const user = await User.create({
    fullName,
    avator: avator.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

//step: 07, 08

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new APIError(500, "Something is wrong while registering the user ")
}

//step: 09

return res.status(201).json(
    new APIResponse(200, createdUser, "User Register Successfully !!")
)

})







export { userRegister }