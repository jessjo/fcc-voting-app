'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.GITHUB_KEY,
		'clientSecret': process.env.GITHUB_SECRET,
		'callbackURL': process.env.APP_URL + 'auth/github/callback'
	}
};

/**
module.exports = {
  "db": “YOUR_ORCHESTRATE_API_KEY”
}
**/