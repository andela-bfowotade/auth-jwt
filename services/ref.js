angular.module('authApp')
  .factory('__Refs', [function() {
    var ref = new Firebase("https://lsio.firebaseio.com");

    return {
      rootRef: ref,
      users: ref.child('users'),
      tokens: ref.child('token')
    }
  }]);
