import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";    //bcrypt is a library used to hash passwords before storing them in a database. We use it because we should never store users' passwords as plain text.
import jwt from "jsonwebtoken";  //We are using JWT for authentication 

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

         email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fulname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

         avatar: {
            type: String,     //cloudinary url
            required: true,
        },

        coverImage: {
            type: String,      //cloudinary url 
        },

        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],

        password: {
            type: String,
            required: [true, 'Password is required']
        },

        refreshToken: {
            type: String,
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {          //do something before a specific Mongoose operation happens. (Pre is a middleware of mongoose)
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fulname: this.fulname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User", userSchema)