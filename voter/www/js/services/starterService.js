app.factory('sessionService', function ($resource) {
    return $resource('http://localhost:5000/sessions/:sessionId');
});