const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// Send a message
router.post('/send', async (req, res) => {
  const { sender, content } = req.body;
  try {
    const message = await Message.create({ sender, content });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
