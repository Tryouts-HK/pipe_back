
import User from "../models/account/user.js";
import Volunteer from "../models/account/volunteer.js"
import Admin from "../models/account/admin.js"


export const switchProfile = (role) => {
    let profile
    try {
        switch (role) {
            case 'user':
                profile = User;
                break;
            case 'srv':
                profile = Volunteer;
                break;
            case 'admin':
                profile = Admin;
                break;
            default:
                throw Error('Unsupported Role');
        }
        return profile;
    } catch (error) {
        throw error;
    }
}
