import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Auth from '../../auth/auth.js';
import { createToken, verifyToken } from '../../../utils/token.js';

// Define the volunteer schema
const volunteerLeadSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    contactNumber: {
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
    role: {
        type: Number,
        default: 2004,
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
volunteerLeadSchema.virtual('name').get(function () {
    let fullName = this.firstName;
    if (this.middleName) {
        fullName += ' ' + this.middleName;
    }
    fullName += ' ' + this.lastName;
    return fullName;
});


volunteerLeadSchema.statics.UpdateProfileDetails = async function (id, updates) {
    try {
        const volunteerLead = await this.findById(id);
        if (!volunteerLead) {
            throw new Error('VolunteerLead not found');
        }
        // Update the volunteerLead's profile details based on the updates
        for (const key in updates) {
            volunteerLead[key] = updates[key];
        }

        // Save the updated volunteerLead document
        const updatedVolunteerLead = await volunteerLead.save();

        return updatedVolunteerLead;

    } catch (error) {
        throw error;
    }
}

volunteerLeadSchema.statics.Login = async function (email, password) {
    try {
        const isAvailable = await this.findOne({ email });
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

volunteerLeadSchema.statics.RecoverPassword = async function (email) {
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

volunteerLeadSchema.statics.ResetPassword = async function (id, password) {
    try {
        const updatedUser = await Auth.findOne({ who: id });
        updatedUser.secret = password;
        updatedUser.save();
        console.log('Password Changed')
        return "updated"
    } catch (error) {
        throw error
    }
}

// Create the volunteerLead model
const VolunteerLead = model('VolunteerLead', volunteerLeadSchema);

export default VolunteerLead;
