module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-transform-strict-mode',
    [
      'module-resolver',
      {
        alias: {
          '@/data': './src/data',
          '@/domain': './src/domain',
          '@/main': './src/main',
          '@/presentation': './src/presentation',
        },
      },
    ],
  ],
}
