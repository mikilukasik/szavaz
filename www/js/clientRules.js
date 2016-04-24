//	user levels:
  //	
  //	0 - 4.9	: user
  //	5 - 9.9	: admin
  //	10			: developer
var rules = {

  visibleMenuItems: {

  	'Add Question': {
  		minUserLevel: 5
  	},
    'Promote Question': {
    	minUserLevel: 0
  	},
    'Vote': {
    	minUserLevel: 0
  	},
    'Login': {
    	minUserLevel: 0
  	},
    'Logoff': {
    	minUserLevel: 0
  	},
    'Developer': {
    	minUserLevel: 10
  	}

  }

}