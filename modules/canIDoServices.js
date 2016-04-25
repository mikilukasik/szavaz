var canIDoServices = function(params) { //class

  var services = this;

  this.clientMongoId = new dbFuncs.ObjectId( params.clientMongoId );
  this.questionId = new dbFuncs.ObjectId( params.questionId );

  this.client = params.client;        //normally undefined
  this.question = params.question;

  this.getQuestion = function() {
    return new Promise(function(resolve, reject) {
      dbFuncs.findOne('questions', {
        _id = this.questionId
      }, function(questionDoc) {
        this.question = questionDoc;
        resolve();
      });
    });
  };
  this.getClient = function() {
    return new Promise(function(resolve, reject) {
      dbFuncs.findOne('clients', {
        _id = new this.clientMongoId
      }, function(clientDoc) {
        this.client = clientDoc;
        resolve();
      });
    });
  };

  this.previousVote = function() {
    
    var previousVote = _.find(clientDoc.votes,function(vote){ return vote.questionId === this.questionId });
    if (previousVote){

      switch (previousVote.voting) {
        case true: return 'yes';
        case false: return 'no';
      };
      
    }
    
  };
  this.previousPromotion: function() {
   
    var previousPromotion = _.find(clientDoc.promotions,function(promotion){ return promotion.questionId === this.questionId });
    if (previousPromotion){

      switch (previousPromotion.promoting) {
        case true: return 'up';
        case false: return 'down';
      };
      
    }
   
  };

  this.alreadyVotedYes: function() {
    return services.previousVote === 'yes';
  };
  this.alreadyVotedNo: function() {
    return services.previousVote === 'no';
  };
  
  this.alreadyPromotedUp: function() {
    return services.previousPromotion === 'up';
  };
  this.alreadyPromotedDown: function() {
    return services.previousPromotion === 'down';
  };
  this.hasEnoughUserLevelToVoteYes: function() {

  };
  this.hasEnoughUserLevelToVoteNo: function() {

  };
  this.hasEnoughUserLevelToPromoteUp: function() {

  };
  this.hasEnoughUserLevelToPromoteDown: function() {

  };
  this.hasEnoughUserLevelToPostQuestion: function() {

  };
  this.hasEnoughUserLevelToRemoveQuestion: function() {

  };
  this.hasEnoughUserLevelToForceEscalateQuestion: function() {

  };
  this.hasEnoughCreditToVoteYes: function() {

  };
  this.hasEnoughCreditToVoteNo: function() {

  };
  this.hasEnoughCreditToPromoteUp: function() {

  };
  this.hasEnoughCreditToPromoteDown: function() {

  };
  this.hasEnoughCreditToPostQuestion: function() {

  };
  this.hasEnoughCreditToRemoveQuestion: function() {

  };
  this.hasEnoughCreditToForceEscalateQuestion: function() {

  }
}