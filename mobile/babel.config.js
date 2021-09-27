module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '~': './src/*',
          },
        },
      ],
    ],
  };
};
