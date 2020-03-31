const {override, fixBabelImports, addLessLoader} = require('customize-cra');
const darkThemeVars = require('antd/dist/dark-theme');  //自定义深色主题

module.exports = override(
    //针对antd按需打包（babel-plugin-import）
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,   //自动打包相关样式
    }),

    //使用LessLoader对源码的less变量进行覆盖
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // 'hack': `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
            // ...darkThemeVars,
            '@primary-color': '#1DA57A' //配置全局演示，比如按钮
        },
    }),
);