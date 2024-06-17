
import User from "../models/account/user.js";



export const switchProfile = (role) => {
    let profile
    try {
        switch (role) {
            case 'user':
                profile = User;
                break;
            case 'doctor':
                profile = Doctor;
                break;
            case 'pharmacist':
                profile = Pharmacist;
                break;
            default:
                throw Error('Unsupported Role');
        }
        return profile;
    } catch (error) {
        throw error;
    }
}

export const switchFacility = (facility) => {
    let profile
    try {
        switch (facility) {
            case 'hospital':
                profile = Hospital;
                break;
            case 'clinic':
                profile = Clinic;
                break;
            case 'pharmacy':
                profile = Pharmacy;
                break;
            case 'ambulance':
                profile = Ambulance;
                break;
            default:
                throw Error('Unsupported Facility');
        }
        return profile;
    } catch (error) {
        throw error;
    }
}