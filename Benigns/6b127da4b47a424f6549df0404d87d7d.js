define(["lib/knockout", "legacy/bridge", 'legacy/events', "jsCommon/oobe-gesture-manager", "legacy/core", "winjs/ui"], (ko, bridge, constants, gestureManager, core) => {
    class EnterpriseProvisioningDlgViewModel {
        constructor(params, element) {
            this.dlgContent = ko.observable("");
            this.dlgCtrl = null;

            this.loadPromise = bridge.invoke("CloudExperienceHost.StringResources.makeResourceObject", "oobeProvisioningEntry").then((result) => {
                this.resourceStrings = JSON.parse(result);
                return WinJS.UI.processAll(element).done(() => {
                    this.dlgCtrl = element.querySelector(".win-contentdialog").winControl;
                });
            }, (err) => {
                bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "getOobeEnterpriseProvisioningDialogStringResourcesFailure", core.GetJsonFromError(err));
            });
        }

        onAfterHide(ev) {
            if (ev.detail.result == WinJS.UI.ContentDialog.DismissalResult.primary) {
                bridge.fireEvent(constants.Events.done, "OobeProvisioningEntry");
            }
        }

        onAfterShow(ev) {
            document.querySelector(".win-contentdialog-primarycommand").focus();
        }

        showDialog() {
            this.loadPromise.then(() => {
                this.dlgContent(this.resourceStrings.ProvisioningConfirmationContent);
                this.dlgCtrl.title = this.resourceStrings.ProvisioningConfirmationDialogTitle;
                this.dlgCtrl.primaryCommandText = this.resourceStrings.ProvisioningConfirmationAcceptButton;
                this.dlgCtrl.secondaryCommandText = this.resourceStrings.ProvisioningConfirmationCancelButton;
                this.dlgCtrl.addEventListener("afterhide", this.onAfterHide);
                this.dlgCtrl.addEventListener("aftershow", this.onAfterShow);

                this.dlgCtrl.show();
            });
        }

    }
    return EnterpriseProvisioningDlgViewModel;
});