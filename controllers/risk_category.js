// router.post('/risk-categories',
  const create_risk_controller =   async (req, res) => {
    try {
      const newRiskCategory = new RiskCategory(req.body);
      const savedRiskCategory = await newRiskCategory.save();
  
      res.status(201).json(savedRiskCategory);
    } catch (error) {
      console.error('Error creating risk category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  