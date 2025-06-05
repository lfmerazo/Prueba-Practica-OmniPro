// web/cypress/webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    // Alias para que @pages / @fixtures / @support apunten a las carpetas dentro de cypress
    alias: {
      '@pages':    path.resolve(__dirname, 'page-objects'),
      '@fixtures': path.resolve(__dirname, 'fixtures'),
      '@support':  path.resolve(__dirname, 'support')
    },
    // Extensiones que Webpack intentará resolver sin que tengas que poner la extensión en el import
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,           // Aplica a todos los archivos .js
        exclude: /node_modules/, // Excepto los de node_modules
        use: {
          loader: 'babel-loader',
          options: {
            // No necesitas definir "presets" aquí porque tienes un .babelrc en la raíz.
            // Babel buscará .babelrc automáticamente y usará ["@babel/preset-env"].
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  }
};
