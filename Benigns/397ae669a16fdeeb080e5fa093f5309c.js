// TODO: Delete this file, it is no longer used
define(['jsCommon/oobe-gesture-manager'], (gestureManager) => {
    class OobeContentContainerViewModel {
        constructor(params, element) {
            this.element = element;
            this.onKeyDownHandler = null;
            this.onKeyUpHandler = null;

            let supportHotKey = params.optinHotKey || false;
            if (supportHotKey) {
                this.onKeyDownHandler = gestureManager.onKeyDown.bind(gestureManager);
                this.onKeyUpHandler = gestureManager.onKeyUp.bind(gestureManager);
                element.addEventListener("keydown", this.onKeyDownHandler);
                element.addEventListener("keyup", this.onKeyUpHandler);
            }
        }

        dispose() {
            this.element.removeEventListener("keydown", this.onKeyDownHandler);
            this.element.removeEventListener("keyup", this.onKeyUpHandler);
        }
    }
    return OobeContentContainerViewModel;
});