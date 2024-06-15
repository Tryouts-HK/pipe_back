// router.post('/phases', \\const getPhases = async (req, res) => {
    const getPhases = async (req, res) => {
        try {
          const phases = await Phase.find();
          res.status(200).json(phases);
        } catch (error) {
          console.error('Error fetching phases:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
      

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
  