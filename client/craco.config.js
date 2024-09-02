module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (Array.isArray(rule.oneOf)) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.use) {
              oneOf.use.forEach((use) => {
                if (use.loader && use.loader.includes('css-loader')) {
                  // Disable source maps for CSS
                  use.options.sourceMap = false;
                }
                if (use.loader && use.loader.includes('postcss-loader')) {
                  // Ensure postcss-loader handles CSS correctly
                  use.options = {
                    ...use.options,
                    sourceMap: false,
                  };
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
