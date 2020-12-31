import * as functions from 'firebase-functions';
import { notifyAboutCommentHandler } from "./notifyAboutComment";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const notifyAboutComment = functions.https.onRequest(
    notifyAboutCommentHandler
);
