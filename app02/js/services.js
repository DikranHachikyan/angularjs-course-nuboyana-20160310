app.factory('DataService',
        ['$rootScope','$http',
    function($rootScope,$http){

     var retObj = {
        getCategories : function(){
            $http.get('js/cd-db-firebase.json')
              .then(function(response){
            //console.log('response:',response);
                $rootScope.categories =  response.data.categories;
             })//on success
          .catch(function(error){
            $rootScope.message = error.message;
          });
        },//get categories
        getItemsList : function(catid){
            $http.get('js/cd-db-firebase.json')
           .then( function(response){
             $rootScope.items = response.data.collections[catid];
           })//on success
           .catch(function(error){
             $rootScope.message = error.message;
           });//on error
        },//get items list in category catid 
         getItemInfo: function(catid, itemid){
             $http.get('js/cd-db-firebase.json')
             .then( function(response){
             $rootScope.item = response.data.collections[catid][itemid];
             console.log('Item Info:', $rootScope.item)     
           })//on success
           .catch(function(error){
             $rootScope.message = error.message;
           });//on error
         }//get item info
     };
        
    return retObj;    
}]);