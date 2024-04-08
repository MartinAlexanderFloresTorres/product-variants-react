import resolve from '@rollup/plugin-node-resolve'; // Resuelve las dependencias de los módulos
import commonjs from '@rollup/plugin-commonjs'; // Convierte módulos CommonJS en ES6
import typescript from '@rollup/plugin-typescript'; // Compila TypeScript
import babel from '@rollup/plugin-babel'; // Transpila el código usando Babel
import postcss from 'rollup-plugin-postcss'; // Importa rollup-plugin-postcss
import tailwindcss from 'tailwindcss'; // Importa Tailwind CSS

export default {
  input: 'src/index.ts',
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
    typescript({
      outputToFilesystem: false, // Deshabilita la escritura de archivos en el sistema de archivos
    }), // Agrega el plugin para compilar TypeScript
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    postcss({
      // Agrega rollup-plugin-postcss con las opciones necesarias
      plugins: [
        tailwindcss, // Agrega Tailwind CSS como plugin de PostCSS
      ],
      inject: false,
      extract: true,
    }),
  ],
};
