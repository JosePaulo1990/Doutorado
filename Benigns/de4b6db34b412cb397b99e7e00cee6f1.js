//
// Copyright (C) Microsoft. All rights reserved.
//
define(['lib/knockout', 'oobeeula-data', 'legacy/bridge', 'legacy/events', 'legacy/core'], (ko, oobeEulaData, bridge, constants, core) => {
    const tagAccept = "accept";

    class EulaViewModel {
        constructor(resources, eulaData, gestureManager) {
            this.resources = resources;
            this.title = resources.EulaTitle;
            this.msEulaFileContent = eulaData.msEulaString;
            this.oemEulaFileContent = eulaData.oemEulaString;
            this.showOEMEula = eulaData.hasOEMEula;
            this.msEulaAriaLabel = resources.MSIFrameLabel;
            this.oemEulaAriaLabel = resources.OEMIFrameLabel;
            this.gestureManager = gestureManager;
            this.supportClickableTitle = true;
            this.optinHotKey = true;

            this.processingFlag = ko.observable(false);
            this.flexEndButtons = [
                {
                    buttonText: resources.YesButtonText,
                    buttonType: "button",
                    isPrimaryButton: true,
                    disableControl: ko.pureComputed(() => {
                        return this.processingFlag();
                    }),
                    buttonClickHandler: (() => {
                        this.onAccept();
                    }),
                }
            ];

            this.pageDefaultAction = () => {
                this.onAccept();
            }
        }

        startVoiceOver() {
            try {
                this.speakThenListen().done(() => {
                    bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "SpeakThenListenSuccess");
                }, (err) => {
                    bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "SpeakThenListenAsyncWorkerFailure", core.GetJsonFromError(err));
                });
            }
            catch (err) {
                bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "SpeakThenListenFailure", core.GetJsonFromError(err));
            }
        }

        onAccept() {
            if (!this.processingFlag()) {
                this.processingFlag(true);

                uiHelpers.PortableDeviceHelpers.unsubscribeToDeviceInsertion(this.gestureManager, bridge, core);

                // Call the api to commit accept and go to the next page.
                try {
                    // Show the progress ring while committing async.
                    bridge.fireEvent(CloudExperienceHost.Events.showProgressWhenPageIsBusy);

                    CloudExperienceHostAPI.OobeEulaManagerStatics.acceptEulaAsync().done(() => {
                        bridge.fireEvent(constants.Events.done, constants.AppResult.success);
                    }, (err) => {
                        bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "AcceptEULAAsyncWorkerFailure", core.GetJsonFromError(err));
                        bridge.fireEvent(constants.Events.done, constants.AppResult.error);
                    });
                }
                catch (err) {
                    bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "AcceptEULAFailure", core.GetJsonFromError(err));
                    bridge.fireEvent(constants.Events.done, constants.AppResult.error);
                }
            }
        }

        speakThenListen() {
            CloudExperienceHostAPI.Speech.SpeechRecognition.stop();
            return CloudExperienceHostAPI.Speech.SpeechSynthesis.speakAsync(this.resources.PageVoiceOver).then(() => {
            }, (err) => {
                bridge.invoke("CloudExperienceHost.Telemetry.logEvent", "SpeakAsyncFailure", core.GetJsonFromError(err));
            });
        }

        subscribeToDeviceInsertion(gestureManager) {
            uiHelpers.PortableDeviceHelpers.subscribeToDeviceInsertion(gestureManager, bridge, core);
        }
    }
    return EulaViewModel;
});
