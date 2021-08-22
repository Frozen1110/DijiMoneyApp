import Auth from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';
import { generateSecureRandom } from 'react-native-securerandom';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { resetApolloStore } from './apollo';

export interface UseAuthHookResponse {
  currentUser: CognitoUser | null;
  signIn: (username: string) => Promise<CognitoUser | any>;
  signOut: () => Promise<void>;
  signUp: (phone: string, name: string, email: string) => Promise<ISignUpResult>;
  answerChallenge: (user: CognitoUser | any, answer: string) => Promise<any>;
}

export const initiateLogin = (username: string): Promise<CognitoUser | undefined> =>
  Auth.signIn(username, undefined);

export const getCurrentUser = async (): Promise<CognitoUser | null> => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch {
    // currentAuthenticatedUser throws an Error if not signed in
    return null;
  }
};

export const useAuth = (): UseAuthHookResponse => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    const updateUser = async () => {
      setCurrentUser(await getCurrentUser());
    };
    Hub.listen('auth', updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove('auth', updateUser);
  }, []);

  const signIn = (username: string) => Auth.signIn(username);

  const signOut = async () => {
    await Auth.signOut();
    await resetApolloStore();
  };

  const signUp = (phone: string, name: string, email: string) =>
    generateSecureRandom(32).then(randomBytes => {
      return Auth.signUp({
        username: phone,
        password: [...randomBytes].map(b => b.toString(16)).join(''),
        attributes: {
          name,
          email,
        },
      });
    });
  const answerChallenge = (
    user: CognitoUser | any,
    answer: string,
  ): Promise<CognitoUser | any> => Auth.sendCustomChallengeAnswer(user, answer);

  return { currentUser, signIn, signOut, signUp, answerChallenge };
};
