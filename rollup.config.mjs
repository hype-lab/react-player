import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';
import cleanup from 'rollup-plugin-cleanup';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json' assert { type: 'json' };

export default [
    {
        input: 'src/index.ts',
        external: ['react'],
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                assetFileNames: "assets/[name]-[hash][extname]"
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
                assetFileNames: "assets/[name]-[hash][extname]"
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json', sourceMap: true, inlineSources: true }),
            css({ modules: true }),
            cleanup({ extensions: ['ts', 'tsx', 'js', 'jsx', 'mjs'] })
        ],
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm', sourcemap: true }],
        plugins: [dts()],
    },
];