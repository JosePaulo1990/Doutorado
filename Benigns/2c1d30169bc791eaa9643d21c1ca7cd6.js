//
// Copyright (C) Microsoft. All rights reserved.
//
define(["lib/knockout"], (ko) => {
    class OobeSettingsData {
        constructor() {
            //initialize the settingsData object
            this.settingsData = [];
            this.settingsObjects = [];
            //retrieve settings groups from WinRT API
            let oobeSettingsGroups;
            if (CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("CoreOobeSettings")) {
                oobeSettingsGroups = CloudExperienceHostAPI.OobeSettingsStaticsCore.getSettingGroups();
            }
            else {
                oobeSettingsGroups = CloudExperienceHostAPI.OobeSettingsStatics.getSettingGroups();
            }
            for (let oobeSettingsGroup of oobeSettingsGroups) {
                let settingsGroupModel = {};
                settingsGroupModel.contentHeader = oobeSettingsGroup.title;
                settingsGroupModel.description = oobeSettingsGroup.description;

                let toggles = [];
                let settingsInGroup = oobeSettingsGroup.getSettings();
                for (let setting of settingsInGroup) {
                    this.settingsObjects.push(setting);
                    let toggle = {
                        labelOffText: setting.valueOffLabel,
                        labelOnText: setting.valueOnLabel,
                        checkedValue: ko.observable(setting.value),
                        name: setting.name,
                        descriptionOn: setting.descriptionOn,
                        descriptionOff: setting.descriptionOff,
                        titleText: ko.observable(setting.value ? setting.descriptionOn : setting.descriptionOff),
                        canonicalName: setting.canonicalName
                    };
                    toggle.checkedValue.subscribe(function (newValue) {
                        setting.value = newValue;
                        toggle.titleText(newValue ? toggle.descriptionOn : toggle.descriptionOff);
                    });
                    toggles.push(toggle);
                }
                settingsGroupModel.toggleContent = toggles;
                this.settingsData.push(settingsGroupModel);
            }
        }

        initializeLearnMoreContentAsync() {
            //TODO: https://microsoft.visualstudio.com/OS/_workitems?id=12599687&_a=edit
            let getLearnMorePlainTextPromise = CloudExperienceHostAPI.FeatureStaging.isOobeFeatureEnabled("CoreOobeSettings") ?
                CloudExperienceHostAPI.OobeSettingsManagerStaticsCore.getLearnMorePlainTextAsync() : CloudExperienceHostAPI.OobeSettingsManagerStatics.getLearnMorePlainTextAsync();
            return getLearnMorePlainTextPromise.then((result) => {
                let msHtmlStringBody = result.replace(/\r/g, "</p><p>");
                let msHtmlString = "<html><head><link href=\"/webapps/inclusiveOobe/css/inclusive-mseula.css\" rel=\"stylesheet\"></head><body><p>" + msHtmlStringBody + "</p></body></html>";
                this.learnMoreContent = msHtmlString;
            });
        }

        getLearnMoreContent() {
            return this.learnMoreContent;
        }
    }
    return new OobeSettingsData();
});
