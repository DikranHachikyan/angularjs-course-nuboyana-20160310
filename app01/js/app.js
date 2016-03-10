var app = angular.module('WebApp',[]);

app.controller('DemoCtrl',['$scope', function($scope){
    $scope.message = 'Hello AngularJS';
    
    $scope.cities = ['София','Пловдив','Варна','Перник','Пазарджик','Бургас'];
    
}]); //Demo Controller

app.controller('Ctrl',function($scope){
    
}); //Controller 2