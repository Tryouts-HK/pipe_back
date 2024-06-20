import PollingUnitResult from "../models/polling_unit_result.js";
import errorHandler from "../utils/error_handler.js";

const RESULT_PER_PAGE = 50;

// Define a function to process the input data
const processPollingUnitResultInput = (data) => {
  const {
    stateCode,
    lgaCode,
    wardCode,
    puCode,
    votersOnRegister,
    accreditedVoters,
    ballotPapersIssued,
    unusedBallotPapers,
    spoiledBallotPapers,
    rejectedBallots,
    validVotes,
    totalValidVotes,
    totalUsedBallotPapers,
    tampered,
    stamped,
    tagged,
  } = data;

  // Ensure validVotes is parsed correctly
  let parsedValidVotes;
  try {
    parsedValidVotes = JSON.parse(validVotes);
  } catch (error) {
    console.log(error);
    throw new Error("Invalid format for validVotes, ");
  }

  return {
    stateCode,
    lgaCode,
    wardCode,
    puCode,
    votersOnRegister: Number(votersOnRegister),
    accreditedVoters: Number(accreditedVoters),
    ballotPapersIssued: Number(ballotPapersIssued),
    unusedBallotPapers: Number(unusedBallotPapers),
    spoiledBallotPapers: Number(spoiledBallotPapers),
    rejectedBallots: Number(rejectedBallots),
    validVotes: parsedValidVotes,
    totalValidVotes: Number(totalValidVotes),
    totalUsedBallotPapers: Number(totalUsedBallotPapers),
    tampered: tampered === "true",
    stamped: stamped === "true",
    tagged: tagged === "true",
  };
};

// Controller to create a polling unit result
export const createPollingUnitResult = async (req, res) => {
  try {
    const imageUrls = req.body.imageUrls;

    if (!Array.isArray(imageUrls)) {
      return res
        .status(400)
        .json({ status: "error", message: "imageUrls must be an array" });
    }

    console.log(imageUrls.length);

    const promises = imageUrls.map((url) => {
      const newResult = new PollingUnitResult({ imageUrl: url });
      return newResult.save({ validateBeforeSave: false });
    });

    const results = await Promise.allSettled(promises);

    // console.log(results);

    const savedResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    res.status(201).json({
      status: "success",
      message: `${savedResults.length} results uploaded successfully`,
      savedResults,
    });
  } catch (error) {
    // console.log(error);
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};

export const updatePollingUnitResult = async (req, res) => {
  try {
    const processedData = processPollingUnitResultInput(req.body);

    const updatedResult = await PollingUnitResult.findByIdAndUpdate(
      req.params.id,
      processedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedResult) {
      return res.status(404).json({ error: "Polling Unit Result not found" });
    }
    res.status(200).json({ status: "success", data: updatedResult });
  } catch (error) {
    console.error("Error updating polling unit result:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getAnUntaggedResult = async (req, res) => {
  try {
    // Find the first polling unit result that is untagged
    const untaggedResult = await PollingUnitResult.findOne({ tagged: false });

    if (!untaggedResult) {
      return res
        .status(404)
        .json({ status: "error", message: "No untagged result found" });
    }

    // Return the untagged result
    res.status(200).json({ status: "success", data: untaggedResult });
  } catch (error) {
    const cleanedError = errorHandler(error);
    res.status(400).json({ status: "error", message: cleanedError });
  }
};

export const getPollingUnitResultById = async (req, res) => {
  try {
    const result = await PollingUnitResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: "error",
        error: "Polling Unit Result not found",
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching polling unit result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPollingUnitResults = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const totalResults = await PollingUnitResult.countDocuments();
    const results = await PollingUnitResult.find()
      .skip((page - 1) * RESULT_PER_PAGE)
      .limit(RESULT_PER_PAGE);

    res.status(200).json({
      totalResults,
      totalPages: Math.ceil(totalResults / RESULT_PER_PAGE),
      currentPage: page,
      resultsPerPage: RESULT_PER_PAGE,
      results,
    });
  } catch (error) {
    console.error("Error fetching polling unit results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePollingUnitResult = async (req, res) => {
  try {
    const deletedResult = await PollingUnitResult.findByIdAndDelete(
      req.params.id
    );
    if (!deletedResult) {
      return res.status(404).json({ error: "Polling Unit Result not found" });
    }
    res
      .status(200)
      .json({ message: "Polling Unit Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting polling unit result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
