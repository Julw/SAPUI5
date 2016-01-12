jQuery.sap.declare("hcm.mytimesheet.ZHCM_TSH_MAN.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "hcm.mytimesheet",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/HCM_TSH_MAN"
	// we use a URL relative to our own component
	// extension application is deployed with customer namespace
});

this.hcm.mytimesheet.Component.extend("hcm.mytimesheet.ZHCM_TSH_MAN.Component", {
	metadata: {
		version: "1.0",

		config: {
		     "sap.ca.i18Nconfigs": {
       bundleName:"hcm.mytimesheet.ZHCM_TSH_MAN.i18n.i18n"
       }
		},

		customizing: {
    "sap.ui.controllerExtensions": {
        "hcm.mytimesheet.view.S3": {
            controllerName: "hcm.mytimesheet.ZHCM_TSH_MAN.view.S3Custom"
        }
    }
}
	}
});