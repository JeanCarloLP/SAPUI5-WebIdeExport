sap.ui.define([
	"jquery.sap.global",
	"sap/f/FlexibleColumnLayoutSemanticHelper",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function ( jQuery, FlexibleColumnLayoutSemanticHelper, UIComponent, JSONModel ) {
	"use strict";

	return UIComponent.extend("Fiori_Poc.MyWebIdeProject.Component", {
		metadata: {
			manifest: "json"
		},

		// The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			
			//Set the main model here (before SAPUI5 1.30 now you can set directly on the manifest json)
			var oModel = new JSONModel();
			this.setModel(oModel);
			
			// enable routing
			this.getRouter().initialize();
			
			var oRootPath = jQuery.sap.getModulePath("Fiori_Poc.MyWebIdeProject");
			var oImageModel = new sap.ui.model.json.JSONModel({
				path : oRootPath
			});
			this.setModel(oImageModel, "imageModel");
		},
		
		// When we itialize the App we must return the content of the main view
		createContent: function () {
			return sap.ui.view({
				viewName: "Fiori_Poc.MyWebIdeProject.view.App",
				type: "XML"
			});
		},
		
		// Semantic Helper for Flexible Column Layout
		getHelper: function () {
			var oApp = this.getRootControl().byId("App"),
				oParams = jQuery.sap.getUriParameters(),
				oSettings = {
					defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
					mode: oParams.get("mode"),
					initialColumnsCount: oParams.get("initial"),
					maxColumnsCount: oParams.get("max")
				};
			return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oApp, oSettings);
		}
	});
}, true);