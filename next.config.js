const withCSS = require('@zeit/next-css')
const withPWA = require('next-pwa')
const withPurgeCss = require('next-purgecss')

module.exports = withPWA(
  withCSS(
    withPurgeCss(({
      purgeCssPaths: [
        'pages/**/*',
        'components/**/*'
      ],
        content: ['index.html', '**/*.js', '**/*.html', '**/*.vue'],
        css: ['assetsFE/style.css', 'assetsFE/**/*.css', 'assetsFE/**/*.js'],
        pwa: {
          dest: 'public'
        },
          cssLoaderOptions: {
            url: false
          }
        }
      )
  )
  ))