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
          '@/helpers': './src/helpers',
          '@/domain': './src/domain',
          '@/infra': './src/infra',
          '@/main': './src/main',
          '@/presentation': './src/presentation',
          '@/validations': './src/validations',
        },
      },
    ],
  ],
}
