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
  
  const getRiskCategories = async (req, res) => {
    try {
      const riskCategories = await RiskCategory.find();
      res.status(200).json(riskCategories);
    } catch (error) {
      console.error('Error fetching risk categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  