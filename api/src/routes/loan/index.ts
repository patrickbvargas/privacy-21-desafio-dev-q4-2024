import express from 'express';
import { loanController } from '../../controllers';

const router = express.Router();

router.get('/', loanController.getAllLoans);
router.get('/:id', loanController.getOneLoan);
router.post('/', loanController.createLoan);
router.delete('/:id', loanController.deleteLoan);
router.put('/:id', loanController.updateLoan);

export { router as loanRoutes };
