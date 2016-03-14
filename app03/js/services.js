app
.factory('AuthService',[
    '$rootScope','$firebaseObject','$firebaseAuth','FIREBASE_URL',
    '$location',
    function($rootScope,$firebaseObject,$firebaseAuth,FIREBASE_URL,$location){
        var ref = new Firebase(FIREBASE_URL);
        var authObj = $firebaseAuth(ref);
        
        authObj.$onAuth( function(authData){
            if( authData) //Login
            {
        var usrObj = $firebaseObject( ref
                                        .child('users')
                                        .child(authData.uid)
                                    );
        //console.log('User data:', usrObj);
        usrObj.$loaded()
              .then( function(data){
                 $rootScope.currentUser = {
                  'firstname': data.firstname,
                  'lastname' : data.lastname,
                  'uid':  data.uid,
                  'email': data.email,
                  'welcome_msg': 'Hallo, ' + data.firstname     
                };

                $rootScope.message = 'Hi, ' + data.firstname;
                $location.path('/');
              })//User data loaded successfully
              .catch(function(error){
                $rootScope.message = error.message;
              }); //Error when reading user data 
            }
            else //logout
            {
              $rootScope.currentUser = null;
              $rootScope.message = "You have been logged out";  
            }
        });//On authentication events (login-logout)
        
        var retObj = {
            isLoggedIn : function(){
                return authObj.$requireAuth();
            }, //is loggedin function
            logout: function(){
                authObj.$unauth();
            }, //logout
            loginUser : function(user){
                authObj.$authWithPassword({
                    'email': user.mail,
                    'password': user.pass
                })
                .then( function(authData){
                   
                })//on successful login
                .catch( function(error){
                    $rootScope.message = error.message;
                    $location.path('/registration');
                });//on error
            }, //user login
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
                    retObj.loginUser({
                        'mail': user.mail,
                        'pass': user.pass1
                    });
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