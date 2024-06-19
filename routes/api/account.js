import express from 'express'
const router = express.Router();
import { updateProfile } from '../../controllers/profile.js';



router.post('/profile/edit', updateProfile);

export default router;