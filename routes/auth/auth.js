const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../../models/User');

/**
 * Validation of user inputs
 */
const registerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

/**
 * Signup user
 */
router.post('/register', async (req, res) => {

  // Checks, if user email already exists:
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send(`email already exists`);

  // Hashes the password:
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  // Validates user input and eventually saves new user to Mongo db: 
  // TODO: custom Joi error messages
  try {
    const {error} = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const saveUser = await user.save();
      res.status(200).send(`user created, ${saveUser}`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Login user
 */
 router.post("/login", async (req, res) => {

  // Checks, if user email already exists:
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('incorrect email');

  // Checks, if user password matches the database: 
  const validPassword = await bcrypt.compare(
    req.body.password, 
    user.password
  )
  if (!validPassword) return res.status(400).send('incorrect password');

  try {
    const {error} = await loginSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      res.status(200).send(`login success, ${req.body.email}`)
    }
  } catch (error) {
    res.status(500).send(error)
  }
 });

module.exports = router;
