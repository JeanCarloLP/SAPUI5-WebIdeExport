sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/ResizeHandler",
	"sap/f/FlexibleColumnLayout"
], function (Controller, ResizeHandler, FlexibleColumnLayout) {
	"use strict";

	return Controller.extend("Fiori_Poc.MyWebIdeProject.controller.App", {
		
		//----------------------------------------- Main LyfeCycle Methods ----------------------------------------------- 
		
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRouteMatched(this.onRouteMatched, this);
			this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
			ResizeHandler.register(this.getView().byId("App"), this._onResize.bind(this));
		},
		
		onBeforeRouteMatched: function(oEvent) {
			var oModel = this.getOwnerComponent().getModel();
			var sLayout = oEvent.getParameters().arguments.layout;

			if (!sLayout) {
				var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
				sLayout = oNextUIState.layout;
			}

			if (this.currentRouteName === "master") { // last viewed route was Master
				var oMasterView = this.oRouter.getView("Fiori_Poc.MyWebIdeProject.view.Master");
				this.getView().byId("App").removeBeginColumnPage(oMasterView);
			}

			if (sLayout) {
				oModel.setProperty("/layout", sLayout);
			}
		},
		
		onRouteMatched: function (oEvent) {
			var sRouteName = oEvent.getParameter("name"),
				oArguments = oEvent.getParameter("arguments");

			this._updateUIElements();

			this.currentRouteName = sRouteName;
			this.currentContract = oArguments.contract;
			this.currentRoom = oArguments.room;
			this.currentItem = oArguments.item;
			this.currentList = oArguments.list;
		},
		
		onStateChanged: function (oEvent) {
			var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
				sLayout = oEvent.getParameter("layout");
			this._updateUIElements();

			if (bIsNavigationArrow) {
			
				this.oRouter.navTo( this.currentRouteName, {
					contract: this.currentContract,
					room: this.currentRoom,
					list: this.currentList,
					item: this.currentItem,
					layout: sLayout
				}, true
			);
			}
		},
		
		onExit: function () {
			this.oRouter.detachRouteMatched(this.onRouteMatched, this);
			this.oRouter.detachBeforeRouteMatched(this.onBeforeRouteMatched, this);
		},
		
		//--------------------------------------------- Private Methods --------------------------------------------------- 
		
		_onResize: function(oEvent) {
			var bPhone = (oEvent.size.width < FlexibleColumnLayout.TABLET_BREAKPOINT);
			this.getOwnerComponent().getModel().setProperty("/isPhone", bPhone);
		},

		_updateUIElements: function () {
			var oModel = this.getOwnerComponent().getModel();
			var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
			oModel.setData(oUIState, true);
		}

	});
});