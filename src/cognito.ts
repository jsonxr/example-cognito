import {useMemo} from 'react';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';
import {ulid} from 'ulid';
import {AWS_CLIENT_ID, AWS_USERPOOL_ID} from '@env';

const cognitoRegister = async (
  pool: CognitoUserPool,
  email: string,
  pwd: string, //10 digit
) =>
  new Promise<CognitoUser | undefined>((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({Name: 'email', Value: email}),
      new CognitoUserAttribute({Name: 'custom:ulid', Value: ulid()}),
    ];
    pool.signUp(email, pwd, attributes, [], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log('cognitoSignUp', result);
      resolve(result ? result.user : undefined);
    });
  });

const cognitoResendCode = async (pool: CognitoUserPool, username: string) =>
  new Promise<boolean>((resolve, reject) => {
    const user = new CognitoUser({Pool: pool, Username: username});
    user.resendConfirmationCode((err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log('cognitoResendCode', result);
      resolve(true);
    });
  });

const cognitoConfirmCode = async (
  pool: CognitoUserPool,
  email: string,
  code: string,
) =>
  new Promise<boolean>((resolve, reject) => {
    const user = new CognitoUser({Pool: pool, Username: email});
    user.confirmRegistration(code, false, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      console.log('cognitoConfirmCode', result);
      resolve(result === 'SUCCESS');
    });
  });

export const useCognito = () =>
  useMemo(() => {
    const pool = new CognitoUserPool(cognitoPoolInfo);

    return {
      confirmCode: (email: string, code: string) =>
        cognitoConfirmCode(pool, email, code),

      resendCode: (username: string) => cognitoResendCode(pool, username),

      register: (email: string, password: string) =>
        cognitoRegister(pool, email, password),
    };
  }, []);

const cognitoPoolInfo: ICognitoUserPoolData = {
  UserPoolId: AWS_USERPOOL_ID,
  ClientId: AWS_CLIENT_ID,
};
