module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['/'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          "@" : "./",
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {'legacy': true}]
    // require('@babel/plugin-proposal-decorators'),
    // {
    //   legacy: true,
    //   decoratorsBeforeExport: true
    // },
  ],
}
