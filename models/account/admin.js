import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Auth from '../auth/auth.js';
import { createToken, verifyToken } from '../../utils/token.js';

// Define the Admin schema
const adminSchema = new Schema({
    firstName: {
        type: String,
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
    },
    specialization: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sex: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUES} isn't allowed",
        }
    },
    role: {
        type: Number,
        default: 1697,
        required: true
    },
    address: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


// Define a virtual property for the full name
adminSchema.virtual('name').get(function () {
    let fullName = this.firstName;
    if (this.middleName) {
        fullName += ' ' + this.middleName;
    }
    fullName += ' ' + this.lastName;
    return fullName;
});

// Admin's Login
adminSchema.statics.Login = async function (email, password) {
    try {
        const isAvailable = await this.findOne({ email }).select('+authType');
        if (isAvailable && !isAvailable.googleId) {
            const result = await Auth.findOne({ who: isAvailable._id });
            if (result) {
                console.log('comparing password keys')
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

// Update Admin's schedule
adminSchema.statics.UpdateSchedule = async function (adminId, updatedAvaibility) {
    try {
        const result = await adminSchedule.findOneAndUpdate({ adminId }, updatedAvaibility, { new: true });
        res.status(201).json({ data: result });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

adminSchema.statics.RecoverPassword = async function (email) {
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

adminSchema.statics.UpdateProfileDetails = async function (id, updates) {
    try {
        const admin = await this.findById(id);
        if (!admin) {
            throw new Error('Admin not found');
        }
        // Update the admin's profile details based on the updates
        for (const key in updates) {
            admin[key] = updates[key];
        }

        // Save the updated admin document
        const updatedAdmin = await admin.save();

        return updatedAdmin;

    } catch (error) {
        throw error;
    }
}

adminSchema.statics.ResetPassword = async function (id, password) {
    try {
        const updatedUser = await Auth.findOne({ who: id });
        console.log(updatedUser)
        updatedUser.secret = password;
        updatedUser.save();
        console.log('success')
        return "updated"
    } catch (error) {
        throw error
    }
}


// Create the Admin model
const Admin = model('Admin', adminSchema);

export default Admin;