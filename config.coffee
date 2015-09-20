module.exports = config:
# See https://github.com/brunch/brunch/blob/stable/docs/config.md for documentation.
  files:
    javascripts:
      joinTo:
        'libraries.js': /^(?!app\/)/
        'app.js': /^app\//
        'vendor.js': /^vendor/
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'javascripts/app.js'
