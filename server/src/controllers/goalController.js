const asynHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

const getGoals = asynHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).exec();
  res.status(200).json(goals);
})

const setGoal = asynHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal);
})

const updateGoal = asynHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  if (!req.user) { // Check for user 
    res.status(401);
    throw new Error('User not found');
  }
  // Checking logged in user authorisation to goals
  if (goal.user.toString() === req.user.id) {
    res.status(401);
    throw new Error('User not authorised')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(goalId, req.body, { new: true });
  res.status(200).json(updatedGoal);
})

const deleteGoal = asynHandler(async (req, res) => {
  const goalId = req.params.id;
  const goal = await Goal.findById(goalId);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  if (!req.user) { // Check for user 
    res.status(401);
    throw new Error('User not found');
  }
  // Checking logged in user authorisation to goals
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorised')
  }

  await Goal.findByIdAndDelete(goalId);
  res.status(200).json(goalId);
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}