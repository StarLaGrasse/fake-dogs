const { defineConfig } = require('@vue/cli-service');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Fetch Take Home Exam: Frontend";
                args[0].description = "This is a take home programming test for Fetch.";
                return args;
            });
    },
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: "src/assets", to: "assets" },
                    { from: "src/robots.txt", to: "robots.txt"}
                ]
            })
        ],
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "@/scss/globals.scss";`
            }
        }
    }
};
