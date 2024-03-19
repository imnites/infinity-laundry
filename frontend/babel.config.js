module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src/'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json'
        ],
        alias: {
          '~/components': './src/components',
          '~/consts': './src/consts',
          '~/hooks': './src/hooks',
          '~/pages': './src/pages',
          '~/utils': './src/utils',
          '~/me': './src/me'
        }
      }
    ]
  ]
};
