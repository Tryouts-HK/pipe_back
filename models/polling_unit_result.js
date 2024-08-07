import { Schema, model } from "mongoose";

// Define the schema for party results
const partyResultsSchema = new Schema(
  {
    A: { type: Number, default: 0 },
    AA: { type: Number, default: 0 },
    AAX: { type: Number, default: 0 },
    ADC: { type: Number, default: 0 },
    ADP: { type: Number, default: 0 },
    APC: { type: Number, default: 0 },
    APGA: { type: Number, default: 0 },
    APM: { type: Number, default: 0 },
    APP: { type: Number, default: 0 },
    BP: { type: Number, default: 0 },
    LP: { type: Number, default: 0 },
    NNPP: { type: Number, default: 0 },
    NRM: { type: Number, default: 0 },
    PDP: { type: Number, default: 0 },
    PRP: { type: Number, default: 0 },
    SDP: { type: Number, default: 0 },
    YPP: { type: Number, default: 0 },
    ZLP: { type: Number, default: 0 },
  },
  { _id: false }
);

// Define the schema for polling unit results
const pollingUnitResultSchema = new Schema(
  {
    stateCode: {
      type: String,
      required: [true, "State code is required"],
      match: [/^\d{3}$/, "State code must be 3 digits"],
    },
    lgaCode: {
      type: String,
      required: [true, "LGA code is required"],
      match: [/^\d{2}$/, "LGA code must be 2 digits"],
    },
    wardCode: {
      type: String,
      required: [true, "Ward code is required"],
      match: [/^\d{2}$/, "Ward code must be 2 digits"],
    },
    puCode: {
      type: String,
      required: [true, "Polling Unit code is required"],
      match: [/^\d{3}$/, "Polling Unit code must be 3 digits"],
    },
    delimiter: {
      type: String,
      required: [true, "Please set up the delimeter code"],
      unique: [true, "There's already a record with this code"],
      validate: {
        validator: function (v) {
          return v.length === 12;
        },
        message: "The correct code length is in the order 3-2-2-3",
      },
    },
    duplicate: {
      type: Schema.ObjectId,
      ref: "Polling_Unit_Result",
    },
    authorId: {
      type: Schema.ObjectId,
      required: [true, "Please submit an editor Id for authorization"],
    },
    votersOnRegister: {
      type: Number,
      required: [true, "Number of voters on register is required"],
    },
    accreditedVoters: {
      type: Number,
      required: [true, "Number of accredited voters is required"],
    },
    ballotPapersIssued: {
      type: Number,
      required: [true, "Number of ballot papers issued is required"],
    },
    unusedBallotPapers: {
      type: Number,
      required: [true, "Number of unused ballot papers is required"],
    },
    spoiledBallotPapers: {
      type: Number,
      required: [true, "Number of spoiled ballot papers is required"],
    },
    rejectedBallots: {
      type: Number,
      required: [true, "Number of rejected ballots is required"],
    },
    validVotes: {
      type: partyResultsSchema,
      required: [true, "Valid votes are required"],
    },
    totalValidVotes: {
      type: Number,
      required: [true, "Total number of valid votes is required"],
    },
    totalUsedBallotPapers: {
      type: Number,
      required: [true, "Total number of used ballot papers is required"],
    },
    tampered: {
      type: Boolean,
      required: [true, "Tampered field is required"],
      default: false,
    },
    stamped: {
      type: Boolean,
      required: [true, "Stamped field is required"],
      default: false,
    },
    tagged: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      required: [true, "image url is required"],
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

pollingUnitResultSchema.pre("findOneAndUpdate", function (next) {
  console.log(this.options.runValidators);

  console.log("its crazy out here");

  this.options.runValidators = true;
  console.log(this.options.runValidators);
  next();
});

const PollingUnitResult = model("Polling_Unit_Result", pollingUnitResultSchema);

export default PollingUnitResult;
