module.exports = {
	"extends": [
		"airbnb-base", 
		"plugin:prettier/recommended",
		"plugin:flowtype/recommended"
	],
	"plugins": [
	    "flowtype"
	],
	"globals": {
		"$": true
	},
	"rules": {
		"import/no-webpack-loader-syntax": 0,
		"no-eval": ["error", {"allowIndirect": true}] // default is false
	}
};