function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

require('./app');
require('./app.css');
require('./markdown.css');
require('./home/home.jsx');

requireAll(require.context('./patterns', true, /\.js$/));
