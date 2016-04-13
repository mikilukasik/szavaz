app.controller('geoCtrl', function($cordovaGeolocation) {

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      console.log('inside getCurrentPosition',lat,long)
    }, function(err) {
      // error
    });


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
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      console.log('inside watchPosition',lat,long)
  });

    console.log('geoCtrl ran.')

  // watch.clearWatch();
  // // OR
  // $cordovaGeolocation.clearWatch(watch)
  //   .then(function(result) {
  //     // success
  //     }, function (error) {
  //     // error
  //   });
});