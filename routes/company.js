const router = require('express').Router();
const Company = require('../models/Company');
const verify = require('./auth/authVerify');
const Joi = require('joi');

/**
 * Validation of user inputs
 */
const companySchema = Joi.object({
  businessName: Joi.string().min(3).max(255).required(),
  street: Joi.string().min(3).max(255).required(),
  city: Joi.string().min(3).max(255).required(),
  zip: Joi.string().min(3).max(255).required(),
  state: Joi.string().min(3).max(255).required(),
  ico: Joi.string().min(3).max(32).required(),
  dic: Joi.string().min(3).max(32).required(),
  icdph: Joi.string().max(32),
  vatPayer: Joi.bool().required(),
  bankAccount: Joi.string().min(3).max(255).required(),
  phone: Joi.string().max(16).pattern(/^\d+$/),
  email: Joi.string().max(255).email(),
  website: Joi.string().max(255),
  additionalDetails: Joi.string().max(1024),
  invoiceNote: Joi.string().max(1024),
  invoiceSignature: Joi.string().max(255),
});

/**
 * Register new company
 *
 * Checks, if company already exists
 * Validates user input and saves new company
 */
router.post('/new-company', verify, async (req, res) => {

  const companyExists = await Company.findOne({ico: req.body.ico});
  if (companyExists) return res.status(400).send(`company already exists`);

  const company = new Company({
    businessName: req.body.businessName,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    state: req.body.state,
    ico: req.body.ico,
    dic: req.body.dic,
    icdph: req.body.icdph,
    vatPayer: req.body.vatPayer,
    bankAccount: req.body.bankAccount,
    phone: req.body.phone,
    email: req.body.email,
    website: req.body.website,
    additionalDetails: req.body.additionalDetails,
    invoiceNote: req.body.invoiceNote,
    invoiceSignature: req.body.invoiceSignature,
  });

  try {
    const {error} = await companySchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveCompany = await company.save();
      res.status(200).send(`company created, ${saveCompany}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Get all companies
 */
router.get('/all-companies', verify, async (req, res) => {
  try {
    const result = await Company.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
