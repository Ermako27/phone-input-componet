import html from 'rollup-plugin-bundle-html';
import css from 'rollup-plugin-css-only';
import nodeResolve from 'rollup-plugin-node-resolve';



export default {
    input: 'main.js',
    output: {
        file: 'build/js/index.js',
        format: 'es',
        indent: false,
    },
    plugins: [
        nodeResolve(),
        html({
            template: 'index.html',
            dest: 'build/',
            filename: 'index.html',
            inject: 'body',
        }),
        css({
            output: 'build/css/style.css',
        }),
    ],
};