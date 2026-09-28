/* =========================================================
   ROOMNEST — MESSAGE CONTROLLER
   File: backend/controllers/messageController.js

   Handles:
   - Send message
   - Get conversations
   - Get conversation messages
   - Mark message as read
   - Mark conversation as read
   - Delete message
========================================================= */

const Message = require("../models/Message");
const User = require("../models/User");


/* =========================================================
   01. SEND MESSAGE
========================================================= */

const sendMessage = async (
    req,
    res,
    next
) => {

    try {

        const {
            receiver,
            message,
            property,
            booking,
            inquiry,
            attachment
        } = req.body;


        if (
            !receiver ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Receiver and message are required."

            });
        }


        if (
            receiver.toString() ===
            req.user.id.toString()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "You cannot send a message to yourself."

            });
        }


        /* ---------------------------------------------
           Check receiver
        --------------------------------------------- */

        const receiverUser =
            await User.findById(
                receiver
            );


        if (!receiverUser) {

            return res.status(404).json({

                success: false,

                message:
                    "Receiver not found."

            });
        }


        /* ---------------------------------------------
           Create message
        --------------------------------------------- */

        const newMessage =
            await Message.create({

                sender:
                    req.user.id,

                receiver,

                message:
                    message.trim(),

                property:
                    property || null,

                booking:
                    booking || null,

                inquiry:
                    inquiry || null,

                attachment:
                    attachment || null,

                read:
                    false

            });


        const populatedMessage =
            await Message.findById(
                newMessage._id
            )
            .populate(
                "sender",
                "name email phone avatar role"
            )
            .populate(
                "receiver",
                "name email phone avatar role"
            );


        return res.status(201).json({

            success: true,

            message:
                "Message sent successfully.",

            data:
                populatedMessage

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   02. GET CONVERSATIONS
========================================================= */

const getConversations = async (
    req,
    res,
    next
) => {

    try {

        const userId =
            req.user.id;


        const messages =
            await Message.find({

                $or: [

                    {
                        sender:
                            userId
                    },

                    {
                        receiver:
                            userId
                    }

                ]

            })
            .populate(
                "sender",
                "name email phone avatar role"
            )
            .populate(
                "receiver",
                "name email phone avatar role"
            )
            .sort({
                createdAt: -1
            });


        /*
           Group messages by other user.
        */

        const conversations =
            new Map();


        messages.forEach(
            message => {

                const isSender =
                    message.sender._id.toString() ===
                    userId.toString();


                const otherUser =
                    isSender
                        ? message.receiver
                        : message.sender;


                if (!otherUser) {
                    return;
                }


                const otherUserId =
                    otherUser._id.toString();


                if (
                    !conversations.has(
                        otherUserId
                    )
                ) {

                    conversations.set(
                        otherUserId,
                        {

                            user:
                                otherUser,

                            lastMessage:
                                message,

                            unreadCount:
                                0

                        }
                    );
                }


                if (
                    message.receiver._id.toString() ===
                    userId.toString() &&
                    !message.read
                ) {

                    conversations.get(
                        otherUserId
                    ).unreadCount++;
                }

            }
        );


        return res.status(200).json({

            success: true,

            conversations:
                Array.from(
                    conversations.values()
                )

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   03. GET CONVERSATION
========================================================= */

const getConversation = async (
    req,
    res,
    next
) => {

    try {

        const otherUserId =
            req.params.userId;


        if (!otherUserId) {

            return res.status(400).json({

                success: false,

                message:
                    "User ID is required."

            });
        }


        const otherUser =
            await User.findById(
                otherUserId
            ).select(
                "name email phone avatar role"
            );


        if (!otherUser) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });
        }


        const messages =
            await Message.find({

                $or: [

                    {
                        sender:
                            req.user.id,

                        receiver:
                            otherUserId

                    },

                    {
                        sender:
                            otherUserId,

                        receiver:
                            req.user.id

                    }

                ]

            })
            .populate(
                "sender",
                "name email phone avatar role"
            )
            .populate(
                "receiver",
                "name email phone avatar role"
            )
            .sort({
                createdAt: 1
            });


        return res.status(200).json({

            success: true,

            user:
                otherUser,

            count:
                messages.length,

            messages

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   04. MARK MESSAGE AS READ
========================================================= */

const markMessageAsRead = async (
    req,
    res,
    next
) => {

    try {

        const message =
            await Message.findById(
                req.params.id
            );


        if (!message) {

            return res.status(404).json({

                success: false,

                message:
                    "Message not found."

            });
        }


        if (
            message.receiver.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can only mark received messages as read."

            });
        }


        message.read =
            true;

        message.readAt =
            new Date();


        await message.save();


        return res.status(200).json({

            success: true,

            message:
                "Message marked as read."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   05. MARK CONVERSATION AS READ
========================================================= */

const markConversationAsRead = async (
    req,
    res,
    next
) => {

    try {

        const otherUserId =
            req.params.userId;


        const result =
            await Message.updateMany(

                {
                    sender:
                        otherUserId,

                    receiver:
                        req.user.id,

                    read:
                        false
                },

                {
                    $set: {
                        read:
                            true,

                        readAt:
                            new Date()
                    }
                }

            );


        return res.status(200).json({

            success: true,

            message:
                "Conversation marked as read.",

            modifiedCount:
                result.modifiedCount

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   06. DELETE MESSAGE
========================================================= */

const deleteMessage = async (
    req,
    res,
    next
) => {

    try {

        const message =
            await Message.findById(
                req.params.id
            );


        if (!message) {

            return res.status(404).json({

                success: false,

                message:
                    "Message not found."

            });
        }


        if (
            message.sender.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can only delete your own messages."

            });
        }


        await Message.findByIdAndDelete(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Message deleted successfully."

        });

    } catch (error) {

        next(error);
    }
};


/* =========================================================
   EXPORT
========================================================= */

module.exports = {

    sendMessage,
    getConversations,
    getConversation,
    markMessageAsRead,
    markConversationAsRead,
    deleteMessage

};