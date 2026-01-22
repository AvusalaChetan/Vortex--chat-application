import { ChatModel } from "../models/chatModel.js";
import { userModel } from "../models/userModel.js";
import { faker, simpleFaker } from "@faker-js/faker";
import { MessageModel } from "../models/messageModel.js";


const createSinglechat = async (numChats) => {
    try {
        const users = await userModel.find().select("_id");

        if (users.length < 2) {
            throw new Error("Need at least 2 users to create chats");
        }

        const chatsPromise = [];

        // Create exactly numChats by iterating once
        for (let i = 0; i < numChats && i < users.length - 1; i++) {
            chatsPromise.push(
                ChatModel.create({
                    name: faker.lorem.words(2),
                    groupChat: false,
                    members: [users[i]._id, users[i + 1]._id],
                })
            );
        }

        // Wait for all chats to be created
        await Promise.all(chatsPromise);

        console.log(`${numChats} chats created successfully`);
        process.exit(0);
    } catch (error) {
        console.error("Error creating chats:", error);
        process.exit(1);
    }
};

const createGroupChat = async (numChats) => {
    try {
        const users = await userModel.find().select("_id");

        const chatsPromise = [];
        for (let i = 0; i < numChats; i++) {
            const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
            const members = [];
            for (let j = 0; j < numMembers; j++) {
                const randomIndex = Math.floor(Math.random() * users.length);
                const randomUser = users[randomIndex]._id;
                if (!members.includes(randomUser)) {
                    members.push(randomUser);
                }
            }

            const chat = await ChatModel.create({
                groupChat: true,
                name: faker.lorem.words(2),
                members,
                creator: members[0],
            });
            chatsPromise.push(chat);
        }
        await Promise.all(chatsPromise);

        console.log(`chats created successfully`);
    } catch (error) {
        console.error("Error creating group chat:", error);
        throw error;
    }
};

const createMessages = async (numMessages) => {
    try {
        const users = await userModel.find().select("_id");
        const chats = await ChatModel.find().select("_id");

        if (users.length === 0 || chats.length === 0) {
            throw new Error("Need users and chats to create messages");
        }

        const messagesPromise = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]._id;
            const randomChat = chats[Math.floor(Math.random() * chats.length)]._id;

            messagesPromise.push(
                MessageModel.create({
                    content: faker.lorem.sentence(),
                    sender: randomUser,
                    chat: randomChat,
                })
            );
        }

        await Promise.all(messagesPromise);

        console.log(`${numMessages} messages created successfully`);
        process.exit();
    } catch (error) {
        console.error("Error creating messages:", error);
        process.exit(1);
    }
};

const createMessagesInAChat = async (chatId, numMessages) => {
    try {
        const users = await userModel.find().select("_id");

        if (users.length === 0) {
            throw new Error("Need users to create messages");
        }

        const messagesPromise = [];

        for (let i = 0; i < numMessages; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)]._id;

            messagesPromise.push(
                MessageModel.create({
                    content: faker.lorem.sentence(),
                    sender: randomUser,
                    chat: chatId,
                })
            );
        }

        await Promise.all(messagesPromise);

        console.log(`${numMessages} messages created in chat ${chatId}`);
        process.exit();
    } catch (error) {
        console.error("Error creating messages in chat:", error);
        process.exit(1);
    }
};

export {
    createSinglechat,
    createGroupChat,
    createMessages,
    createMessagesInAChat,
}