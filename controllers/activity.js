// router.post('/activities',

const getActivities = async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
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
  