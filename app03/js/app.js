var app = angular.module('WebApp',[
    'ngRoute',
    'firebase'
])
.constant('FIREBASE_URL', 'https://musi-store.firebaseio.com/');

app.config(['$routeProvider', 
        function($routeProvider){
          $routeProvider
              .when('/', {
                  templateUrl: 'templates/categories-list.html',
                  controller: 'CategoriesList'
              })// site root
              .when('/:catid/items', {
                  templateUrl: 'templates/items-in-category.html',
                  controller: 'ItemsList'
              })//list items in category
              .when('/:catid/:itemid', {
                   templateUrl: 'templates/item-details.html',
                   controller: 'ItemInfo'
              })//item details
              .when('/register',{
                templateUrl: 'templates/registration.html',
                controller: 'Registration'
              })
              .otherwise({
                    redirectTo: '/'
              });//
}])// App routes