function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

require('./app');

requireAll('./home', true, /\.js^/);
requireAll('./patterns', true, /\.js^/);
