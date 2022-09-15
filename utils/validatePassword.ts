export function validatePassword(pass: string) {
  if (pass.length < 8) {
    return false;
  }
  if (pass.search(/[a-z]/i) < 0) {
    return false;
  }
  if (pass.search(/[A-Z]/i) < 0) {
    return false;
  }
  if (pass.search(/[0-9]/i) < 0) {
    return false;
  }
  if (pass.search(/[^a-zA-Z0-9]/i) < 0) {
    return false;
  }
  return true;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
