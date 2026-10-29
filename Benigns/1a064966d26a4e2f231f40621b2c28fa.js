

"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    var LocalAccount;
    (function (LocalAccount) {
        function createLocalAccount(username, password, passwordhint) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch, progressDispatch) {
                if ((password == null) || (password === "")) {
                    
                    var localAccountManager = new CloudExperienceHostBroker.Account.LocalAccountManager();
                    localAccountManager.createLocalAccountAsync(username, null, passwordhint)
                        .done(function () { completeDispatch(); }, function (err) { errorDispatch(err); }, function (progress) { progressDispatch(progress); });
                }
                else {
                    var provider = new Windows.Security.Cryptography.DataProtection.DataProtectionProvider("local=user");
                    var binary = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(password, Windows.Security.Cryptography.BinaryStringEncoding.utf8);

                    
                    provider.protectAsync(binary).then(function (protectedData) {
                        var localAccountManager = new CloudExperienceHostBroker.Account.LocalAccountManager();
                        return localAccountManager.createLocalAccountAsync(username, protectedData, passwordhint); })
                        .done(function () { completeDispatch(); }, function (err) { errorDispatch(err); }, function (progress) { progressDispatch(progress); });
                }
            });
        }
        LocalAccount.createLocalAccount = createLocalAccount;

        function createRetailAccount(password, isAdmin) {
            return new WinJS.Promise(function (completeDispatch, errorDispatch) {
                var localAccountManager = new CloudExperienceHostBroker.Account.LocalAccountManager();
                if ((password == null) || (password === "")) {
                    localAccountManager.createRetailAccountAsync(null, isAdmin).done(completeDispatch, errorDispatch);
                } else {
                    var provider = new Windows.Security.Cryptography.DataProtection.DataProtectionProvider("local=user");
                    var binary = Windows.Security.Cryptography.CryptographicBuffer.convertStringToBinary(password, Windows.Security.Cryptography.BinaryStringEncoding.utf8);
                    provider.protectAsync(binary).then(function (protectedData) {
                        return localAccountManager.createRetailAccountAsync(protectedData, isAdmin);
                    }).done(completeDispatch, errorDispatch);
                }
            });
        }
        LocalAccount.createRetailAccount = createRetailAccount;

        
        function localizedStrings() {
            var localAccountResources = {};
            var keyList = ['Title', 'LeadText', 'UserNameLegend', 'UserPlaceholder', 'PasswordLegend', 'PasswordPlaceholder', 'ReenterPlaceholder', 'HintPlaceholder',
                 'LocalUser_NoUsername_Error', 'Username_Too_Long', 'UserEmpty_Error_Title', 'Username_Error', 'UsernameContainsAt_Error', 'UserExists_Error', 'UserReserved_Error', 'UserIsComputer_Error_Title',
                 'PasswordHint_Empty_Error', 'PasswordHint_Invalid_Error', 'PasswordConfirm_Error', 'PasswordPolicy_Error', 'Error_Creating_Account_Warning', 'BackButton', 'NextButton', 'VoiceOver'];
            var i = 0;
            for (i = 0; i < keyList.length; i++) {
                var resourceId = '/localAccount/' + keyList[i];
                localAccountResources[keyList[i]] = WinJS.Resources.getString(resourceId).value;
            }
            return JSON.stringify(localAccountResources);
        }
        LocalAccount.localizedStrings = localizedStrings;
    })(CloudExperienceHost.LocalAccount || (CloudExperienceHost.LocalAccount = {}));
})(CloudExperienceHost || (CloudExperienceHost = {}));
