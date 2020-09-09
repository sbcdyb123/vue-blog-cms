/* eslint-disable comma-dangle */
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      }
    ],
  ],
}
