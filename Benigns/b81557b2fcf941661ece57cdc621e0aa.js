
(function () {
    "use strict";

    WinJS.UI.Pages.define("/views/tokenManagerErrorHandler.html", {
        ready: function (element, options) {
            _okButton.addEventListener("click", function () {
                _okButton.disabled = true;
                var msaUIHandler = options.msaUIHandler;
                msaUIHandler.saveAuthStateAndCompleteWebFlow(
                    CloudExperienceHost.AppResult.fail,
                    null ,
                    null ,
                    null ,
                    null ,
                    null ,
                    null ,
                    null ,
                    null ,
                    options.hr,
                    options.hrInternal,
                    null );
            }.bind(options));

            WinJS.Resources.processAll().done(function () {
                var title = null;
                var body = null;
                var platform = null;

                platform = CloudExperienceHost.Environment.getPlatform();


                if (options.hasInternetAccess === false) {
                    
                    title = WinJS.Resources.getString("/errors/NoNetworkMsaTitle");
                    body = WinJS.Resources.getString("/errors/NoNetworkMsaText");
                } else {
                    
                    title = WinJS.Resources.getString("/errors/Title");
                    body = WinJS.Resources.getString("/errors/GenericMsaText");
                }

                _title.textContent = title.value;
                _errorText.textContent = body.value;
                _errorCode.textContent = options.hrInternal;
                _errorDescription.textContent = options.internalErrorDescription || null;

                if (platform === CloudExperienceHost.TargetPlatform.XBOX) {
                      _feedback.style.display = 'none';
                }
            }.bind(options));
        },
    });
})();
