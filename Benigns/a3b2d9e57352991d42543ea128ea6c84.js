//
// Copyright (C) Microsoft. All rights reserved.
//
class RequirePathConfig {
    constructor(root, options) {
        options = options || {};

        // Setup path for requirejs
        this.baseUrl = root + '/js';
        this.paths = {
            legacy: '/js',
            lib: '/lib',
            winjs: (options.useFullWinJS ? '/Microsoft.WinJS/js' : '/Microsoft.WinJS-reduced/js'),
            jsCommon: this.baseUrl + '/common',
            pageView: root + '/view',
            viewTemplates: root + '/view/templates',
            appLaunchers: this.baseUrl + '/appLaunchers',
            optional: '/lib/optional',
            sample: '/samples',
            data: '/data'
        };

        // Mapping for lib versions
        this.map = {
            '*': {
                'lib/knockout': 'lib/knockout-3.4.0',
                'lib/knockout-winjs': 'lib/knockout-winjs-wrapper'
            }
        };

        // Set module/script load timeout to 30s (default is 7s, which is too short on slower platforms).
        this.waitSeconds = 30;
    }
}