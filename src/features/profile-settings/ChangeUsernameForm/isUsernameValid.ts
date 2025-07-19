export const isUsernameValid = (username: string): { valid: boolean; message?: string } => {
  if (username.length < 3 || username.length > 16) {
    return { valid: false, message: 'Имя пользователя должно быть не короче 3-ех символов и не длиннее 16' }
  } else if (encodeURI(username) !== username) {
    return { valid: false, message: 'Имя пользователя должно содержать только латиницу и цифры' }
  } else if (/^\d+$/.test(username)) {
    return { valid: false, message: 'Имя пользователя не должно содержать только цифры' }
  }
  return { valid: true }
}
