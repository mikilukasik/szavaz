// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'toastr']);


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('translate', function($rootScope) {
  return function(input, type, lang) {

    return translations[$rootScope.language][type][input]

  }
})

.factory('apiService', function($http){
  return {

    postQuestion: function(question){
      var req = {
        method: 'POST',
        url: '/api/questions',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          question: question
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });

    },

    
    postPromotion: function(promotion){
      var req = {
        method: 'POST',
        url: '/api/promotions',
        headers: {
          'Content-Type': 'application/json'
        },
        data: promotion
      }
      return $http(req).then(function(res) {
        return res.data;
      });

    },

    escalateQuestion: function(questionId){
      var req = {
        method: 'PUT',
        url: '/api/questions/' + questionId, 
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });

    },


    postVote: function(vote){
      var req = {
        method: 'POST',
        url: '/api/votes',
        headers: {
          'Content-Type': 'application/json'
        },
        data: vote
      }
      return $http(req).then(function(res) {
        return res.data;
      });

    },

    getQuestion: function(questionId){
      var req = {
        method: 'GET',
        url: '/api/questions/' + questionId, 
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });

    },


    getClientMongoId: function(hardWareId){
      var req = {
        method: 'GET',
        url: '/api/client-mongo-id/' + hardWareId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });
    },

    postClientMongoId: function(clientMongoId){
      var req = {
        method: 'GET',
        url: '/api/client-mongo-id/' + clientMongoId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });
    }
  }
})


.factory('errorService', function($http){
  return {
    dealWithError: function(err){

     console.log('silentError:',err)

    }
  }
})


.config(function($stateProvider, $urlRouterProvider, toastrConfig) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.addQuestion', {
    url: '/addQuestion',
    views: {
      'menuContent': {
        templateUrl: 'templates/addQuestion.html',
        controller: 'addQuestionCtrl'
      }
    }
  })

  .state('app.promoteQuestion', {
    url: '/promoteQuestion',
    views: {
      'menuContent': {
        templateUrl: 'templates/promotables.html',
        controller: 'promotablesCtrl'
      }
    }
  })

  .state('app.promotable', {
    url: '/promotables/:promotableId',
    views: {
      'menuContent': {
        templateUrl: 'templates/promotableQuestion.html',
        controller: 'promotableQuestionCtrl'
      }
    }
  })

  .state('app.votables', {
    url: '/votables',
    views: {
      'menuContent': {
        templateUrl: 'templates/votables.html',
        controller: 'votablesCtrl'
      }
    }
  })

  .state('app.votable', {
    url: '/votables/:votableId',
    views: {
      'menuContent': {
        templateUrl: 'templates/votableQuestion.html',
        controller: 'votableQuestionCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/votables');


  angular.extend(toastrConfig, {
    autoDismiss: false,
    containerId: 'toast-container',
    maxOpened: 0,    
    newestOnTop: true,
    positionClass: 'toast-top-center',
    preventDuplicates: false,
    preventOpenDuplicates: false,
    target: 'body'
  });




// app.config(function(toastrConfig) {
//   angular.extend(toastrConfig, {
//     autoDismiss: false,
//     containerId: 'toast-container',
//     maxOpened: 0,    
//     newestOnTop: true,
//     positionClass: 'toast-bottom-center',
//     preventDuplicates: false,
//     preventOpenDuplicates: false,
//     target: 'body'
//   });
// })





});