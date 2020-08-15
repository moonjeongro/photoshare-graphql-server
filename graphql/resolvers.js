import { photos, users, tags } from './db';
import { GraphQLScalarType } from 'graphql';

function makeID(len) {
    const chars = [..."abcdefghijklmnopqrstuvwxygABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    return [...Array(len)].map(i => chars[Math.random() * chars.length | 0]).join``;
}

export const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {
            const newPhoto = {
                id: makeID(10),
                ...args.input
            }
            photos.push(newPhoto);
            return newPhoto
        }
    },

    Photo: {
        url: parent => `http://mywebsite.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubId === parent.githubId);
        },
        taggedUsers: parent => tags
        .filter(tag=> tag.photoId === parent.id)
        .map(tag => tag.userId)
        .map(userId => users.find(u => u.githubId === userId))
    },  

    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubId === parent.githubId);
        },
        taggedPhotos: parent => tags
        .filter(tag=> tag.taggedUsers === parent.id)
        .map(tag => tag.photoId)
        .map(photoId => photos.find(p => p.photoId === photoId))
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'date time value',
        parseValue: value => new Date(value), // value from the client
        serialize: value => new Date(value).toISOString(), // value sent to the client
        parseLiteral: ast => ast.value // ast value is always in string format
    })
};