
// router.post('/resource-types',
    const createResourceType = async (req, res) => {
    try {
      const newResourceType = new ResourceType(req.body);
      const savedResourceType = await newResourceType.save();
  
      res.status(201).json(savedResourceType);
    } catch (error) {
      console.error('Error creating resource type:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  