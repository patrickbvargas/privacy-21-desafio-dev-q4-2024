import express from 'express';
import { configController } from '../../controllers';

const router = express.Router();

router.get('/', configController.getConfig);

export { router as configRoutes };
