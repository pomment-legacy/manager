/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

const sass = require('sass');

function conf() {
    let externals = {};
    if (process.env.NODE_ENV === 'production') {
        externals = {
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            moment: 'moment',
        };
    }
    return {
        chainWebpack: (config) => {
            config.plugin('html').tap((args) => {
                args[0].title = 'Pomment Manager';
                return args;
            });
        },
        configureWebpack: {
            externals,
        },
        productionSourceMap: false,
        css: {
            loaderOptions: {
                sass: {
                    implementation: sass, // This line must in sass option
                },
            },
        },
    };
}

module.exports = conf();
