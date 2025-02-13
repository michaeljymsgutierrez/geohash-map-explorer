module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/geohash-explorer',
        permanent: true,
      },
    ]
  },
}
