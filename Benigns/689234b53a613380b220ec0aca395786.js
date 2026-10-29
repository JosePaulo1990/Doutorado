//
// Copyright (C) Microsoft. All rights reserved.
//
/// <disable>JS2085.EnableStrictMode</disable>
"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var MobileExperience;
    (function (MobileExperience) {
        function setMobileExperienceOptIn() {
            let mobileExperienceManager = new ContentManagement.ContentManagementBroker();
            mobileExperienceManager.mobilityExperienceSettings.optedIn = true;
        }
        MobileExperience.setMobileExperienceOptIn = setMobileExperienceOptIn;
    })(MobileExperience = CloudExperienceHost.MobileExperience || (CloudExperienceHost.MobileExperience = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
