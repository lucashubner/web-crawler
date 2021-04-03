const monitorAPIS = (function() {

	const apimonitor = function () {
		// What are the attributes that we are going to monitor for calls
		const attributes = {
			navigator: [
				'platform',
				'userAgent',
				'platform',
				'plugins',
				'mimeTypes',
				'doNotTrack',
				'languages',
				'productSub',
				'language',
				'vendor',
				'oscpu',
				'hardwareConcurrency',
				'cpuClass',
				'webdriver',
				'maxTouchPoints',
				'appVersion',
				'appCodeName',
				'cookieEnabled'
			]
		};

		// if it's undefined, define it.
		if (typeof window === 'undefined') {
			global.window = {}
		}

		if (typeof window.navigator === 'undefined') {
			global.window.navigator = {}
		}

		// define the structure to record calls
		window.navigator.monitorAPI =  {};

		// Object to save default values
		const originalValues = {};


		// For each attribute which will be monitored, overwrite the default behavior
		for ( let attr of Object.keys(attributes) ) {
			for ( let subAttr of attributes[attr] ) {

				// save the default attribute
				originalValues[subAttr] = window[attr][subAttr];

				// set the default to false
				window.navigator.monitorAPI[subAttr] = false;

				// Overwrite the default getter
				window.__defineGetter__(subAttr, () => {
					console.log(subAttr);
					window.navigator.monitorAPI[subAttr] = true;
					return originalValues[subAttr];
				});
			}
		}
	};

	return apimonitor;

}) ();

module.exports = {
	apimonitor : monitorAPIS,
};

