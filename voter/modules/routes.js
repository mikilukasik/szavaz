var initRouter = function (router, app) {
  router.use(function (req, res, next) {
    next(); // make sure we go to the next routes and don't stop here
  });
  router.get('/', function (req, res) {
    res.json({
      message: 'hooray! welcome to our api!'
    });
  });
  app.use('/api', router);

  ////////////////////////  login  ///////////////////////

  router.route('/login')
    .post(function (req, res) {
       //register
      
      var username = req.body.username;
      var password = req.body.password;

      

        dbFuncs.findOne('logins',{ _id: username}, function(foundDoc){
          if(foundDoc){
            //username exists
            res.json({
              toast: {
                type: 'error',
                text: 'Username exists.'
              },
              result: 'Username exists.',
              error: true

            })
          } else {
            //new user
            bcrypt.hash(password, 10, function (err, hash) {
              var userObj = {
                _id: username,
                //username: username,
                passwordHash: hash
              };
              dbFuncs.insert('logins',userObj,function(insertedDoc){
                res.json({
                  toast: {
                    type: 'success',
                    text: 'User registered.'
                  },
                  result: 'User registered.',
                  success:true
                })
              });
            })
          };
        });

    });


        // bcrypt.compare(password, hash, function (erru, resu) {
        //   // res === true
        //   res.json({
        //       username: username,
        //       password: password,
        //       //salt: salt,
        //       hash: hash,
        //       res: resu
        //     }) //
        // });



  //////////////  questions     /////////////////////

  router.route('/questions')
    .post(function (req, res) {
      var question = req.body.question;
      var header = req.body.header;

      dbFuncs.insert('questions', {
        header: header,
        question: question,
        promoteUp: 0,
        promoteDown: 0,
        voteUp: 0,
        voteDown: 0,
        votable: false
      }, function () {
        res.json({
            inserted: question
          }) //
      })
    });

  router.route('/promotions')
    .post(function (req, res) {
      var questionId = req.body.questionId;
      var clientMongoId = req.body.clientMongoId;
      var promoting = req.body.promoting;
      dbFuncs.update('clients', {
        _id: new dbFuncs.ObjectID(clientMongoId)
      }, function (client) {
        var existingPromotion = (_.find(client.promotions, function (promotion) {
          return (promotion.questionId === questionId)
        }))
        if (existingPromotion) {
          console.log('user already promoted, promotion:', existingPromotion)
          if (existingPromotion.promoting) {
            //user already promoted up
            if (promoting) {
              res.json({
                toast: {
                  type: 'error',
                  text: 'You already promoted up this question.'
                },
                result: 'User already promoted up this question.'
              })
            } else {
              //change promotion down//
              existingPromotion.promoting = false;
              dbFuncs.update('questions', {
                _id: dbFuncs.ObjectID(questionId)
              }, function (question) {
                question.promoteUp--
                  question.promoteDown++
                  res.json({
                    toast: {
                      type: 'success',
                      text: 'Promotion changed to negative.'
                    },
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
              }, function (question) {
                question.promoteUp++
                  question.promoteDown--
                  res.json({
                    toast: {
                      type: 'success',
                      text: 'Promotion changed to positive.'
                    },
                    result: 'Promotion changed to positive.'
                  })
              })
            } else {
              res.json({
                toast: {
                  type: 'error',
                  text: 'You already promoted down this question.'
                },
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
          }, function (question) {
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

  router.route('/votes')
    .post(function (req, res) {
      var questionId = req.body.questionId;
      var clientMongoId = req.body.clientMongoId;
      var voting = req.body.voting;
      dbFuncs.update('clients', {
        _id: new dbFuncs.ObjectID(clientMongoId)
      }, function (client) {
        var existingVote = (_.find(client.votes, function (vote) {
          return (vote.questionId === questionId)
        }))
        if (existingVote) {
          console.log('user already voted, vote:', existingVote)
          if (existingVote.voting) {
            //user already voted up
            if (voting) {
              res.json({
                
                toast: {
                  type: 'error',
                  text: 'You already voted YES to this question.'
                },
                result: 'User already voted up this question.'
              })
            } else {
              //change promotion down//
              existingVote.voting = false;
              dbFuncs.update('questions', {
                _id: dbFuncs.ObjectID(questionId)
              }, function (question) {
                question.voteUp--
                  question.voteDown++
                  res.json({
                    toast: {
                      type: 'success',
                      text: 'Vote changed to NO.'
                    },
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
              }, function (question) {
                question.voteUp++
                  question.voteDown--
                  res.json({
                    toast: {
                      type: 'success',
                      text: 'Vote changed to YES.'
                    },
                    result: 'Vote changed to positive.'
                  })
              })
            } else {
              res.json({
                toast: {
                  type: 'error',
                  text: 'You already voted NO to this question.'
                },
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
          }, function (question) {
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
  router.route('/client-mongo-id/:hardWareId')
    .get(function (req, res) {

      var hardWareId = req.params.hardWareId;

      if (hardWareId === 'newBrowser') {
        hardWareId = 'some browser ' + Math.random();
      };

      dbFuncs.findOne('clients', {
        hardWareId: hardWareId
      }, function (myRecord) {
        if (!myRecord) {

          //new client
          dbFuncs.insert('clients', {

            hardWareId: req.params.hardWareId,
            promotions: [{}],
            votes: [{}],
            preferences: {

            },

          }, function (myNewRecord) {
            res.json({
              clientMongoId: myNewRecord._id
            })
          })
        } else {
          console.log('known client', myRecord)
            //known client
          res.json({
            clientMongoId: myRecord._id
          })
        }
      })
    });

  router.route('/sessions/:sessionId')
    .get(function (req, res) {

      var sessionId = req.params.sessionId;

      res.json({
        ok: 1
      })

    });

  router.route('/client-mongo-id/:clientMongoId')
    .put(function (req, res) {

      var clientMongoId = req.params.clientMongoId;

      dbFuncs.findOne('clients', {
        _id: new dbFuncs.ObjectID(clientMongoId)
      }, function (myRecord) {
        if (!myRecord) {
          //send res error
          res.status(500)
            .send('Unknown clientMongoId, please send hardWareId');

        } else {
          console.log('known client checking in..', myRecord)
            //known client
          res.json({
            clientMongoId: myRecord._id
          })
        }
      })
    });

  router.route('/client-mongo-id/:clientMongoId')
    .post(function (req, res) {
      //TODO: replace this function with real one////
      dbFuncs.update('clients', {
        _id: new dbFuncs.ObjectID(req.params.clientMongoId)
      }, function (myRecord) {
        if (!myRecord) {
          dbFuncs.insert('clients', {
            _id: req.params.clientMongoId,
            promotions: [],
            votes: []
          }, function (myNewRecord) {
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

  router.route('/questions/votables')
    .get(function (req, res) {
      dbFuncs.query('questions', {
        votable: true
      }, function (questions, saver) {
        res.json(questions)
      })
    });
  router.route('/questions/promotables')
    .get(function (req, res) {
      dbFuncs.query('questions', {
        votable: false
      }, function (questions, saver) {
        res.json(questions)
      })
    });
  router.route('/questions/:questionID')
    .get(function (req, res) {
      dbFuncs.findOne('questions', {
        _id: new dbFuncs.ObjectID(req.params.questionID)
      }, function (question) {
        res.json(question)
      })
    });
  router.route('/questions/:questionID')
    .put(function (req, res) {
      dbFuncs.update('questions', {
        _id: new dbFuncs.ObjectID(req.params.questionID)
      }, function (question) {
        question.votable = true;
        res.json(question)
      })
    });
}
