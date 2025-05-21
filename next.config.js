/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_MAPBOX_API_KEY: 'pk.eyJ1IjoiZW1yYWhjYW4iLCJhIjoiY2x3aDc3eWE5MHRtcTJrcGRjZGVlZWJwZyJ9.0Ks_UWmMPfB9bwVCq7tLbg',
  }
}

module.exports = nextConfig
