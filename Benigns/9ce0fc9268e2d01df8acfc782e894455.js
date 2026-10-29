//
// Copyright (C) Microsoft. All rights reserved.
//

define(['legacy/appViewManager', 'legacy/core'], (appViewManager, core) => {
    class HostedApplication {
        static _onResize(param) {
            try {
                let newClientRect = appViewManager.getBoundingClientRect();
                
                let newRect = {
                    height: newClientRect.height,
                    width: newClientRect.width,
                    x: newClientRect.left, 
                    y: newClientRect.top 
                };
                let hostedApplicationManager = CloudExperienceHostAPI.HostedApplication.getForCurrentView();
                let currentLocation = hostedApplicationManager.windowLocation;
                if (newRect !== currentLocation) {
                    hostedApplicationManager.windowLocation = newRect;
                }
            }
            catch (error) {
                CloudExperienceHost.Telemetry.logEvent("showHostedAppAsyncNodePositionUpdateFailure", core.GetJsonFromError(error));
            }
        }

        launchAsyncWithNavigationCompletedCallback(currentNode, callback) {
            if (currentNode && currentNode.appUserModelId) {
                let clientRect = appViewManager.getBoundingClientRect();
                // The experience manager used by the HostedApplication class internally scales the height & width, but not the x & y.
                // So we scale x and y here
                let rect = {
                    height: clientRect.height,
                    width: clientRect.width,
                    x: clientRect.left,
                    y: clientRect.top
                };
                let showAppPromise = CloudExperienceHostAPI.HostedApplication.showHostedAppAsync(currentNode.appUserModelId, rect).then(function (hostedApplicationResult) {
                    window.removeEventListener("resize", HostedApplication._onResize);
                    return hostedApplicationResult.exitResult;
                }, function (error) {
                    window.removeEventListener("resize", HostedApplication._onResize);
                    CloudExperienceHost.Telemetry.logEvent("showHostedAppAsyncFailure", core.GetJsonFromError(error));
                    return CloudExperienceHost.AppResult.fail;
                });
                window.addEventListener("resize", HostedApplication._onResize);
                appViewManager.dimChrome();
                let navigationCompletedEventArgs = new Object(); // Need to implement INavigationCompletedEventArgs
                navigationCompletedEventArgs.isSuccess = true; // boolean
                navigationCompletedEventArgs.webErrorStatus = Windows.Web.WebErrorStatus.unknown; // Windows.Web.WebErrorStatus
                navigationCompletedEventArgs.uri = "hostedapplication://" + currentNode.appUserModelId; // string
                callback(navigationCompletedEventArgs);
                return showAppPromise;
            }
            else {
                CloudExperienceHost.Telemetry.logEvent("showHostedAppAsyncNodeMisconfiguration", JSON.stringify(currentNode));
                return CloudExperienceHost.AppResult.fail;
            }
        }
    }
    return HostedApplication;
});