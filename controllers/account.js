import { ROLE_CODE_DECODER } from "../utils/constant.js";
import errorHandler from "../utils/error_handler.js";
import { switchProfile } from "../utils/switch_handler.js";

export const getProfileDetails = async (req, res) => {
  try {
    const user = req.user;
    const retrieveUserDetails = await switchProfile(
      ROLE_CODE_DECODER[user.role]
    ).findById(user.id);
    console.log("printing retrieved user");
    console.log(retrieveUserDetails);
    if (!retrieveUserDetails) {
      // throw Error("there's errorr retrieving user details.");
      res.status(400).json({
        status: "error",
        message: "there's errorr retrieving user details.",
      });
    } else {
      res.status(200).json({ message: "success", data: retrieveUserDetails });
    }
  } catch (error) {
    console.error(error);
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};

export const updateProfile = async (req, res) => {
  console.log("want to update your profile with");
  console.log(req.body.updates);
  const updates = JSON.parse(req.body.updates);
  console.log(updates);
  try {
    const allowedUpdates = {};
    const userId = req.user.id;

    for (const field of [
      "firstName",
      "middleName",
      "lastName",
      "contactNumber",
      "address",
    ]) {
      if (updates[field] !== null && updates[field] !== undefined) {
        allowedUpdates[field] = updates[field];
      }
    }

    // if no field to update, return bad request;
    if (Object.keys(allowedUpdates).length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "No valid fields to update." });
    }

    const result = await switchProfile(
      ROLE_CODE_DECODER[req.user.role]
    ).UpdateProfileDetails(userId, allowedUpdates);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    console.log(error);
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};

export const changeAccountRole = async (req, res) => {
  try {
    //
    // TODO
  } catch (error) {
    console.log(error);
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};
