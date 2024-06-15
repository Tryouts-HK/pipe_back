// router.post('/risk-items',
    
    const create_risk_item = async (req, res) => {
    try {
      const newRiskItem = new RiskItem(req.body);
      const savedRiskItem = await newRiskItem.save();
  
      res.status(201).json(savedRiskItem);
    } catch (error) {
      console.error('Error creating risk item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  