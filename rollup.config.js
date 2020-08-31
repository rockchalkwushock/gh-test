import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

// Get data from the package.json for naming our files.
const pkg = require('./package.json')

const format = process.env.FORMAT
const cjs = format === 'cjs'
const es = format === 'es'
const umd = format === 'umd'

let output

/**
 * This block is used for the various build scripts based on
 * the format passed in each script.
 */
if (es) {
  output = { exports: 'auto', file: `${pkg.module}`, format: 'es' }
} else if (umd) {
  output = [
    {
      exports: 'auto',
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'GH-Test',
    },
    {
      exports: 'auto',
      file: 'dist/bundle.umd.min.js',
      format: 'umd',
      name: 'GH-Test',
      // This plugin minifies our code.
      plugins: [terser()],
    },
  ]
} else if (cjs) {
  output = { exports: 'auto', file: `${pkg.main}`, format: 'cjs' }
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`)
} else {
  throw new Error('no format specified. --environment FORMAT:xxx')
}

export default {
  // Entry point for build.
  input: 'src/index.ts',
  // The different builds to emit.
  output,
  // Transformations to be performed on source code.
  plugins: [
    // Compile TS --> JS.
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/types',
          noEmit: false,
        },
      },
      useTsconfigDeclarationDir: true,
    }),
    // Transpile our code from fancy JS to browser supported JS.
    babel({
      babelHelpers: 'runtime',
      plugins: [['@babel/plugin-transform-runtime', { useESModules: !cjs }]],
      presets: ['@babel/preset-env'],
    }),
  ],
}
