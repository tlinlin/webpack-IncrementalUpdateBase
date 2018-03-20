module.exports = ({ file, options, env = 'production' }) => ({
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        // 'postcss-import': { root: file.dirname },
        // 'postcss-cssnext': {},
        'autoprefixer': {browsers: 'ie >= 10,last 10 version'}, // 补缀
        'cssnano':  env === 'production' ? {} : false // 压缩
    }
})