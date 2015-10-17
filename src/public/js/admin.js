var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function(NgAdminConfigurationProvider) {
  var nga = NgAdminConfigurationProvider;
  // create an admin application
  var admin = nga.application('Hero Developer Admin')
    .baseApiUrl('/api/v1/');

   var heroes = nga.entity('heroes');
   heroes.listView().fields([
        nga.field('name'),
        nga.field('created')
    ]);
   admin.addEntity(heroes);
  // more configuation here later
  // ...
  // attach the admin application to the DOM and run it
  nga.configure(admin);






}]);
