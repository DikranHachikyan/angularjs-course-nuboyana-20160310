app
.controller('Registration',[
     '$scope','AuthService','$rootScope',
      function($scope,AuthService,$rootScope){
      $scope.register = function( user ){
          //console.log('user:', user);
          AuthService.registerUser(user);
      };//user registration 
      
      $scope.login = function(user){
         AuthService.loginUser(user);  
      };//user loin
    
      $scope.logout = function(){
          AuthService.logout();
      };//logout
      
      $scope.editProfile = function(user){
          AuthService.editProfile(user);
      };//edit user profile
          
      var cuser =$rootScope.currentUser;       
      if( cuser )
      {
          $scope.user = cuser;
      }
           
}])
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
    '$scope','$routeParams','DataService','$rootScope',
    function($scope,$routeParams,DataService,$rootScope){
      var cat = $routeParams.catid;
      var itm = $routeParams.itemid;
      DataService.getItemInfo(cat,itm); 
      DataService.getComments(itm);
      $scope.addComment = function (itmId){
          console.log('itemId:', itmId);
          $scope.comment.user = $rootScope.currentUser.uid;
          $scope.comment.user_name = $rootScope.currentUser.firstname + ' ' + $rootScope.currentUser.lastname;
          DataService.addComment(itmId, $scope.comment);
          $scope.comment.message = '';
          $scope.cmntForm.message.$setPristine();
          $scope.cmntForm.message.$setUntouched();
      }; //Add User Comment    
}])//Item Info Controller
;