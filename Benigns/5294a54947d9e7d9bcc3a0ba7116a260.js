//
// Copyright (C) Microsoft. All rights reserved.
//
(function () {
    "use strict";
    var resources = {};
    var bridge = new CloudExperienceHost.Bridge();
    var validator = new uiHelpers.Validator();
    var errorClass = new uiHelpers.ErrorUI();
    WinJS.UI.Pages.define("/views/nointernet.html", {
        init: function (element, options) {
            var languagePromise = bridge.invoke("CloudExperienceHost.Globalization.Language.getPreferredLang").then(function (preferredLang) {
                _htmlRoot.setAttribute("lang", preferredLang);
            }, function () { });
            var dirPromise = bridge.invoke("CloudExperienceHost.Globalization.Language.getReadingDirection").then(function (dirVal) {
                _htmlRoot.setAttribute("dir", dirVal);
            }, function () { });
            let getLocalizedStringsPromise = bridge.invoke("CloudExperienceHost.StringResources.makeResourceObject", 'errors').then((resourceStrings) => {
                this.resources = JSON.parse(resourceStrings);
            });
            let cssPromise = uiHelpers.LoadCssPromise(document.head, "..", bridge);
            return WinJS.Promise.join({ languagePromise: languagePromise, dirPromise: dirPromise, getLocalizedStringsPromise: getLocalizedStringsPromise, cssPromise: cssPromise });
        },
        ready: function (element, options) {
            Title.textContent = this.resources.NoNetworkMsaTitle;
            SubHeader.textContent = this.resources.NoNetworkMsaText;
            RetryButton.textContent = this.resources.Retry;

            RetryButton.addEventListener("click", function () {
                bridge.fireEvent(CloudExperienceHost.Events.done, CloudExperienceHost.AppResult.success);
            });

            bridge.fireEvent(CloudExperienceHost.Events.visible, true);
        },
    });
})();
