var app = angular.module('WebApp',[]);

app.controller('CategoryList',['$scope','$http', 
                function($scope,$http){
    //$scope.message = 'Test';                
    $http.get('js/cd-db-firebase.json')
         .then(function(response){
            //console.log('response:',response);
          $scope.categories = response.data.categories;
         })//on success
         .catch(function(error){
            $scope.message = error.message;
         });//on error
}]); //CategoryList Controller