module.exports = {
  browserSync: {
    hostname: "fetest",
    port: 3089,
    ui: false,
    openAutomatically: false,
    reloadDelay: 2000,
    injectChanges: true,
    online: false
  },

  autoprefixerOptions: {
    browsers: [
      'last 2 versions',
      'iOS >= 8',
      'IE >= 11'
    ]
  },

  twig: {
    useCache: true
  }

  /*styleGuide: {
    source: '../_components',
    destination: '../styleguide',
    builder: 'builder/twig',
    'extend-drupal8': true,
    'namespace': [
      'styleguide:../_components',
      'svg:../svg'
    ],
    // The css and js paths are URLs, like '/misc/jquery.js'.
    // The following paths are relative to the generated style guide.
    css: [
      '../fonts/webfonts.css',
      '../css/styles.css',
      '//fonts.googleapis.com/css?family=Montserrat:400,700',
      '//fonts.googleapis.com/css?family=Roboto:400,700'

    ],
    js: [
      '../../../../core/assets/vendor/jquery/jquery.min.js',
      '../../../../core/assets/vendor/jquery-once/jquery.once.min.js',
      '../../../../core/assets/vendor/domready/ready.min.js',
      '../js/scripts.js'
    ]
  }*/
};
