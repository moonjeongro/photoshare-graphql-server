import { photos } from './db';

function makeID(len) {
    const chars = [..."abcdefghijklmnopqrstuvwxygABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    // and then just do:
    return [...Array(len)].map(i => chars[Math.random() * chars.length | 0]).join``;
}

export const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {
            console.log(makeID(10));
            let newPhoto = {
                id: makeID(10),
                ...args
            }

            photos.push(newPhoto);
            
            return newPhoto
        }
    }
};