var canIDoServices = function (params) {		//class

	var clientMongoId = params.clientMongoId;
	var questionId = params.questionId
	
  this.alreadyVoted: {
  	yes: function () {},
  	no: function () {},
  },

  this.alreadyPromoted: {
  	up: function () {},
  	down: function () {},
  },

  this.hasEnoughCredit: {
  	toVote: {
  		yes: function () {},
  		no: function () {},
  	},
  	toPromote: {
  		up: function () {},
  		down: function () {},
  	},
  	toPostNewQuestion: function () {},
  	toRemoveQuestion: function () {}
  },

  this.hasEnoughUserLevel: {
  	toVote: {
  		yes: function () {},
  		no: function () {},
  	},
  	toPromote: {
  		up: function () {},
  		down: function () {},
  	},
  	toPostNewQuestion: function () {},
  	toRemoveQuestion: function () {}
  }


}