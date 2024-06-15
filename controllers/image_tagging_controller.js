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

const all_image_getters = async (req, res) => {
    try {
      // Get the page number from the query parameters, default to 1 if not provided
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
  
      // Find tagged images with pagination
      const taggedImages = await Image.find({ isTagged: true })
        .skip(skip)
        .limit(limit);
  
      // Get the total number of tagged images
      const totalTaggedImages = await Image.countDocuments({ isTagged: true });
  
      // Calculate total pages
      const totalPages = Math.ceil(totalTaggedImages / limit);
  
      res.status(200).json({
        page,
        totalPages,
        totalTaggedImages,
        taggedImages,
      });
    } catch (error) {
      console.error('Error fetching tagged images:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}