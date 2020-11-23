import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/quick-state.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [typescript()],
}
