//
// Copyright (C) Microsoft. All rights reserved.
//
define(['lib/knockout', 'legacy/bridge', 'legacy/events'], (ko, bridge, constants) => {
    class LicenseViewModel {
        constructor(resourceStrings) {
            this.resourceStrings = resourceStrings;
            this.title = resourceStrings.LicenseTitle;
            this.subHeaderText = resourceStrings.LicenseLeadText;
            this.flexEndButtons = [
                {
                    buttonText: resourceStrings.LicenseButtonText,
                    buttonType: "button",
                    isPrimaryButton: true,
                    buttonClickHandler: (() => {
                        bridge.fireEvent(constants.Events.done, constants.AppResult.success);
                    }),
                }
            ];

            // Setup simple voiceover and speech recognition using the resource strings
            try {
                CloudExperienceHostAPI.Speech.SpeechRecognition.stop();
                let sampleConstraint = new Windows.Media.SpeechRecognition.SpeechRecognitionListConstraint(new Array(this.resourceStrings.SampleSpeechConstraint));
                sampleConstraint.tag = "sample";
                let constraints = new Array(CloudExperienceHostAPI.Speech.SpeechRecognitionKnownCommands.yes, sampleConstraint); // I also allow "Yes"
                if (constraints && (constraints.length > 0)) {
                    CloudExperienceHostAPI.Speech.SpeechRecognition.promptForCommandsAsync(this.resourceStrings.SampleVoiceOver, constraints).done((result) => {
                        if (result) {
                            if ((result.constraint.tag == CloudExperienceHostAPI.Speech.SpeechRecognitionKnownCommands.yes.tag) || (result.constraint.tag == "sample")) {
                                bridge.fireEvent(constants.Events.done, constants.AppResult.success);
                            }
                        }
                    });
                }
            }
            catch (err) {
            }
        }
    }
    return LicenseViewModel;
});