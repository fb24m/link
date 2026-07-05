import { describe, expect, it } from 'vitest'
import { registerSchema, RegisterSchema } from './Register'

const validObject: RegisterSchema = { login: 'fb24m', password: 'Password123', repeatPassword: 'Password123' }

describe('RegisterSchema', () => {
  it('should validate valid object correctly', () => {
    expect(registerSchema.safeParse({ ...validObject }).success).toBe(true)
  })

  it('should validate login correctly', () => {
    const invalidShortLogin = 'U'
    const invalidLongLogin = 'ThisIsWayTooLongForASingleUser'

    expect(() => registerSchema.parse({ ...validObject, login: invalidShortLogin })).toThrowErrorMatchingSnapshot()
    expect(() => registerSchema.parse({ ...validObject, login: invalidLongLogin })).toThrowErrorMatchingSnapshot()
  })

  it('should validate password correctly', () => {
    const invalidShortPassword = 'P123'
    const invalidMissingUpperCasePassword = 'password123'

    expect(() =>
      registerSchema.parse({ ...validObject, password: invalidShortPassword, repeatPassword: invalidShortPassword })
    ).toThrowErrorMatchingSnapshot()
    expect(() =>
      registerSchema.parse({
        ...validObject,
        password: invalidMissingUpperCasePassword,
        repeatPassword: invalidMissingUpperCasePassword,
      })
    ).toThrowErrorMatchingSnapshot()
  })

  it('should validate repeat password correctly', () => {
    const validPassword = 'Password123'
    const invalidMismatchedPassword = 'Different'

    expect(() =>
      registerSchema.parse({ ...validObject, password: validPassword, repeatPassword: invalidMismatchedPassword })
    ).toThrowErrorMatchingSnapshot()
  })

  it('should enforce password length constraint', () => {
    const invalidShortPassword = 'P'

    expect(() =>
      registerSchema.parse({ ...validObject, password: invalidShortPassword, repeatPassword: invalidShortPassword })
    ).toThrowErrorMatchingSnapshot()
  })

  it('should enforce password character constraint', () => {
    const validPassword = 'Password123'
    const invalidNoUpperCasePassword = 'password123'

    expect(() =>
      registerSchema.parse({ ...validObject, password: invalidNoUpperCasePassword, repeatPassword: validPassword })
    ).toThrowErrorMatchingSnapshot()
  })
})
