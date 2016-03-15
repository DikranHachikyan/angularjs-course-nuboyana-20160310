var app = angular.module('WebApp',[
    'ngRoute',
    'firebase'
])
.constant('FIREBASE_URL', 'https://musi-store.firebaseio.com/')
.run(['$rootScope','$location', function($rootScope,$location){
    $rootScope.$on('$routeChangeError', 
                  function(event,current,previous,rejection){
                    //console.log('Current:', current);
                    if( rejection == 'AUTH_REQUIRED')
                    {
                        $rootScope.current_path = '/' + current.params.catid + '/' + current.params.itemid;
                        $rootScope.message = 'Authentication is required';
                        $location.path('/login');
                    }
    }); //on route change error
}])
.config(['$routeProvider', 
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
                   controller: 'ItemInfo',
                   resolve: {
                       itemDetails : ['AuthService', 
                                      function(AuthService){
                                        return AuthService.isLoggedIn();
                       }]// require authentication
                   }
              })//item details
              .when('/register',{
                templateUrl: 'templates/registration.html',
                controller: 'Registration'
              })//User Registration
              .when('/login',{
                templateUrl: 'templates/login.html',
                controller: 'Registration'
              })//User Login
              .when('/edit-profile',{
                templateUrl: 'templates/edit-profile.html',
                controller: 'Registration'
              })//Edit user profile
              .otherwise({
                    redirectTo: '/'
              });//
}])// App routes