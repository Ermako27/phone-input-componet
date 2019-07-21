import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import {terser} from 'rollup-plugin-terser';
import nodeResolve from 'rollup-plugin-node-resolve';
import pkg from './package.json'

export default [
    {
        // ES
        input: 'src/index.ts',
        output: {
            file: 'es/phoneInputComponent.js',
            format: 'es',
            indent: false,
        },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            babel(),
            typescript({tsconfig: 'tsconfig.json'}),
        ],
    },
    {
        // CommonJS
        input: 'src/index.ts',
        output: {
            file: 'lib/phoneInputComponent.js',
            format: 'cjs',
            indent: false,
        },
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [
            babel(),
            typescript({tsconfig: 'tsconfig.json'}),
        ],
    },
    {
        // ES for Browsers
        input: 'src/index.ts',
        output: {
            file: 'es/phoneInputComponent.mjs',
            format: 'es',
            indent: false,
        },
        plugins: [
            babel(),
            typescript({tsconfig: 'tsconfig.json'}),
            nodeResolve(),
            terser({
                compress: {
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    warnings: false,
                }
            })
        ]
    },
];
