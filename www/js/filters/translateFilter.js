app.filter('translate', function($rootScope) {
  return function(input, type, lang) {
    return translations[$rootScope.language][type][input]
  }
})