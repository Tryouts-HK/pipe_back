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

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Controller to upload images

  //   router.post('/upload', upload.single('image'),
  const image_controller = 
   async (req, res) => {
    try {
      // Ensure file is provided
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Save image metadata to the database
      const newImage = new Image({
        url: path.join('uploads', req.file.filename),
        isTagged: false
      });
  
      const savedImage = await newImage.save();
  
      res.status(201).json({
        message: 'Image uploaded successfully',
        image: savedImage
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }