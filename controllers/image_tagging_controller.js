const image_getter = async (req, res) => {
    try {
      // Number of random images to fetch, can be set via query parameter or a default value
      const numImages = parseInt(req.query.num) || 5;
  
      // Use MongoDB aggregation pipeline to get random untagged images
      const randomUntaggedImages = await Image.aggregate([
        { $match: { isTagged: false } }, // Match only untagged images
        { $sample: { size: numImages } } // Get random sample of specified size
      ]);
  
      res.status(200).json(randomUntaggedImages);
    } catch (error) {
      console.error('Error fetching random untagged images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}