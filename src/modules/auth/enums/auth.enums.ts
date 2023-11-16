export enum AuthErrors {
  invalidToken = 'invalid signature',
  expiredToken = 'jwt expired',
  userNotFound = 'user not found',
  userAlreadyExist = 'user already exist',
  invalidCredentials = 'invalid credentials',
  unknown = 'unknown',
}
