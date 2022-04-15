const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../../models/User');

/**
 * Validation of user inputs
 */
const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(255).required(),
  lastName: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

/**
 * Signup user
 *
 * Checks, if user already exists
 * Hashes the password
 * Validates user input and eventually saves new user
 */
router.post('/register', async (req, res) => {

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send(`email already exists`);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

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
 *
 * Checks, if user email already exists
 * Checks, if user password matches the database
 * Validates user input and sends back jwt token
 */
router.post('/login', async (req, res) => {

  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('incorrect email');

  const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
  );
  if (!validPassword) return res.status(400).send('incorrect password');

  try {
    const {error} = await loginSchema.validateAsync(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

      res.header('auth-token', token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
