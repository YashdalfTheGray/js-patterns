function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

require('./app');

requireAll(require.context('./home', true, /\.js$/));
requireAll(require.context('./patterns', true, /\.js$/));
