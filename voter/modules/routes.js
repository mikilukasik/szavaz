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
      })
    })
  });
  router.route('/promotions').post(function(req, res) {
    var question = req.body.question;
    console.log(req.body)
    res.json(req.body)
  });
  router.route('/client-mongo-id/:hardWareId').get(function(req, res) {
    //TODO: replace this function with real one
    dbFuncs.update('clients', {
      hardWareId: req.params.hardWareId
    }, function(myRecord) {
      if (!myRecord) {
        dbFuncs.insert('clients', {
          hardWareId: req.params.hardWareId
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
}