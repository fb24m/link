import { isUsernameValid } from './isUsernameValid'
describe('isUsernameValid()', () => {
  it('Проверка имен пользователя 1/5', () => expect(isUsernameValid('helloworld24').valid).toBe(true))
  it('Проверка имен пользователя 2/5', () => expect(isUsernameValid('hi').valid).toBe(false))
  it('Проверка имен пользователя 3/5', () => expect(isUsernameValid('12345678').valid).toBe(false))
  it('Проверка имен пользователя 4/5', () => expect(isUsernameValid('hello_world_24').valid).toBe(true))
  it('Проверка имен пользователя 5/5', () => expect(isUsernameValid('the_longest_username_ever').valid).toBe(false))
})
