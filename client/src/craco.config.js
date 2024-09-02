const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (Array.isArray(rule.oneOf)) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.test && oneOf.test.toString().includes('css')) {
              oneOf.use.forEach((use) => {
                if (use.loader && use.loader.includes('css-loader')) {
                  use.options.sourceMap = false;
                }
              });
            }
          });
        }
      });

      return webpackConfig;
    },
  },
};
