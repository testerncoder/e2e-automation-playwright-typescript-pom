module.exports = {
    mode: 'development', // always run with development and source maps
    devtool: 'inline-source-map', // always debuggable
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}
