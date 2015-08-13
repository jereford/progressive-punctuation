module.exports = config:
    files:
        javascripts: joinTo: 'app.js'
        stylesheets: joinTo: 'app.css'
    plugins:
        coffeescript:
            bare: true
        sass:
          mode: 'native' # set to 'native' to force libsass or 'ruby'
          debug: 'comments' # or set to 'debug' for the FireSass-style output
        #   allowCache: true #allow this during final compilation
