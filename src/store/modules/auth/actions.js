export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}
