//
// Copyright (C) Microsoft. All rights reserved.
//
(() => {
    require.config(new RequirePathConfig('/webapps/inclusiveOobe'));
    require(['lib/knockout', 'jsCommon/knockout-helpers', 'legacy/bridge', 'legacy/events', 'legacy/uiHelpers'], (ko, KoHelpers, bridge, constants, uiHelpers) => {
        WinJS.UI.Pages.define("/webapps/inclusiveSspr/view/ssprerror-main.html", {
            init: (element, options) => {
                // Load css per scenario
                let loadCssPromise = uiHelpers.LoadCssPromise(document.head, "../../..", bridge);

                let langAndDirPromise = uiHelpers.LangAndDirPromise(document.documentElement, bridge);

                let hasInternetAccessPromise = bridge.invoke("CloudExperienceHost.Environment.hasInternetAccess").done(function (connected) {
                    this.hasInternetAccess = connected;
                });

                let getLocalizedStringsPromise = bridge.invoke("CloudExperienceHost.StringResources.makeResourceObject", 'errors').then((resourceStrings) => {
                    this.resources = JSON.parse(resourceStrings);
                });

                return WinJS.Promise.join({ loadCssPromise: loadCssPromise, langAndDirPromise: langAndDirPromise, hasInternetAccessPromise: hasInternetAccessPromise, getLocalizedStringsPromise: getLocalizedStringsPromise });
            },
            error: (e) => {
                // We don't want to try loading the error page again here, hence we report fail and handle it in appmanager
                bridge.fireEvent(constants.Events.done, constants.AppResult.fail);
            },
            ready: (element, options) => {
                require.config(new RequirePathConfig('/webapps/inclusiveSspr'));
                require(['ssprerror-vm'], (SsprErrorViewModel) => {
                    koHelpers = new KoHelpers();
                    koHelpers.registerCustomComponents();
                    window.KoHelpers = KoHelpers;

                    // Apply bindings and show the page
                    let vm = new SsprErrorViewModel(this.resources, this.hasInternetAccess);
                    ko.applyBindings(vm);
                    KoHelpers.waitForInitialComponentLoadAsync().then(() => {
                        WinJS.Utilities.addClass(document.body, "pageLoaded");
                        bridge.fireEvent(constants.Events.visible, true);
                        KoHelpers.setFocusOnAutofocusElement();
                        vm.startVoiceOver();
                    });
                });
            }
        });
    });
})();