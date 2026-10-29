//
// Copyright (C) Microsoft. All rights reserved.
//
define(['lib/knockout', 'legacy/appViewManager'], (ko, appViewManager) => {
    class OobeProgressViewModel {
        constructor(params) {
            let res = new Windows.ApplicationModel.Resources.ResourceLoader("resources");
            this.progressText = ko.observable(res.getString("Progress"));
            appViewManager.subscribeForUpdateType(this, CloudExperienceHost.FrameViewModelUpdateType.Language)
        }

        dispose() {
            appViewManager.unsubscribeForUpdateType(this, CloudExperienceHost.FrameViewModelUpdateType.Language)
        }

        update(updateType, completeDispatch, errorDispatch) {
            switch (updateType) {
                case CloudExperienceHost.FrameViewModelUpdateType.Language:
                    this.languageOverridden();
                    completeDispatch();
                    break;
            }
        }

        languageOverridden() {
            let res = new Windows.ApplicationModel.Resources.ResourceLoader("resources");
            this.progressText(res.getString("Progress"));
        }
    }
    return OobeProgressViewModel;
});