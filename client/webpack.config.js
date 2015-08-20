module.exports = {
  entry: "./src/app.jsx",
  output: {
    path: __dirname + "/build",
    filename: "app.js"
  },
  module: {
    loaders: [
      // **IMPORTANT** This is needed so that each bootstrap js file required by
      // bootstrap-webpack has access to the jQuery object
      { test: /bootstrap\/js\//, loader: 'imports-loader?jQuery=jquery' },

      // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.(woff|woff2)$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader" },
      { test: /\.eot$/,    loader: "file-loader" },
      { test: /\.svg$/,    loader: "file-loader" },

      { test: /\.jsx$/, loader: "jsx-loader" }
    ]
  }
};
