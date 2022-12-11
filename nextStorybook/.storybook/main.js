const path = require("path");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@styles": path.resolve(__dirname, "../styles"),
    };

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      include: path.resolve(__dirname, "../"),
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              auto: true,
              localIdentName: "[name]__[local]--[hash:base64:5]", // index_testButton__z9CpQ 처럼 [path]_[uniqueId]로 표시하고 싶은데 @storybook/preset-scss 쓰면 [uniqueId]만 표시됨 (예시: SKwgNtUsLB_olGMb4p9w )
            },
          },
        },
        "sass-loader",
      ],
    });

    return config;
  },
};
