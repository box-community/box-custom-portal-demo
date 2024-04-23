module.exports = {
    corePlugins: {
      preflight: false,
    },
    webpack: {
      configure: {
        experiments: {
            topLevelAwait: true
        }
      }
    }
  }
  