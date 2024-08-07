import expressAsyncHandler from "express-async-handler";
import { Message } from "../models/messageModel.js";
import { Chat } from "../models/chatModel.js";
import { User } from "../models/userModel.js";

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      users,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Error in fetching users",
      error,
    });
  }
});
const fetchAllGroups = expressAsyncHandler(async (req, res) => {
  try {
    const groups = await Chat.find({
      isGroup: true,
    });
    res.json({
      groups,
    });
  } catch (err) {
    res
      .json({
        msg: "Couldn't fetch groups",
        err,
      })
      .status(400);
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    return res.status(400).json({ msg: "Bad Message request" });
  }

  try {
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [],
      });

      await User.findByIdAndUpdate(senderId, {
        $push: { Chats: chat._id },
      });

      await User.findByIdAndUpdate(receiverId, {
        $push: { Chats: chat._id },
      });
    }

    let message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
      chat: chat._id,
    });

    message = await Message.findById(message._id)
      .populate("sender", "name")
      .populate("receiver", "name")
      .populate("chat")
      .exec();

    chat.messages.push(message._id);
    await chat.save();

    res.json(message);
  } catch (err) {
    res.status(400).json({
      msg: "Message can't be sent",
      err,
    });
  }
});

const createGroup = expressAsyncHandler(async (req, res) => {
  const { groupName, participants } = req.body;
  if (!groupName || !participants || participants.length === 0) {
    return res.status(400).json({
      msg: "Bad request for group creation",
    });
  }
  try {
    const groupChat = await Chat.create({
      isGroup: true,
      groupName,
      participants,
      messages: [],
    });

    for (const participantId of participants) {
      await User.findByIdAndUpdate(participantId, {
        $push: { Chats: groupChat._id },
      });
    }

    const populatedGroupChat = await Chat.findById(groupChat._id).populate(
      "participants",
      "name"
    );

    res.status(201).json(populatedGroupChat);
  } catch (error) {
    res.status(400).json({
      msg: "Group can't be created",
      error,
    });
  }
});

const addGroupMember = () => {};
export {
  fetchAllUsers,
  fetchAllGroups,
  sendMessage,
  addGroupMember,
  createGroup,
};
