import { add, subtract } from './index'

describe('index.ts', () => {
  test('add', () => {
    expect(add(1, 1)).toEqual(2)
  })
  test('subtract', () => {
    expect(subtract(5, 1)).toEqual(4)
  })
})
