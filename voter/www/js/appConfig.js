app.config(function($stateProvider, $urlRouterProvider, toastrConfig) {
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
});