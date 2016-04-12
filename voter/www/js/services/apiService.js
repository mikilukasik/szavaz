app.factory('apiService', function($http) {
  return {
    postQuestion: function(question) {
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
        url: '/api/client-mongo-id/' + hardWareId,
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