const fs = require("fs");
const path = require("path");

module.exports = ({ env }) => ({
  syntax: "postcss-scss",
  parser: "postcss-scss",
  plugins: [
    require("postcss-import")({
      extensions: ".pcss",
    }),
    require("autoprefixer")({
      cascade: false,
    }),
    require("postcss-each"),
    require("postcss-advanced-variables")({
      variables: JSON.parse(
        fs.readFileSync(path.join(__dirname, "src/lib/styles/variables.json"), "utf-8"),
      ),
      unresolved: "ignore",
    }),
    require("postcss-nested"),
    require("postcss-rgb"),
    env === "production" ? require("cssnano") : false,
    require("postcss-pxtorem")({
      rootValue: 16,
      propList: ["*", "!*border*"],
      selectorBlackList: [/^html$/],
    }),
  ],
});
