import resolve from '@rollup/plugin-node-resolve'; // Resuelve las dependencias de los módulos
import commonjs from '@rollup/plugin-commonjs'; // Convierte módulos CommonJS en ES6
import typescript from '@rollup/plugin-typescript'; // Compila TypeScript
import babel from '@rollup/plugin-babel'; // Transpila el código usando Babel

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript(), // Agrega el plugin para compilar TypeScript
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};
