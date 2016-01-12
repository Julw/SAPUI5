sap.ui.controller('hcm.mytimesheet.ZHCM_TSH_MAN.view.S3Custom', {
    extHookChangeHeaderFooterOptions: function (o) {
        // Place your hook implementation code here 
o.buttonList.pop();
        return o;
    },
    extHookAlterColumns: function (h) {
// Place your hook implementation code here 
console.log(h);
    }
});