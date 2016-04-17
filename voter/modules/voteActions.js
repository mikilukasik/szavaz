module.exports = function(options) {
  dbFuncs = options.dbFuncs;
  _ = options._

  var seneca = this;

  seneca.add({
    role: 'vote',
    cmd: 'vote'
  }, vote);

  seneca.add({
    role: 'vote',
    cmd: 'promote'
  }, promote);

  seneca.add({
    role: 'vote',
    cmd: 'escalate'
  }, escalate);

  function escalate(args, done) {
    var req = args.req;

    dbFuncs.update('questions', {
      _id: new dbFuncs.ObjectID(req.params.questionID)
    }, function(question) {
      question.votable = true;
      done(null, {
        toast: {
          type: 'success',
          text: 'Question escalated.'
        },
        result: 'Question escalated.',
        success: true
      })
    })

  }

  function promote(args, done) {
    var req = args.req;

    var questionId = req.body.questionId;
    var clientMongoId = req.body.clientMongoId;
    var promoting = req.body.promoting;

    dbFuncs.update('clients', {
      _id: new dbFuncs.ObjectID(clientMongoId)
    }, function(client) {
      var existingPromotion = (_.find(client.promotions, function(promotion) {
        return (promotion.questionId === questionId)
      }))
      if (existingPromotion) {
        console.log('user already promoted, promotion:', existingPromotion)
        if (existingPromotion.promoting) {
          //user already promoted up
          if (promoting) {
            done(null, {
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
            }, function(question) {
              question.promoteUp--
                question.promoteDown++
                done(null, {
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
            }, function(question) {
              question.promoteUp++
                question.promoteDown--
                done(null, {
                  toast: {
                    type: 'success',
                    text: 'Promotion changed to positive.'
                  },
                  result: 'Promotion changed to positive.'
                })
            })
          } else {
            done(null, {
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
        }, function(question) {
          if (promoting) {
            question.promoteUp++
              done(null, {
                result: 'Positive promotion registered.'
              })
          } else {
            question.promoteDown++
              done(null, {
                result: 'Negative promotion registered.'
              })
          }
        })
      }
    })
  };

  function vote(args, done) {

    var req = args.req;

    var questionId = req.body.questionId;
    var clientMongoId = req.body.clientMongoId;
    var voting = req.body.voting;
    dbFuncs.update('clients', {
      _id: new dbFuncs.ObjectID(clientMongoId)
    }, function(client) {
      var existingVote = (_.find(client.votes, function(vote) {
        return (vote.questionId === questionId)
      }))
      if (existingVote) {
        console.log('user already voted, vote:', existingVote)
        if (existingVote.voting) {
          //user already voted up
          if (voting) {
            done(null, {

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
            }, function(question) {
              question.voteUp--
                question.voteDown++
                done(null, {
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
            }, function(question) {
              question.voteUp++
                question.voteDown--
                done(null, {
                  toast: {
                    type: 'success',
                    text: 'Vote changed to YES.'
                  },
                  result: 'Vote changed to positive.'
                })
            })
          } else {
            done(null, {
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
        }, function(question) {
          if (voting) {
            question.voteUp++
              done(null, {
                result: 'Positive vote registered.'
              })
          } else {
            question.voteDown++
              done(null, {
                result: 'Negative vote registered.'
              })
          }
        })
      }
    })
  };

}