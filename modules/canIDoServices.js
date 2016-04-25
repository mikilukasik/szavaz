var canIDoServices = function (params) {		//class

	this.clientMongoId = params.clientMongoId;
	this.questionId = params.questionId
	
	this.previousVoteChecked = false;
	this.previousPromotionChecked = false;

	this.previousVote = '';				//	'yes' or 'no' or ''
	this.previousPromotion = '';	//	'up' or 'down' or ''

	this.checkPreviousVote = function () {
		if (previousVoteChecked) return;
		//TODO: check previous vote with seneca

	};
	this.checkPreviousPromotion = function () {
		if (previousPromotionChecked) return;
		//TODO: check previous promotion with seneca

	};


  this.alreadyVoted: {
  	yes: function () {
  		this.checkPreviousVote();
  		return this.previousVote === 'yes';
  	},
  	no: function () {
  		this.checkPreviousVote();
  		return this.previousVote === 'no';

  	}
  }

  this.alreadyPromoted: {
  	up: function () {
  		this.checkPreviousPromotion();
  		return this.previousPromotion === 'up';
  		
  	},
  	down: function () {
  		this.checkPreviousPromotion();
  		return this.previousPromotion === 'down';
  		
  	}
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