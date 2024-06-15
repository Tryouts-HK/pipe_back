// router.post('/resource-allocations', 
   const addResourceAllocation = async (req, res) => {
    try {
      const newResourceAllocation = new ResourceAllocation(req.body);
      const savedResourceAllocation = await newResourceAllocation.save();
  
      res.status(201).json(savedResourceAllocation);
    } catch (error) {
      console.error('Error creating resource allocation:', error);
      res.status (500).json({ error: 'Internal Server Error' });
    }
  }
  