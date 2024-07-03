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
    tagged: true,
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

export const getATaggedResult = async (req, res) => {
  try {
    // Find the first polling unit result that is untagged
    const untaggedResult = await PollingUnitResult.findOne({ tagged: true });

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

export const getAllPollingUnitResultsByStates = async (req, res) => {
  try {
    const result = await PollingUnitResult.aggregate([
      {
        $match: { tagged: true },
      },
      // Group by stateCode
      {
        $group: {
          _id: "$stateCode",
          totalVotes: { $sum: "$totalValidVotes" },
          totalAccreditedVoters: { $sum: "$accreditedVoters" },
          totalSpoiledBallotPapers: { $sum: "$spoiledBallotPapers" },
          totalRejectedBallots: { $sum: "$rejectedBallots" },
          totalUnusedBallotPapers: { $sum: "$unusedBallotPapers" },
          // Sum the votes for each political party
          validVotes_A: { $sum: "$validVotes.A" },
          validVotes_AA: { $sum: "$validVotes.AA" },
          validVotes_AAX: { $sum: "$validVotes.AAX" },
          validVotes_ADC: { $sum: "$validVotes.ADC" },
          validVotes_ADP: { $sum: "$validVotes.ADP" },
          validVotes_APC: { $sum: "$validVotes.APC" },
          validVotes_APGA: { $sum: "$validVotes.APGA" },
          validVotes_APM: { $sum: "$validVotes.APM" },
          validVotes_APP: { $sum: "$validVotes.APP" },
          validVotes_BP: { $sum: "$validVotes.BP" },
          validVotes_LP: { $sum: "$validVotes.LP" },
          validVotes_NNPP: { $sum: "$validVotes.NNPP" },
          validVotes_NRM: { $sum: "$validVotes.NRM" },
          validVotes_PDP: { $sum: "$validVotes.PDP" },
          validVotes_PRP: { $sum: "$validVotes.PRP" },
          validVotes_SDP: { $sum: "$validVotes.SDP" },
          validVotes_YPP: { $sum: "$validVotes.YPP" },
          validVotes_ZLP: { $sum: "$validVotes.ZLP" },
        },
      },
      // Project the fields to include in the output
      {
        $project: {
          _id: 0,
          stateCode: "$_id",
          totalVotes: 1,
          totalAccreditedVoters: 1,
          totalSpoiledBallotPapers: 1,
          totalRejectedBallots: 1,
          totalUnusedBallotPapers: 1,
          validVotes: {
            A: "$validVotes_A",
            AA: "$validVotes_AA",
            AAX: "$validVotes_AAX",
            ADC: "$validVotes_ADC",
            ADP: "$validVotes_ADP",
            APC: "$validVotes_APC",
            APGA: "$validVotes_APGA",
            APM: "$validVotes_APM",
            APP: "$validVotes_APP",
            BP: "$validVotes_BP",
            LP: "$validVotes_LP",
            NNPP: "$validVotes_NNPP",
            NRM: "$validVotes_NRM",
            PDP: "$validVotes_PDP",
            PRP: "$validVotes_PRP",
            SDP: "$validVotes_SDP",
            YPP: "$validVotes_YPP",
            ZLP: "$validVotes_ZLP",
          },
        },
      },
    ]);

    res.status(200).json({ message: "successsful", data: result });
  } catch (error) {
    console.error("Error fetching total votes by states", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPollingUnitResultsByLGA = async (req, res) => {
  try {
    const stateCode = req.params.stateCode;
    const result = await PollingUnitResult.aggregate([
      // include only tagged documents
      {
        $match: { tagged: true },
      },
      {
        $match: { stateCode: stateCode },
      },
      // Group by stateCode
      {
        $group: {
          _id: "$lgaCode",
          totalVotes: { $sum: "$totalValidVotes" },
          totalAccreditedVoters: { $sum: "$accreditedVoters" },
          totalSpoiledBallotPapers: { $sum: "$spoiledBallotPapers" },
          totalRejectedBallots: { $sum: "$rejectedBallots" },
          totalUnusedBallotPapers: { $sum: "$unusedBallotPapers" },
          // Sum the votes for each political party
          validVotes_A: { $sum: "$validVotes.A" },
          validVotes_AA: { $sum: "$validVotes.AA" },
          validVotes_AAX: { $sum: "$validVotes.AAX" },
          validVotes_ADC: { $sum: "$validVotes.ADC" },
          validVotes_ADP: { $sum: "$validVotes.ADP" },
          validVotes_APC: { $sum: "$validVotes.APC" },
          validVotes_APGA: { $sum: "$validVotes.APGA" },
          validVotes_APM: { $sum: "$validVotes.APM" },
          validVotes_APP: { $sum: "$validVotes.APP" },
          validVotes_BP: { $sum: "$validVotes.BP" },
          validVotes_LP: { $sum: "$validVotes.LP" },
          validVotes_NNPP: { $sum: "$validVotes.NNPP" },
          validVotes_NRM: { $sum: "$validVotes.NRM" },
          validVotes_PDP: { $sum: "$validVotes.PDP" },
          validVotes_PRP: { $sum: "$validVotes.PRP" },
          validVotes_SDP: { $sum: "$validVotes.SDP" },
          validVotes_YPP: { $sum: "$validVotes.YPP" },
          validVotes_ZLP: { $sum: "$validVotes.ZLP" },
        },
      },
      // Project the fields to include in the output
      {
        $project: {
          _id: 0,
          lgaCode: "$_id",
          totalVotes: 1,
          totalAccreditedVoters: 1,
          totalSpoiledBallotPapers: 1,
          totalRejectedBallots: 1,
          totalUnusedBallotPapers: 1,
          validVotes: {
            A: "$validVotes_A",
            AA: "$validVotes_AA",
            AAX: "$validVotes_AAX",
            ADC: "$validVotes_ADC",
            ADP: "$validVotes_ADP",
            APC: "$validVotes_APC",
            APGA: "$validVotes_APGA",
            APM: "$validVotes_APM",
            APP: "$validVotes_APP",
            BP: "$validVotes_BP",
            LP: "$validVotes_LP",
            NNPP: "$validVotes_NNPP",
            NRM: "$validVotes_NRM",
            PDP: "$validVotes_PDP",
            PRP: "$validVotes_PRP",
            SDP: "$validVotes_SDP",
            YPP: "$validVotes_YPP",
            ZLP: "$validVotes_ZLP",
          },
        },
      },
    ]);

    res.status(200).json({ message: "successsful", data: result });
  } catch (error) {
    console.error("Error fetching total votes by states", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPollingUnitResultsByWard = async (req, res) => {
  try {
    const stateCode = req.params.stateCode;
    const lgaCode = req.params.lgaCode;
    const result = await PollingUnitResult.aggregate([
      // include only tagged documents
      {
        $match: { tagged: true },
      },
      // group by state code
      {
        $match: { stateCode: stateCode },
      },
      // group by lga code
      {
        $match: { lgaCode: lgaCode },
      },

      // Group by stateCode
      {
        $group: {
          _id: "$wardCode",
          totalVotes: { $sum: "$totalValidVotes" },
          totalAccreditedVoters: { $sum: "$accreditedVoters" },
          totalSpoiledBallotPapers: { $sum: "$spoiledBallotPapers" },
          totalRejectedBallots: { $sum: "$rejectedBallots" },
          totalUnusedBallotPapers: { $sum: "$unusedBallotPapers" },
          // Sum the votes for each political party
          validVotes_A: { $sum: "$validVotes.A" },
          validVotes_AA: { $sum: "$validVotes.AA" },
          validVotes_AAX: { $sum: "$validVotes.AAX" },
          validVotes_ADC: { $sum: "$validVotes.ADC" },
          validVotes_ADP: { $sum: "$validVotes.ADP" },
          validVotes_APC: { $sum: "$validVotes.APC" },
          validVotes_APGA: { $sum: "$validVotes.APGA" },
          validVotes_APM: { $sum: "$validVotes.APM" },
          validVotes_APP: { $sum: "$validVotes.APP" },
          validVotes_BP: { $sum: "$validVotes.BP" },
          validVotes_LP: { $sum: "$validVotes.LP" },
          validVotes_NNPP: { $sum: "$validVotes.NNPP" },
          validVotes_NRM: { $sum: "$validVotes.NRM" },
          validVotes_PDP: { $sum: "$validVotes.PDP" },
          validVotes_PRP: { $sum: "$validVotes.PRP" },
          validVotes_SDP: { $sum: "$validVotes.SDP" },
          validVotes_YPP: { $sum: "$validVotes.YPP" },
          validVotes_ZLP: { $sum: "$validVotes.ZLP" },
        },
      },
      // Project the fields to include in the output
      {
        $project: {
          _id: 0,
          wardCode: "$_id",
          totalVotes: 1,
          totalAccreditedVoters: 1,
          totalSpoiledBallotPapers: 1,
          totalRejectedBallots: 1,
          totalUnusedBallotPapers: 1,
          validVotes: {
            A: "$validVotes_A",
            AA: "$validVotes_AA",
            AAX: "$validVotes_AAX",
            ADC: "$validVotes_ADC",
            ADP: "$validVotes_ADP",
            APC: "$validVotes_APC",
            APGA: "$validVotes_APGA",
            APM: "$validVotes_APM",
            APP: "$validVotes_APP",
            BP: "$validVotes_BP",
            LP: "$validVotes_LP",
            NNPP: "$validVotes_NNPP",
            NRM: "$validVotes_NRM",
            PDP: "$validVotes_PDP",
            PRP: "$validVotes_PRP",
            SDP: "$validVotes_SDP",
            YPP: "$validVotes_YPP",
            ZLP: "$validVotes_ZLP",
          },
        },
      },
    ]);

    res.status(200).json({ message: "successsful", data: result });
  } catch (error) {
    console.error("Error fetching total votes by states", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
