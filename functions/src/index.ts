import * as functions from 'firebase-functions';
import { notifyAboutCommentHandler } from "./notifyAboutComment";
import { createUserHandler } from "./createUser";
import { getProfileHandler } from './getProfile';
import initApolloServer from "./remoteScheme";
import { loginHandler } from './login';

export const notifyAboutComment = functions.https.onRequest(
    notifyAboutCommentHandler
);
export const createUser = functions.https.onRequest(createUserHandler);
export const getProfile = functions.https.onRequest(getProfileHandler);
export const userProfile = functions.https.onRequest(
    initApolloServer.createHandler()
);
export const login = functions.https.onRequest(loginHandler);
