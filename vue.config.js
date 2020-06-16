/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */

module.exports = {
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'Pomment Manager';
            return args;
        });
    },
    configureWebpack: {
        externals: {
            // vue: 'Vue',
            moment: 'moment',
        },
    },
};
