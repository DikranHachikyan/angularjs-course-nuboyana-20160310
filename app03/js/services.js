app
.factory('AuthService',[
    '$rootScope','$firebaseObject','$firebaseAuth','FIREBASE_URL',
    function($rootScope,$firebaseObject,$firebaseAuth,FIREBASE_URL){
        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);
        var retObj = {
            registerUser: function(user){
                authObj.$createUser({
                    'email': user.mail,
                    'password':user.pass1
                })// create user
                .then(function(userData){
                    var usrObj = ref.child('users').child(userData.uid);
                    usrObj.set({
                        'uid': userData.uid,
                        'firstname': user.firstname,
                        'lastname':user.lastname,
                        'email':user.mail,
                        'date':Firebase.ServerValue.TIMESTAMP
                    });
                    $rootScope.welcome_msg = 'Hi, ' + user.firstname;
                })//on success
                .catch( function(error){
                    $rootScope.message = error.message;
                });//on error
            }//register user
        }; //return object
        return retObj;    
}]) //Authentication Service
.factory('DataService',
        ['$rootScope','$firebaseObject','FIREBASE_URL',
    function($rootScope,$firebaseObject,FIREBASE_URL){
     var ref = new Firebase(FIREBASE_URL );
     var retObj = {
        getItemInfo: function(catid,itemid){
            var fbObj = $firebaseObject(ref.child('collections/'+ catid +'/' +itemid));
                fbObj.$loaded()
                 .then( function(data){
                    $rootScope.item = data;
                 })//on success
                 .catch( function(error){
                    console.log('Error getItemInfo:', error);
                    $rootScope.message = error.message;
                }); //on error
        }, //get item info 
        getItemsList: function(catid){
            var fbObj = $firebaseObject(ref.child('collections').child(catid));
            
            fbObj.$loaded()
                 .then( function(data){
                    $rootScope.items = data;
                 })//on success
                 .catch( function(error){
                    console.log('Error getItemsList:', error);
                    $rootScope.message = error.message;
                }); //on error
        }, //get items in category catid 
        getCategories: function(){
            var fbObj = $firebaseObject(ref.child('categories'));
            fbObj.$loaded()
                 .then(function(data){
                    $rootScope.categories = data;
                    //console.log('data:', data);
                 }) //on success
                 .catch(function(error){
                    console.log('Error getCategories:', error);
                    $rootScope.message = error.message;
                 });//on error
        }//get categories 
     };
        
    return retObj;    
}]);