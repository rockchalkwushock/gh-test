module.exports = {
  bail: true,
  collectCoverageFrom: ['./src'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
  roots: ['./src'],
}
