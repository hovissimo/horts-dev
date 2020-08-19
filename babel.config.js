module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV)
  return  {
    plugins: [
      !api.env('production') && 'react-refresh/babel',
    ].filter(Boolean),
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
}
