export const getOtherMembers = (members, userId) => {
    return members.find(member => member._id.toString() !== userId.toString());
} 

export const secretKey = process.env.ADMIN_SECRET_KEY;