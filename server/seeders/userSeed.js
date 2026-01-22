import { faker } from "@faker-js/faker";
import { userModel } from "../models/userModel.js";

const createUser = async (numUsers) => {
    try {
        const usersPromises = [];
        for (let i = 1; i <= numUsers; i++) {
            const tempUser = userModel.create({
                name: faker.person.fullName(),
                username: faker.internet.username(),
                email: faker.internet.email(),
                password: "123456",
                avatar: {
                    public_id: faker.string.uuid(),
                    url: faker.image.avatarGitHub(),
                },
            });
            usersPromises.push(tempUser);
        }
        await Promise.all(usersPromises);
        console.log(`users created`, numUsers);
    } catch (error) {
        console.log("Error creating users:", error);
        process.exit(1);
    }
};



export {
    createUser
};



