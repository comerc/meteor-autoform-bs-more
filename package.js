Package.describe({
  name: 'comerc:autoform-bs-more',
  summary: 'Bootstrap features for AutoForm',
  version: '1.0.0',
  git: 'https://github.com/comerc/meteor-autoform-bs-more.git'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0');
  api.addFiles([
    'autoform-bs-more.html',
    'autoform-bs-more.js',
  ], 'client');
});
