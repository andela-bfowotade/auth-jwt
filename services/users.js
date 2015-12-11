angular.module('authApp')
  .factory('__Users', ['$q', '__Refs', function($q, __Refs) {
    return {
      saveUserAuth: function(uid, authObject) {
        var deffered = $q.defer();
        var func = function(arg) {
          if (!arg) {
            __Refs.users.child(uid).set(authObject, function(err) {
              if (err) {
                deffered.reject();
              } else {
                deffered.resolve(authObject);
              }
            });
          }
        }
        var xs = __Refs.users.once('value', function(snap) {
          var checkUserObject = snap.hasChild(uid);
          return func(checkUserObject)
        })
        return deffered.promise;
      },

      destroyUserToken: function(uid) {
        __Refs.tokens.child(uid).remove();
      }
    }
  }])
