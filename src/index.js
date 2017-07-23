function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

require('./app');
require('./app.css');

requireAll(require.context('./home', true, /\.js$/));
requireAll(require.context('./patterns', true, /\.js$/));
