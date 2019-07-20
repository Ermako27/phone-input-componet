import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import html from 'rollup-plugin-bundle-html';
import css from 'rollup-plugin-css-only';


export default {
    input: 'src/main.ts',
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
        css({
            output: 'build/css/style.css',
        }),
    ],
};
