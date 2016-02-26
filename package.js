Package.describe({
  name: 'comerc:autoform-bs-more',
  summary: 'Some Bootstrap features for AutoForm (Modal, Panel and more)',
  version: '1.6.0',
  git: 'https://github.com/comerc/meteor-autoform-bs-more.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@5.0.0');
  api.addFiles([
    'autoform-bs-more.html',
    'autoform-bs-more.js',
    'autoform-modalForm.css',
    'autoform-modalForm.html',
    'autoform-modalForm.js',
  ], 'client');
});
