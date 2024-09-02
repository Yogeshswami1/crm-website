import Chat from '../models/chatModel.js';

export const createMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;

  try {
    const message = new Chat({ senderId, receiverId, text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error creating message' });
  }
};

export const getChatHistory = async (req, res) => {
  const { managerId, otherManagerId } = req.query;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: managerId, receiverId: otherManagerId },
        { senderId: otherManagerId, receiverId: managerId }
      ]
    }).sort({ createdAt: 1 }); // 1 for ascending order
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat history' });
  }
};
