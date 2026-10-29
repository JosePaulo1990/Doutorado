

"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var Resources;
    (function (Resources) {
        function getString(resource, id) {
            return WinJS.Resources.getString("/" + resource + "/" + id).value;
        }
        Resources.getString = getString;
        function getStrings(resource, strings) {
            Object.keys(strings).forEach(function (id) {
                var resourceId = "/" + resource + "/" + id;
                strings[id] = WinJS.Resources.getString(resourceId).value;
            });
            return strings;
        }
        Resources.getStrings = getStrings;
    })(Resources = CloudExperienceHost.Resources || (CloudExperienceHost.Resources = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
//# sourceMappingURL=resources.js.map