//
// Copyright (C) Microsoft. All rights reserved.
//

define(['legacy/core'], (core) => {
    class OobeTelemetryFlush {
        launchAsync() {
            try
            {
                // If the dynamic node feature is disabled, there won't be any telemetry to fire, therefore skip. Also skip if there is no internet access.
                if (!(AppObjectFactory.getInstance().getObjectFromString("CloudExperienceHost.FeatureStaging").isOobeFeatureEnabled("OobeDynamicNodes")
                    && CloudExperienceHost.Environment.hasInternetAccess())) {
                    return WinJS.Promise.as(CloudExperienceHost.AppResult.abort);
                }

                // These are hardcoded here as OOBE runs before any of the other mechanisms we would use to determine
                // what placement id to use for internal vs external. 
                // Please reference onecoreuap\shell\contentdeliverymanager\utils\inc\TargetedContentConfiguration.h
                let internalSubscriptionId = "314566";
                let externalSubscriptionId = "314567";
                let currentSubscriptionId;

                // Internal content should only ever be enabled on internal branches, so we use FeatureStaging/Velocity to enforce that
                if (AppObjectFactory.getInstance().getObjectFromString("CloudExperienceHost.FeatureStaging").isOobeFeatureEnabled("OobeInternalContent")) {
                    currentSubscriptionId = internalSubscriptionId;
                }
                else {
                    currentSubscriptionId = externalSubscriptionId;
                }
                
                return CloudExperienceHostAPI.ContentDeliveryManagerHelpers.flushReportedInteractionsAsync(currentSubscriptionId).then(function () {
                    CloudExperienceHost.Telemetry.logEvent("oobeTelemetryFlushSucceeded");
                    return CloudExperienceHost.AppResult.success;
                }, function (err) {
                    CloudExperienceHost.Telemetry.logEvent("oobeTelemetryFlushAsyncOperationFailure", core.GetJsonFromError(err));
                    return CloudExperienceHost.AppResult.fail;
                });
            }
            catch (err) {
                CloudExperienceHost.Telemetry.logEvent("oobeTelemetryFlushFailure", core.GetJsonFromError(err));
                return WinJS.Promise.as(CloudExperienceHost.AppResult.fail);
            }
        }
    }
    return OobeTelemetryFlush;
});