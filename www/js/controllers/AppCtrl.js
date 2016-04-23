app.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $interval, $filter, apiService, toastr, errorService, $cordovaGeolocation, $cordovaDevice) {

    $rootScope.language = preferredLanguage;


    // var posOptions = {timeout: 10000, enableHighAccuracy: false};
    // $cordovaGeolocation
    //   .getCurrentPosition(posOptions)
    //   .then(function (position) {
    //     var lat  = position.coords.latitude
    //     var long = position.coords.longitude

    //     $rootScope.toConsole('inside getCurrentPosition',lat,long)
    //   }, function(err) {
    //     // error
    //   });

    $rootScope.device = {
        isReady: false,
        isMobile: false,
        isBrowser: false
    }

    $scope.getIdFromCookie = function(dontGetCookie) {

        $rootScope.clientMongoId = '';

        if(!dontGetCookie){

          $rootScope.clientMongoId = getCookie("clientId");

        }

        

        if ($rootScope.clientMongoId === '') {
            $rootScope.toConsole('no clientMongoId, requesting...');

            apiService.getClientMongoId('newBrowser').then(function(res) {
                setCookie("clientId", res.clientMongoId, 365);
                $rootScope.clientMongoId = res.clientMongoId;
                $rootScope.loginMode = 'fresh';
                $rootScope.toConsole('clientMongoId received', $rootScope.clientMongoId);
            }, function(err) {
                $rootScope.toConsole('silentError', 'NO clientMongoId AT ALL!!');
                errorService.dealWithError(err);
            })

        } else {
            $rootScope.toConsole('clientMongoId from cookie:', $rootScope.clientMongoId);

            apiService.checkClientMongoId($rootScope.clientMongoId).then(function(res) {
                setCookie("clientId", res.clientMongoId, 365);
                $rootScope.clientMongoId = res.clientMongoId;
                $rootScope.loginMode = 'cookie';
                $rootScope.toConsole('clientMongoId without login.');
            }, function(err) {
                $rootScope.toConsole('silentError', 'clientMongoId cookie problem, trying again as new..');
                
                $scope.getIdFromCookie(true)

                errorService.dealWithError(err);
            })

        };
    };

    $rootScope.consoleLog = []
    $rootScope.toConsole = function() {
        $rootScope.consoleLog.push(arguments)
        console.log(arguments)
    };

    $rootScope.spinIt = true;

    $timeout(function() {

        if (!$rootScope.device.isReady) {

            $rootScope.toConsole('silentError:', "Device didn't get ready in " + (new Date() - indexGlobals.appStarted) + ' seconds.');
            $rootScope.toConsole('Treating device as browser.');
            $rootScope.spinIt = false;

            $rootScope.device.isBrowser = true;
            $rootScope.device.isReady = true;

            //f(!$rootScope.device.uuid) $rootScope.device.uuid = Math.random();       //in browser
            

            $scope.getIdFromCookie()


        } else {
            //mobile already initialized
        }


    }, 5000);

    var whenDeviceReady = function () {
       $rootScope.toConsole('Device got ready in ' + (new Date() - indexGlobals.appStarted) + ' seconds.');

        $rootScope.device.isMobile = true;
        $rootScope.device.isReady = true;

        $rootScope.device.deviceInfo = $cordovaDevice.getDevice();
        $rootScope.device.cordova = $cordovaDevice.getCordova();
        $rootScope.device.model = $cordovaDevice.getModel();
        $rootScope.device.platform = $cordovaDevice.getPlatform();
        $rootScope.device.uuid = $cordovaDevice.getUUID();
        $rootScope.version = $cordovaDevice.getVersion();

        $scope.getIdFromHardwareId();

    };

    $scope.getIdFromHardwareId = function () {
      $rootScope.toConsole('requesting clientMongoId...');
        apiService.getClientMongoId($rootScope.device.uuid).then(function(res) {
            $rootScope.clientMongoId = res.clientMongoId;
            $rootScope.loginMode = 'hardWareId';
            $rootScope.toConsole('clientMongoId received', $rootScope.clientMongoId);
        }, function(err) {
            $rootScope.toConsole('silentError', 'NO clientMongoId AT ALL!!');
            errorService.dealWithError(err);
        })
    }

    document.addEventListener("deviceready", whenDeviceReady, false);


    var watchOptions = {
        timeout: 3000,
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
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
            $rootScope.toConsole('$rootScope.myPosition updated', $rootScope.myPosition)
        });

    // $rootScope.toConsole('geoCtrl ran.')

    // watch.clearWatch();
    // // OR
    // $cordovaGeolocation.clearWatch(watch)
    //   .then(function(result) {
    //     // success
    //     }, function (error) {
    //     // error
    //   });




    $rootScope.toastr = function(type, message, noTranslate) {
        if(noTranslate){
          toastr[type](message);
        }else{
          toastr[type]($filter('translate')(message, 'toasts', $rootScope.language));
        }
        
    }




    //var hardWareId = Math.random() // 'tempId';


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    // $scope.$on('$ionicView.enter', function(e) {
    // });
    // Form data for the login modal
    $scope.loginData = {};

    $scope.logoff = function(){
      $rootScope.loginMode = undefined;
      $rootScope.toConsole('logging off.');

      if($rootScope.device.isMobile){
        //mobile
        $scope.getIdFromHardwareId();
      } else {
        //browser
        $scope.getIdFromCookie();
      }
      
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.loginModal = modal;
    });


    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.registerModal = modal;
    });



    // Open the login modal
    $scope.openLoginModal = function() {
        $scope.loginModal.show();
    };


    // Triggered in the login modal to close it
    $scope.closeLoginModal = function() {
        $scope.loginModal.hide();
    };


    $scope.openRegisterModal = function() {
        $scope.registerModal.show();
    };

    $scope.closeRegisterModal = function() {
        $scope.registerModal.hide();
    };


    // Perform the login action when the user submits the login form
    $scope.sendLogin = function() {
        $rootScope.toConsole('Sending login', $scope.loginData);


        apiService.putLogin($scope.loginData.loginName, $scope.loginData.loginPassword).then(function(res) {

          if(res.success){

            $rootScope.toConsole('Logged in, clientMongoId:', res.clientMongoId)

            $rootScope.clientMongoId = res.clientMongoId;
            $rootScope.loginMode = 'username';

            $scope.loginData.loginName = undefined;
            $scope.loginData.loginPassword = undefined;
            
            $scope.closeLoginModal();

          }
          



        }, function(err) {
            errorService.dealWithError(err,true);
        })


    };

    $scope.sendRegister = function() {

        if ($scope.loginData.registerPassword === $scope.loginData.registerPassword2) {

            $rootScope.toConsole('Registering', $scope.loginData);
            apiService.postLogin($scope.loginData.registerName, $scope.loginData.registerPassword).then(function(res) {

              if(res.success){

                $rootScope.toConsole('Logged in, clientMongoId:', res.clientMongoId);


                $rootScope.clientMongoId = res.clientMongoId;
                $rootScope.loginMode = 'username';

                $scope.loginData.registerName = undefined;
                $scope.loginData.registerPassword = undefined;
                $scope.loginData.registerPassword2 = undefined;

                $scope.closeRegisterModal();
                $scope.closeLoginModal();

              }; 

              


            }, function(err) {
                errorService.dealWithError(err);
            })

              

        } else {
            $rootScope.toastr('error', "Passwords don't match.");
        }



    };


})