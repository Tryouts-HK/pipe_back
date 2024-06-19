import { ROLE_CODE_DECODER } from "../utils/constant.js";
import errorHandler from "../utils/error_handler.js";
import { switchProfile } from "../utils/switch_handler.js";


export const updateProfile = async (req, res) => {

    console.log("want to update your profile with");
    console.log(req.body.updates);
    try {

        const allowedUpdates = {};
        const userId = req.user._id;


        for (const field of ['firstName', 'middleName', 'lastName', 'specialization', 'contactNumber', 'address']) {
            if (req.body.updates[field] !== null && req.body.updates[field] !== undefined) {
                allowedUpdates[field] = req.body.updates[field];
            }
        }

        // if no field to update, return bad request;
        if (Object.keys(allowedUpdates).length === 0) {
            return res.status(400).json({ status: "error", message: "No valid fields to update." });
        }

        const result = await switchProfile(ROLE_CODE_DECODER[req.user.role]).UpdateProfileDetails(userId, allowedUpdates);
        res.status(200).json({ message: "success", data: result });

    } catch (error) {
        console.log(error);
        const cleanedError = errorHandler(error);
        res.status(400).json({ status: "error", message: cleanedError });
    }


}