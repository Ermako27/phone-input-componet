import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import html from 'rollup-plugin-bundle-html';


export default {
    input: 'src/index.ts',
    output: {
        file: 'build/js/index.js',
        format: 'es',
        indent: false,
    },
    plugins: [
        babel(),
        typescript({tsconfig: 'tsconfig.json'}),
        html({
            template: 'src/index.html',
            dest: 'build/',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
};
