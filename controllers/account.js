import User from "../models/account/user.js";
import { ROLE_CODE_DECODER, ROLE_ENCODER } from "../utils/constant.js";
import errorHandler from "../utils/error_handler.js";

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
    //check who's making the request
    const payload = req.body;
    // const userRole = JSON.parse(req.user.role);
    //To be continued later


    const foundUser = await User.findById(payload.accountId);

    if (!Object.values(ROLE_CODE_DECODER).includes(payload.newRole)) {
      return res.status(400).json({
        status: "error",
        message: `${payload.newRole} is not part of the accepted roles`,
      });
    }


    if (!(payload.newRole == "admin")) {
      const newRole = Object.keys(ROLE_CODE_DECODER).map((eachRole) => {
        if (ROLE_CODE_DECODER[eachRole] == payload.newRole) {
          return eachRole;
        }
      });
      newRole.forEach((value) => {
        if (value && !foundUser.role.includes(value)) {
          foundUser.role.push(value);
        }
      });
      await foundUser.save();
      res
        .status(200)
        .json({ status: "success", message: "role uploaded successfully" });
    } else {
      res.status(400).json({
        status: "error",
        message: "upgrade to admin requires a different process",
      });
    }
  } catch (error) {
    console.log(error);
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};
