/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Fiori_Poc/MyWebIdeProject/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});