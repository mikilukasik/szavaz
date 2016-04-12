app.factory('apiService', function($http, $filter) {
  return {
    postQuestion: function(question) {
      var req = {
        method: 'POST',
        url: apiServer.host + '/api/questions',
        port: apiServer.port,
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
    postPromotion: function(promotion) {
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
    escalateQuestion: function(questionId) {
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
    postVote: function(vote) {
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
    getVotables: function() {
      var req = {
        method: 'GET',
        url: $filter('trustedUrl')(apiServer.host + ':' + apiServer.port + '/api/questions/votables'),
       
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });
    },
    getQuestion: function(questionId) {
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
    getClientMongoId: function(hardWareId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ':' + apiServer.port + '/api/client-mongo-id/' + hardWareId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        return res.data;
      });
    },
    postClientMongoId: function(clientMongoId) {
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