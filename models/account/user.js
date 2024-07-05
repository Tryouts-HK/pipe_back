import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Auth from '../auth/auth.js';
import { createToken, verifyToken } from '../../utils/token.js';

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    sex: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUES} isn't allowed",
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,

    },
    suffix: {
        type: String,

    },
    role: {
        type: [Number],
        default: [1984],
        required: true
    },
    authType: {
        type: String,
        enum: ['PASSWORD', 'FACEBOOK_OAUTH', 'GOOGLE_OAUTH'],
        default: 'PASSWORD',
        select: false
    },
    googleId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true, });

userSchema.statics.Login = async function (email, password) {
    try {
        const isAvailable = await this.findOne({ email })
        if (isAvailable && !isAvailable.googleId) {
            const result = await Auth.findOne({ who: isAvailable._id });
            if (result) {
                const isAuthn = await bcrypt.compare(password, result.secret);
                if (isAuthn) {
                    return isAvailable;
                } else {
                    throw Error("Incorrect Login Details");
                }
            }
            throw Error("Incorrect Login Details");
        } else {
            throw Error("Incorrect Login Details");
        }
    } catch (error) {
        throw error;
    }
}

userSchema.statics.RecoverPassword = async function (email) {
    try {
        console.log(email)
        const isAvailable = await this.findOne({ email }).select('+authType');
        console.log(isAvailable);
        if (isAvailable != null) {
            console.log(isAvailable.authType)
            if (isAvailable.authType != "PASSWORD") {
                throw Error('No password required');
            } else {
                const passwordHash = await Auth.findOne({ who: isAvailable._id });
                const resetId = createToken(isAvailable, passwordHash.secret);
                const resetLink = `http://${process.env.HOST}:${process.env.PORT}/api/v1/auth/reset/password/${resetId}`;
                console.log(resetLink);
                return resetLink
            }
        }
    } catch (error) {
        throw error
    }
}

userSchema.statics.ResetPassword = async function (id, oldPassword, newPassword) {
    try {
        const updatedUser = await Auth.findOne({ who: id });
        console.log('compare', updatedUser.secret, oldPassword)
        if (updatedUser.secret == oldPassword) {
            updatedUser.secret = newPassword;
            const result = await updatedUser.save();
            console.log('success', result)
            return "updated"
        }
        throw Error('Password was changed recently')
    } catch (error) {
        throw error
    }
}

userSchema.statics.UpdateProfileDetails = async function (id, updates) {
    try {
        const user = await this.findById(id);
        if (!user) {
            throw new Error('Doctor not found');
        }
        // Update the doctor's profile details based on the updates
        for (const key in updates) {
            user[key] = updates[key];
        }

        // Save the updated doctor document
        const updatedDoctor = await user.save();

        return updatedDoctor;

    } catch (error) {
        throw error;
    }
}

const User = model('User', userSchema);
export default User;