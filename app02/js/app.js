var app = angular.module('WebApp',[
    'ngRoute'
]);

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
              .otherwise({
                    redirectTo: '/'
              });//
}])// App routes