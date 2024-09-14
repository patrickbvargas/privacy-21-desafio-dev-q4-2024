import express from 'express';
import { bookController } from '../../controllers';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getOneBook);

export { router as bookRoutes };
