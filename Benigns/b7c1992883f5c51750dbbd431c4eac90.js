///<reference path="../../../../../target/x64/debug/onenote/x-none/jsaddins/shared.d.ts"/>
///<reference path="../../../../../target/x64/debug/onenoteres/x-none/onenote_strings.d.ts"/>
// NOTE: this does _not_ handle escaped ampersands
function parseQueryString(queryString) {
    // ignore any initial question mark
    if (queryString.length && queryString[0] == '?') {
        queryString = queryString.substring(1);
    }
    let params = {};
    let queries;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for (let index = 0; index < queries.length; index++) {
        let temp = queries[index].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
}
;
var doInitialization = function (parameters) {
    var agaveList = {
        // emoji reference: http://unicode.org/Public/emoji/1.0/emoji-data.txt
        CNDP: {
            bigTextHtml: "&#128211;",
            url: "https://www.onenote.com/officeaddins/classnotebook/distributepage?clientlogging=false"
        },
        CNDS: {
            bigTextHtml: "&#128214;",
            url: "https://www.onenote.com/officeaddins/classnotebook/distributesection?clientlogging=false"
        },
        FM: {
            url: "https://forms.office.com/Pages/onenoteaddinpage.aspx"
        },
        LT: {
            showInDialog: true,
            url: "https://www.onenote.com/officeaddins/learningtools?autorun=true"
        },
        MD: {
            url: "https://www.onenote.com/officeaddins/meetings"
        },
        OP: {
            bigTextHtml: "&#128444;",
            // TODO: Update this with the permanent URL before shipping
            url: "https://contentstorage.osi.office.net/pages/999ecb79f181e97a.html?clientlogging=false"
        },
        RS: {
            url: "https://entity.osi.office.net/officeentity/web/views/juno.agave.cshtml"
        },
        ST: {
            bigTextHtml: "&#128533;",
            url: "https://www.onenote.com/officeaddins/stickers"
        },
    };
    let agaveId = parameters["onenoteagave"];
    // get the language code from query string
    let lang = parameters["lang"] || parameters["ui"];
    if (!agaveList[agaveId]) {
        Localization.setLanguageStringsAsync(lang)
            .then(function () {
            let messageElement = document.getElementById("message");
            messageElement.innerText = JSADDINS.Strings.Invalid_Agave;
            let retryElement = document.getElementById("retryButton");
            if (retryElement) {
                retryElement.innerText = JSADDINS.Strings.Generic_Retry;
                retryElement.onclick = () => {
                    window.location.reload(true);
                };
            }
            // unhide main message area
            let mainElement = document.getElementById("main");
            mainElement.classList.remove("hidden");
        });
        return;
    }
    let agave = agaveList[agaveId];
    if (!parameters.showMessageInWindow) {
        // if we weren't told to explicitly show the message in the window, check to see if we are online
        // and either navigate to self to show in window, or redirect to remote url
        let isOnline = navigator.onLine;
        // navigate to self in dialog with showMessageInWindow if this agave needs the message to be in its own dialog
        if (!isOnline && agave.showInDialog && Office && Office.context && Office.context.ui && Office.context.ui.displayDialogAsync) {
            Office.context.ui.displayDialogAsync(window.location.href + "&showMessageInWindow=true", { hideTitle: true, width: 40, height: 40 });
        }
        else if (isOnline) {
            // we are online
            let destUrl = agave.url;
            let qparams = window.location.search;
            // replace "?" with "&" if necessary
            if (destUrl.indexOf("?") >= 1) {
                if (qparams.length && qparams[0] == "?") {
                    qparams = "&" + qparams.substring(1);
                }
            }
            destUrl += qparams;
            // navigate to destination URL
            window.location.href = destUrl;
            return;
        }
    }
    // show message in the window if we have gotten this far.
    Localization.setLanguageStringsAsync(lang)
        .then(function () {
        // variables that can be set per-agave
        let anyStrings = (JSADDINS.Strings);
        let noInternet = anyStrings[agaveId + "_NoInternet"];
        let retryString = anyStrings[agaveId + "_Retry"];
        let imageAltText = anyStrings[agaveId + "_ImageAltText"];
        noInternet = noInternet || JSADDINS.Strings.Generic_NoInternet;
        retryString = retryString || JSADDINS.Strings.Generic_Retry;
        let messageElement = document.getElementById("message");
        messageElement.innerText = noInternet;
        let retryElement = document.getElementById("retryButton");
        if (retryElement) {
            retryElement.innerText = retryString;
            retryElement.onclick = () => {
                if (window.navigator.onLine) {
                    window.location.reload(true);
                }
            };
        }
        if (imageAltText && agave.imageUrl) {
            let imageElement = document.getElementById("description-image");
            imageElement.src = agave.imageUrl;
            imageElement.alt = imageAltText;
            imageElement.classList.remove("hidden");
        }
        if (agave.bigTextHtml) {
            let bigTextHtml = document.getElementById("big-text");
            bigTextHtml.innerHTML = agave.bigTextHtml;
            bigTextHtml.classList.remove("hidden");
        }
        // unhide main message area
        var mainElement = document.getElementById("main");
        mainElement.classList.remove("hidden");
    });
};
function launchDialog(event) {
    try {
        let parameters = parseQueryString(window.location.search);
        doInitialization(parameters);
    }
    finally {
        if (event && event.completed) {
            event.completed();
        }
    }
}
// for Learning Tools, this should be the API to call
// make sure this is the same API that is looked for my Learning Tools in the cloud
window.launchImmersiveReaderDialog = launchDialog;
