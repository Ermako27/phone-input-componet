module.exports = {
    presets: [
        [
            "@babel/env",
            "@babel/preset-typescript",
            {
                modules: false,
                loose: true
            }
        ]
    ],
    plugins: [
        "@babel/proposal-class-properties",
        "@babel/proposal-object-rest-spread"
    ]
}

