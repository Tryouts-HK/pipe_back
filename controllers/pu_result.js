import PollingUnitResult from '../models/polling_unit_result.js';

const RESULT_PER_PAGE = 100;

export const createPollingUnitResult = async (req, res) => {
  try {
    const newResult = new PollingUnitResult(req.body);
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    console.error('Error creating polling unit result:', error);
    res.status(400).json({ error: error.message });
  }
};

export const getPollingUnitResultById = async (req, res) => {
  try {
    const result = await PollingUnitResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Polling Unit Result not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching polling unit result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
      results
    });
  } catch (error) {
    console.error('Error fetching polling unit results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePollingUnitResult = async (req, res) => {
  try {
    const updatedResult = await PollingUnitResult.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedResult) {
      return res.status(404).json({ error: 'Polling Unit Result not found' });
    }
    res.status(200).json(updatedResult);
  } catch (error) {
    console.error('Error updating polling unit result:', error);
    res.status(400).json({ error: error.message });
  }
};

export const deletePollingUnitResult = async (req, res) => {
  try {
    const deletedResult = await PollingUnitResult.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ error: 'Polling Unit Result not found' });
    }
    res.status(200).json({ message: 'Polling Unit Result deleted successfully' });
  } catch (error) {
    console.error('Error deleting polling unit result:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
