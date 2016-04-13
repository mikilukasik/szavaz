app.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $interval, apiService, toastr, errorService, $cordovaGeolocation) {

  $rootScope.language = preferredLanguage;


  // var posOptions = {timeout: 10000, enableHighAccuracy: false};
  // $cordovaGeolocation
  //   .getCurrentPosition(posOptions)
  //   .then(function (position) {
  //     var lat  = position.coords.latitude
  //     var long = position.coords.longitude

  //     console.log('inside getCurrentPosition',lat,long)
  //   }, function(err) {
  //     // error
  //   });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      $rootScope.myPosition = {
        lat : position.coords.latitude,
        long : position.coords.longitude
      }
      console.log('$rootScope.myPosition updated',$rootScope.myPosition)
  });

    // console.log('geoCtrl ran.')

  // watch.clearWatch();
  // // OR
  // $cordovaGeolocation.clearWatch(watch)
  //   .then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });













  var hardWareId = Math.random() // 'tempId';
  var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }
  var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }
  $rootScope.clientMongoId = getCookie("clientId");
  $scope.setClientMongoID = function(clientMongoId) {
  }
  if ($rootScope.clientMongoId === '') {
    console.log('no clientMongoId, requesting...');
    apiService.getClientMongoId(hardWareId).then(function(res) {
      setCookie("clientId", res.clientMongoId, 365);
      $rootScope.clientMongoId = res.clientMongoId;
      console.log('clientMongoId received', $rootScope.clientMongoId);
    }, function(err) {
      errorService.dealWithError(err);
    })
  } else {
    console.log('clientMongoId from cookie, checking', $rootScope.clientMongoId);
    apiService.postClientMongoId($rootScope.clientMongoId).then(function(res) {
      // setCookie("clientMongoId", res.clientMongoId, 365);
      // $rootScope.clientMongoId = res.clientMongoId;
      // console.log('clientMongoId received',$rootScope.clientMongoId);
    }, function(err) {
      errorService.dealWithError(err);
    })
  }
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  // $scope.$on('$ionicView.enter', function(e) {
  // });
  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})