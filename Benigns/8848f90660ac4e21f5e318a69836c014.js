//
// Copyright (C) Microsoft. All rights reserved.
//
/// <disable>JS2085.EnableStrictMode</disable>
"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var OneDrive;
    (function (OneDrive) {
        function setOobeOneDriveOptin(optinValue) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch, progressDispatch) {
                let oobeOneDriveOptin = new CloudExperienceHostBroker.SyncEngine.OOBEOneDriveOptin();
                oobeOneDriveOptin.setOOBEOneDriveOptinAsync(optinValue)
                    .done(function () { completeDispatch(); }, function (err) { errorDispatch(err); }, function (progress) { progressDispatch(progress); });
            });
        }
        OneDrive.setOobeOneDriveOptin = setOobeOneDriveOptin;

        function getOobeOneDriveOptin() {
            let oobeOneDriveOptin = new CloudExperienceHostBroker.SyncEngine.OOBEOneDriveOptin();
            return oobeOneDriveOptin.getOOBEOneDriveOptin();
        }
        OneDrive.getOobeOneDriveOptin = getOobeOneDriveOptin;

        function writeTargetingIdentifierAsync(identifier) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch, progressDispatch) {
                let oobeOneDriveOptin = new CloudExperienceHostBroker.SyncEngine.OOBEOneDriveOptin();
                oobeOneDriveOptin.writeTargetingIdentifierAsync(identifier)
                    .done(function () { completeDispatch(); }, function (err) { errorDispatch(err); }, function (progress) { progressDispatch(progress); });
            });
        }
        OneDrive.writeTargetingIdentifierAsync = writeTargetingIdentifierAsync;

        function writeUserIntentForOfficeAsync(user, intent) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch, progressDispatch) {
                let oobeOneDriveOptin = new CloudExperienceHostBroker.SyncEngine.OOBEOneDriveOptin();
                oobeOneDriveOptin.writeUserIntentForOfficeAsync(user, intent)
                    .done(function () { completeDispatch(); }, function (err) { errorDispatch(err); }, function (progress) { progressDispatch(progress); });
            });
        }
        OneDrive.writeUserIntentForOfficeAsync = writeUserIntentForOfficeAsync;

        function isAppPackageProvisionedAsync(packageFamilyName) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch, progressDispatch) {
                CloudExperienceHostAPI.UtilStatics.isAppPackageProvisionedAsync(packageFamilyName)
                    .done(function (result) { completeDispatch(result); }, function(err) { errorDispatch(err); }, function(progress) { progressDispatch(progress); });
            });
        }
        OneDrive.isAppPackageProvisionedAsync = isAppPackageProvisionedAsync;

    })(CloudExperienceHost.OneDrive || (CloudExperienceHost.OneDrive = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
