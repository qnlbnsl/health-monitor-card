import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';

import resolve from 'rollup-plugin-node-resolve';

import { ignoreTextfieldFiles } from './elements/ignore/textfield';
import { ignoreSelectFiles } from './elements/ignore/select';
import { ignoreSwitchFiles } from './elements/ignore/switch';

const input = ['src/boilerplate-card.ts']

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins= [
  resolve(),
  typescript({ sourceMap: true, inlineSources: true }),
  json(),
  babel({
    exclude: ['node_modules/**','sample-data/**'],
    inputSourceMap: true,
  }),
  terser(),
  serve(serveopts),
  ignore({
    files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
  }),
  postcss({}),
  ]

export default {
  input: [...input],
  output: {
    sourcemap: true,
    dir: './dist',
    format: 'es',
  },
plugins: [...plugins]
};
