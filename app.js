angular.module('authApp', [
    'angular-jwt'
  ])
  .controller('ControllerJwt', ['$scope', '__Refs', 'jwtHelper', function($scope, __Refs, jwtHelper) {

    $scope.facebook = function() {
      __Refs.rootRef.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

    $scope.twitter = function() {

      __Refs.rootRef.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

    $scope.google = function() {
      __Refs.rootRef.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }

  }]);
