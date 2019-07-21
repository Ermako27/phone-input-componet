import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-bundle-html';
import css from 'rollup-plugin-css-only';


export default {
    input: 'src/main.js',
    output: {
        file: 'build/js/index.js',
        format: 'es',
        indent: false,
    },
    plugins: [
        babel(),
        html({
            template: 'index.html',
            dest: 'build/',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
};