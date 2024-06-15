// router.post('/phases', 
   const addPhaseController = async (req, res) => {
    try {
      const newPhase = new Phase(req.body);
      const savedPhase = await newPhase.save();
  
      res.status(201).json(savedPhase);
    } catch (error) {
      console.error('Error creating phase:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  