var initRouter = function(router, app) {
  router.use(function(req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
  });
  router.get('/', function(req, res) {
    res.json({
      message: 'hooray! welcome to our api!'
    });
  });
  app.use('/api', router);
  router.route('/questions').post(function(req, res) {
    var question = req.body.question;
    dbFuncs.insert('questions', {
      question: question,
      promoteUp: 0,
      promoteDown: 0,
      voteUp: 0,
      voteDown: 0,
      votable: false
    }, function() {
      res.json({
          inserted: question
        }) //
    })
  });
  router.route('/promotions').post(function(req, res) {
    var questionId = req.body.questionId;
    var clientMongoId = req.body.clientMongoId;
    var promoting = req.body.promoting;
    dbFuncs.update('clients', {
      _id: new dbFuncs.ObjectID(clientMongoId)
    }, function(client) {
      var existingPromotion = (client.promotions.find(function(promotion) {
        return (promotion.questionId === questionId)
      }))
      if (existingPromotion) {
        console.log('user already promoted, promotion:', existingPromotion)
        if (existingPromotion.promoting) {
          //user already promoted up
          if (promoting) {
            res.json({
              result: 'User already promoted up this question.'
            })
          } else {
            //change promotion down//
            existingPromotion.promoting = false;
            dbFuncs.update('questions', {
              _id: dbFuncs.ObjectID(questionId)
            }, function(question) {
              question.promoteUp--
              question.promoteDown++
              res.json({
                result: 'Promotion changed to negative.'
              })
            })
          }
        } else {
          //user already promoted down
          if (promoting) {
            //change vote
            existingPromotion.promoting = true;
            dbFuncs.update('questions', {
              _id: dbFuncs.ObjectID(questionId)
            }, function(question) {
              question.promoteUp++
              question.promoteDown--
              res.json({
                result: 'Promotion changed to positive.'
              })
            })
          } else {
            res.json({
              result: 'User already promoted down this question.'
            })
          }
        }
      } else {
        console.log('first promotion')
        client.promotions.push({
          questionId: questionId,
          promoting: promoting
        })
        dbFuncs.update('questions', {
          _id: new dbFuncs.ObjectID(questionId)
        }, function(question) {
          if (promoting) {
            question.promoteUp++
            res.json({
              result: 'Positive promotion registered.'
            })
          } else {
            question.promoteDown++
            res.json({
              result: 'Negative promotion registered.'
            })
          }
        })
      }
    })
  });
  router.route('/votes').post(function(req, res) {
    var questionId = req.body.questionId;
    var clientMongoId = req.body.clientMongoId;
    var voting = req.body.voting;
    dbFuncs.update('clients', {
      _id: new dbFuncs.ObjectID(clientMongoId)
    }, function(client) {
      var existingVote = (client.votes.find(function(vote) {
        return (vote.questionId === questionId)
      }))
      if (existingVote) {
        console.log('user already voted, vote:', existingVote)
        if (existingVote.voting) {
          //user already voted up
          if (voting) {
            res.json({
              result: 'User already voted up this question.'
            })
          } else {
            //change promotion down//
            existingVote.voting = false;
            dbFuncs.update('questions', {
              _id: dbFuncs.ObjectID(questionId)
            }, function(question) {
              question.voteUp--
              question.voteDown++
              res.json({
                result: 'Vote changed to negative.'
              })
            })
          }
        } else {
          //user already voted down
          if (voting) {
            //change vote
            existingVote.voting = true;
            dbFuncs.update('questions', {
              _id: dbFuncs.ObjectID(questionId)
            }, function(question) {
              question.voteUp++
              question.voteDown--
              res.json({
                result: 'Vote changed to positive.'
              })
            })
          } else {
            res.json({
              result: 'User already voted down this question.'
            })
          }
        }
      } else {
        console.log('first vote')
        client.votes.push({
          questionId: questionId,
          voting: voting
        })
        dbFuncs.update('questions', {
          _id: new dbFuncs.ObjectID(questionId)
        }, function(question) {
          if (voting) {
            question.voteUp++
            res.json({
              result: 'Positive vote registered.'
            })
          } else {
            question.voteDown++
            res.json({
              result: 'Negative vote registered.'
            })
          }
        })
      }
    })
  });
  router.route('/client-mongo-id/:hardWareId').get(function(req, res) {
    //TODO: replace this function with real one//
    dbFuncs.update('clients', {
      hardWareId: req.params.hardWareId
    }, function(myRecord) {
      if (!myRecord) {
        dbFuncs.insert('clients', {
          hardWareId: req.params.hardWareId,
          promotions: [],
          votes: []
        }, function(myNewRecord) {
          res.json({
            clientMongoId: myNewRecord._id
          })
        })
      } else {
        res.json({
          clientMongoId: myRecord._id
        })
      }
    })
  });

  router.route('/client-mongo-id/:clientMongoId').post(function(req, res) {
    //TODO: replace this function with real one////
    dbFuncs.update('clients', {
      _id: new dbFuncs.ObjectID(req.params.clientMongoId)
    }, function(myRecord) {
      if (!myRecord) {
        dbFuncs.insert('clients', {
          _id: req.params.clientMongoId,
          promotions: [],
          votes: []
        }, function(myNewRecord) {
          res.json({
            clientMongoId: myNewRecord._id
          })
        })
      } else {
        res.json({
          clientMongoId: myRecord._id
        })
      }
    })
  });


  router.route('/questions/votables').get(function(req, res) {
    dbFuncs.query('questions', {
      votable: true
    }, function(questions, saver) {
      res.json(questions)
    })
  });
  router.route('/questions/promotables').get(function(req, res) {
    dbFuncs.query('questions', {
      votable: false
    }, function(questions, saver) {
      res.json(questions)
    })
  });
  router.route('/questions/:questionID').get(function(req, res) {
    dbFuncs.findOne('questions', {
      _id: new dbFuncs.ObjectID(req.params.questionID)
    }, function(question) {
      res.json(question)
    })
  });
  router.route('/questions/:questionID').put(function(req, res) {
    dbFuncs.update('questions', {
      _id: new dbFuncs.ObjectID(req.params.questionID)
    }, function(question) {
      question.votable = true;
      res.json(question)
    })
  });
}