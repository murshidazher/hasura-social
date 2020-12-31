import * as functions from 'firebase-functions';
import { notifyAboutCommentHandler } from "./notifyAboutComment";
import { createUserHandler } from "./createUser";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const notifyAboutComment = functions.https.onRequest(
    notifyAboutCommentHandler
);
export const createUser = functions.https.onRequest(createUserHandler);
