app.factory('apiService', function($http, $filter, $rootScope) {
  return {
    // getSession: function(question) {
    //   var req = {
    //     method: 'POST',
    //     url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions',
      
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       question: question
    //     }
    //   }
    //   return $http(req).then(function(res) {
    //     return res.data;
    //   });
    // },
    postLogin: function(username, password) { //register
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: password
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },

    putLogin: function(username, password) { //login
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/login',
      
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          username: username,
          password: password
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },


    postQuestion: function(questionHeader, question) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) +  '/api/questions',
      
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          header: questionHeader,
          question: question
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    postPromotion: function(promotion) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/promotions',
        headers: {
          'Content-Type': 'application/json'
        },
        data: promotion
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    escalateQuestion: function(questionId) {
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    postVote: function(vote) {
      var req = {
        method: 'POST',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/votes',
        headers: {
          'Content-Type': 'application/json'
        },
        data: vote
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    getPromotables: function() {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/promotables',
       
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    getVotables: function() {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/votables',
       
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    getQuestion: function(questionId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/questions/' + questionId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    getClientMongoId: function(hardWareId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + hardWareId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    checkClientMongoId: function(clientMongoId) {
      var req = {
        method: 'PUT',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + clientMongoId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    },
    postClientMongoId: function(clientMongoId) {
      var req = {
        method: 'GET',
        url: apiServer.host + ((apiServer.port) ? (':' + apiServer.port) : ('')) + '/api/client-mongo-id/' + clientMongoId,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return $http(req).then(function(res) {
        if(res.data.toast){
          $rootScope.toastr(res.data.toast.type, res.data.toast.text)
        }
        return res.data;
      });
    }
  }
})