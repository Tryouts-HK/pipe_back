// router.post('/activities',
   const createActivityController =  async (req, res) => {
    try {
      const newActivity = new Activity(req.body);
      const savedActivity = await newActivity.save();
  
      res.status(201).json(savedActivity);
    } catch (error) {
      console.error('Error creating activity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  