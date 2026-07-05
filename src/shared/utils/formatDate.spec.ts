import { test, expect } from 'vitest'
import { formatDate, months } from './formatDate'

test('formatDate function returns correct formatted date', () => {
  const now = new Date()
  const expectedFormat = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
  expect(formatDate(now)).toBe(expectedFormat)
})

test('formatDate function returns correct formatted date for the beginning of a month', () => {
  const startDate = new Date(new Date().getFullYear(), 0, 1)
  const expectedFormat = `1 ${months[0]} ${startDate.getFullYear()}, 0:00`
  expect(formatDate(startDate)).toBe(expectedFormat)
})

test('formatDate function returns correct formatted date for the end of a month', () => {
  const endDate = new Date(new Date().getFullYear(), 11, 31, 23, 59)
  const expectedFormat = `31 ${months[11]} ${endDate.getFullYear()}, 23:59`
  expect(formatDate(endDate)).toBe(expectedFormat)
})

test('formatDate function returns correct formatted date with zero-padded hours and minutes', () => {
  const testDate = new Date(2022, 5, 14, 6, 8)
  const expectedFormat = '14 июня 2022, 6:08'
  expect(formatDate(testDate)).toBe(expectedFormat)
})

test('formatDate function returns correct formatted date with zero-padded minutes if less than 10', () => {
  const testDate = new Date(2023, 9, 1, 12, 5)
  const expectedFormat = '1 октября 2023, 12:05'
  expect(formatDate(testDate)).toBe(expectedFormat)
})

test('formatDate function handles null input by returning default format', () => {
  expect(formatDate(null)).toBe('1 янв 1970, 00:00')
})

test('formatDate function handles undefined input by returning default format', () => {
  expect(formatDate(undefined)).toBe('1 янв 1970, 00:00')
})
