Certainly! Here's a cleaned-up version of the requirements for polling unit results:

## Polling Unit Result Requirements

### Location Details
- **State Code:** 3 digits
- **Local Government Area (LGA) Code:** 2 digits
- **Ward Code:** 2 digits
- **Polling Unit (PU) Code:** 3 digits

### Input Details
- **Polling Unit Name:** Retrieve the name of the polling unit based on the input codes.

### Political Parties
- **List of Political Parties:** 
  - A
  - AA
  - AAX
  - ADC
  - ADP
  - APC
  - APGA
  - APM
  - APP
  - BP
  - LP
  - NNPP
  - NRM
  - PDP
  - PRP
  - SDP
  - YPP
  - ZLP

### Voting Details
- **Number of Voters on the Register:** Total number of registered voters in the polling unit.
- **Number of Accredited Voters:** Total number of voters accredited to vote.
- **Number of Ballot Papers Issued to the Polling Unit:** Total number of ballot papers provided to the polling unit.
- **Number of Unused Ballot Papers:** Total number of ballot papers not used.
- **Number of Spoiled Ballot Papers:** Total number of ballot papers that were spoiled and could not be used.
- **Number of Rejected Ballots:** Total number of ballots rejected during counting.
- **Number of Total Valid Votes:** Total number of valid votes cast.
- **Total Number of Used Ballot Papers:** Sum of valid, spoiled, and rejected ballots.
  - Calculation: `Total Number of Used Ballot Papers = Valid Votes + Spoiled Ballots + Rejected Ballots`
- **Total Votes for Each Party:** Sum of votes received by each political party.
  - **User Confirmation:** Allow users to confirm the total votes to ensure accuracy.

### Additional Details
- **Tampered Ballot Papers:** Record if any ballot papers were tampered with.
- **Stamped Ballot Papers:** Record if any ballot papers were stamped.

### Example JSON Structure for Input
```json
{
  "stateCode": "123",
  "lgaCode": "45",
  "wardCode": "67",
  "puCode": "890",
  "pollingUnitName": "Example Polling Unit",
  "votersOnRegister": 500,
  "accreditedVoters": 450,
  "ballotPapersIssued": 500,
  "unusedBallotPapers": 50,
  "spoiledBallotPapers": 5,
  "rejectedBallots": 10,
  "validVotes": {
    "A": 50,
    "AA": 20,
    "AAX": 15,
    "ADC": 10,
    "ADP": 5,
    "APC": 100,
    "APGA": 25,
    "APM": 0,
    "APP": 0,
    "BP": 5,
    "LP": 90,
    "NNPP": 10,
    "NRM": 0,
    "PDP": 100,
    "PRP": 5,
    "SDP": 10,
    "YPP": 0,
    "ZLP": 0
  },
  "tampered": false,
  "stamped": true
}
```

### Example JSON Structure for Output
```json
{
  "stateCode": "123",
  "lgaCode": "45",
  "wardCode": "67",
  "puCode": "890",
  "pollingUnitName": "Example Polling Unit",
  "votersOnRegister": 500,
  "accreditedVoters": 450,
  "ballotPapersIssued": 500,
  "unusedBallotPapers": 50,
  "spoiledBallotPapers": 5,
  "rejectedBallots": 10,
  "totalValidVotes": 445,
  "totalUsedBallotPapers": 460,
  "partyResults": {
    "A": 50,
    "AA": 20,
    "AAX": 15,
    "ADC": 10,
    "ADP": 5,
    "APC": 100,
    "APGA": 25,
    "APM": 0,
    "APP": 0,
    "BP": 5,
    "LP": 90,
    "NNPP": 10,
    "NRM": 0,
    "PDP": 100,
    "PRP": 5,
    "SDP": 10,
    "YPP": 0,
    "ZLP": 0
  },
  "tampered": false,
  "stamped": true
}
```


