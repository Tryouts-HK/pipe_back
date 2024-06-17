import PollingUnit, { find, findById, findByIdAndUpdate, findByIdAndDelete, } from '../models/PollingStation';

const getAllPollingUnits = async (req, res) => {
  try {
    const stations = await find();
    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching polling stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPollingUnitById = async (req, res) => {
  try {
    const station = await findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    console.error('Error fetching polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addPollingUnit = async (req, res) => {
  try {
    const newStation = new PollingUnit(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error creating polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePollingUnit = async (req, res) => {
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

const deletePollingUnit = async (req, res) => {
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

export const getAllPollingStations = getAllPollingUnits;
export const getPollingStationById = getPollingUnitById;
export const addPollingStation = addPollingUnit;
export const updatePollingStation = updatePollingUnit;
export const deletePollingStation = deletePollingUnit;
