import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


import { ignoreTextfieldFiles } from './elements/ignore/textfield';
import { ignoreSelectFiles } from './elements/ignore/select';
import { ignoreSwitchFiles } from './elements/ignore/switch';

const dev = process.env.ROLLUP_WATCH;
const input = ['src/boilerplate-card.ts']
const serveopts = {
  contentBase: ['./release'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  commonjs(),
  typescript(),
  json(),
  babel({
    exclude: 'node_modules/**',
    extensions: [".js", ".svg"]
  }),
  dev && serve(serveopts),
  !dev && terser(),
  ignore({
    files: [...ignoreTextfieldFiles, ...ignoreSelectFiles, ...ignoreSwitchFiles].map((file) => require.resolve(file)),
  }),
  postcss({}),
];

export default [
  {
    input: [...input],
    output: {
      dir: 'release',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
