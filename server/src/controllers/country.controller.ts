import { type Request, type Response } from 'express';
import 'express-async-errors';
import { countryService } from '../services/country.service';
import { updateSchema } from '../zodSchemas';

const getAllContries = async (req: Request, res: Response) => {
  const countries = await countryService.getAllContries();

  res.send(countries);
};

const update = async (req: Request, res: Response) => {
  updateSchema.parse(req.body);

  const { countryCode, ip } = req.body;

  res.send(await countryService.checkCountry(countryCode, ip));
};

export const countryController = {
  getAllContries,
  update,
};
