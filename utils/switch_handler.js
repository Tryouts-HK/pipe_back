import Ambulance from "../models/facilities/Ambulance.js";
import Clinic from "../models/facilities/Clinic.js";
import Hospital from "../models/facilities/Hospital.js";
import Pharmacy from "../models/facilities/Pharmacy.js";
import User from "../models/patients/User.js";
import Doctor from "../models/professionals/Doctor.js";
import Pharmacist from "../models/professionals/Pharmacist.js";


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