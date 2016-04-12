app.filter('trustedUrl', function($sce) {

  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };

});