import { lgas } from '../data/lgas.js';
import { states } from '../data/states.js';
import PollingUnit from '../models/polling_unit.js';


export const getAllPollingUnits = async (req, res) => {
  try {
    const stations = await PollingUnit.find();
    //TODO: to be paginated by 100;
    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching polling stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getPollingUnitById = async (req, res) => {
  try {
    const passedCode = req.params.delimiter;
    let stateCode;
    let lgaCode;
    let wardCode;
    let puCode;
   let reformattedStateCode ;
    console.log(passedCode.length);
    switch (passedCode.length) {
      case 3:
        // Find the state code
        stateCode = passedCode.substring(0, 3);
        const foundState = states[stateCode];
        if (!foundState) throw Error("state not found");
        res.status(200).json({
          "status": "success",
          "state": foundState,
        });
        break;
      case 5:
        // Find the state and LGA codes
        stateCode = passedCode.substring(0, 3);
        lgaCode = passedCode.substring(3, 5);

        // Adjust stateCode and lgaCode based on specified rules
        if (stateCode === "037") {
          stateCode = "015";
        } else if (parseInt(stateCode) >= 15) {
          stateCode = String(parseInt(stateCode) + 1).padStart(3, "0");
          // Output the adjusted stateCode and lgaCode
          console.log("Adjusted stateCode:", stateCode);
          // console.log("Adjusted lgaCode:", lgaCode);
        }
        function findLGA(stateCode, lgaCode) {
          return lgas.find(lga => lga.state_id === stateCode && lga.abbreviation === lgaCode);
        }
        const foundLga = findLGA(stateCode, lgaCode);

        if (foundLga) {
          // console.log('LGA found:', foundLga);
          res.status(200).json({
            "status": "success",
            "state": foundLga.state_name,
            "lga": foundLga.name,
          });

        } else {
          throw Error("No LGA found with the given stateCode and lgaCode.");
        }


        break;

      case 7:
        // Find the state, LGA, and ward codes
        stateCode = passedCode.substring(0, 3);
        lgaCode = passedCode.substring(3, 5);
        wardCode = passedCode.substring(5, 7);
        //
        reformattedStateCode = stateCode.substring(1, 3);
        console.log('reformattedStateCode');
         const wardIdentifier = `${reformattedStateCode}/${lgaCode}/${wardCode}/001`;
        console.log(wardIdentifier );

        const foundWard = await PollingUnit.findOne({
          delimitation: wardIdentifier,
        });
        if(foundWard){
          res.status(200).json({
            "status": "success",
            "state": foundWard.state_name,
            "lga": foundWard.local_government_name,
            "ward_name": foundWard.ward_name,
          });
        }else{
          throw Error("ward with code wasn't found")
        }
        break;

      case 10:
        // Find the state, LGA, ward, and polling unit codes
        stateCode = passedCode.substring(0, 3);
        lgaCode = passedCode.substring(3, 5);
        wardCode = passedCode.substring(5, 7);
        puCode = passedCode.substring(7, 10);

        reformattedStateCode = stateCode.substring(1, 3);
        console.log('reformattedStateCode');
        const puIdentifier = `${reformattedStateCode}/${lgaCode}/${wardCode}/${puCode}`;
        console.log(puIdentifier);

        const foundPu = await PollingUnit.findOne({
          delimitation: puIdentifier,
        });
        if(foundPu){
          res.status(200).json({
            "status": "success",
            "state": foundPu.state_name,
            "lga": foundPu.local_government_name,
            "ward_name": foundPu.ward_name,
            "pu_name": foundPu.name,
          });
        }else{
          throw Error("pu with code wasn't found")
        }
        break;
      default:
        res.status(400).json({ error: "Identifier doesn't match accepted formats: 3,5,7, 10 digits interval" });
        return;
    }


  } catch (error) {
    // check if error is user
    console.error('Error fetching polling unit data:', error);
    res.status(400).json({ error: `Error fetching polling unit data: ${error.message}` });
    // else;

  }
};

// admin function;
export const addPollingUnit = async (req, res) => {
  try {
    const newStation = new PollingUnit(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error creating polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// admin function;
export const updatePollingUnit = async (req, res) => {
  try {
    const updatedStation = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStation) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json(updatedStation);
  } catch (error) {
    console.error('Error updating polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// admin function;
export const deletePollingUnit = async (req, res) => {
  try {
    const deletedStation = await findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json({ message: 'Polling Station deleted successfully' });
  } catch (error) {
    console.error('Error deleting polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


