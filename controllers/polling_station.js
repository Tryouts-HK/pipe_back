const PollingStation = require('../models/PollingStation');

const getAllPollingStations = async (req, res) => {
  try {
    const stations = await PollingStation.find();
    res.status(200).json(stations);
  } catch (error) {
    console.error('Error fetching polling stations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPollingStationById = async (req, res) => {
  try {
    const station = await PollingStation.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json(station);
  } catch (error) {
    console.error('Error fetching polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addPollingStation = async (req, res) => {
  try {
    const newStation = new PollingStation(req.body);
    const savedStation = await newStation.save();
    res.status(201).json(savedStation);
  } catch (error) {
    console.error('Error creating polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updatePollingStation = async (req, res) => {
  try {
    const updatedStation = await PollingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStation) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json(updatedStation);
  } catch (error) {
    console.error('Error updating polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deletePollingStation = async (req, res) => {
  try {
    const deletedStation = await PollingStation.findByIdAndDelete(req.params.id);
    if (!deletedStation) {
      return res.status(404).json({ error: 'Polling Station not found' });
    }
    res.status(200).json({ message: 'Polling Station deleted successfully' });
  } catch (error) {
    console.error('Error deleting polling station:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPollingStations,
  getPollingStationById,
  addPollingStation,
  updatePollingStation,
  deletePollingStation,
};
