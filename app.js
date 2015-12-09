angular.module('appJwt', ['angular-jwt'])
  .config(function($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', function(config) {
      var serviceUrl = config.url.match(/^(?:http?:\/\/)?(?:[^@\n]+@)?(www\.)?([^:\/\n^.]+)(?:.*)/im)
      if (localStorage.getItem(serviceUrl + '_token')) {
        return localStorage.getItem(serviceUrl + '_token');
      }
    }];
    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .controller('ControllerJwt', ['$http', '$scope', '$location', 'jwtHelper', function($http, $scope, $location, jwtHelper) {
    // This request will send the auth0.id_token since URL matches

    $scope.instagram = function() {
      OAuth.popup('instagram')
        .done(function(result) {
          console.log('you have been authenticated', result)

          // ..DECODING THE TOKEN
          // token gotten from angular jwt example
          // var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';

          //result token
          var result_token = result.access_token;
          var tokenPayload = jwtHelper.decodeToken(result_token);
          console.log('result toke', tokenPayload);

        })
    }

  }]);
