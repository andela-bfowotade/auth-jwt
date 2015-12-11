angular.module('authApp', [
    'angular-jwt'
  ])
  .controller('ControllerJwt', ['$scope', '__Refs', '__Users', 'jwtHelper', '$rootScope', function($scope, __Refs, __Users, jwtHelper, $rootScope) {

    var returnedAuthObjectIntegration = function(uid, authObj) {
      __Users.saveUserAuth(uid, authObj).then(function(resp) {},
       function(err) {
        console.log(err);
      })
    }

    //Monitor Auth state...to check if user is loggedin...not necessary
    function authDataCallback(authData) {
      if (authData) {
        $scope.loggedin = true;
        __Refs.tokens.child(authData.uid).set(authData.token);
        $rootScope.currentUser = authData;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        $scope.loggedin = false;
        console.log("User is logged out");
      }
    }
    __Refs.rootRef.onAuth(authDataCallback);


    $scope.logout = function() {
      __Users.destroyUserToken($rootScope.currentUser.uid);
      __Refs.rootRef.unauth();
    }

    $scope.facebook = function() {
      __Refs.rootRef.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          returnedAuthObjectIntegration(authData.uid, authData);
          //saving authdata object saves all object data returned, including useless values and the token expiry date
        }
      });
    }

    $scope.twitter = function() {
      __Refs.rootRef.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          returnedAuthObjectIntegration(authData.uid, authData);
          $scope.loggedin = true;
        }
      });
    }

    $scope.google = function() {
      __Refs.rootRef.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          $scope.loggedin = true;
          returnedAuthObjectIntegration(authData.uid, authData);
        }
      });
    }

  }]);
