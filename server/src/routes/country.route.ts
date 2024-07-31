import express from 'express';
import { countryController } from '../controllers/country.controller';

export const countryRouter = express.Router();

countryRouter.get('/', countryController.getAllContries);
countryRouter.post('/update', countryController.update);
