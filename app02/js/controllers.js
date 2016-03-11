app
.controller('CategoriesList',[
    '$scope','DataService', 
    function($scope,DataService){ 
      DataService.getCategories();
}])//CategoryList Controller
.controller('ItemsList',[
    '$scope','$routeParams','DataService',
    function($scope,$routeParams,DataService){
      var cat = $routeParams.catid;
      DataService.getItemsList(cat);
      $scope.item_category = cat;    
}])//Items List Controller 
.controller('ItemInfo',[
    '$scope','$routeParams','DataService',
    function($scope,$routeParams,DataService){
      var cat = $routeParams.catid;
      var itm = $routeParams.itemid;
      DataService.getItemInfo(cat,itm);    
}])//Item Info Controller
;