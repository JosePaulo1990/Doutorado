//
// Copyright (C) Microsoft. All rights reserved.
//
/// <disable>JS2085.EnableStrictMode</disable>
/// <reference path="error.ts" />
"use strict";
var CloudExperienceHost;
(function (CloudExperienceHost) {
    class NavMesh {
        constructor(mesh, uriArguments) {
            this._mesh = mesh;
            this._uriArguments = uriArguments;
        }
        getStart() {
            return this.getNode(this._mesh.start);
        }
        getNode(cxid) {
            var node = this._mesh[cxid];
            return node;
        }
        addOrUpdateNode(node) {
            this._mesh[node.cxid] = node;
        }
        getErrorNode() {
            return this.getNode(this._mesh.error);
        }
        getErrorNodeName() {
            return this._mesh.error;
        }
        getNotifyOnFirstVisible() {
            return this._mesh.notifyOnFirstVisible;
        }
        getNotifyOnLastFinished() {
            // getNotifyOnLastFinished could be called when closing CXH before the mesh object is created
            return (this._mesh != null) && this._mesh.notifyOnLastFinished;
        }
        getMsaTicketContext() {
            return this._mesh.msaTicketContext;
        }
        getUriArguments() {
            return this._uriArguments;
        }
        getFrameName() {
            return this._mesh.frameName;
        }
        getInclusive() {
            return (this._mesh.speechCapable ? 1 : 0);
        }
        getSpeechDisabled() {
            return this._mesh.speechDisabled ? true : false;
        }
        blockLateWebAppCalls() {
            return this._mesh.blockLateWebAppCalls ? true : false;
        }
        blockEarlyExit() {
            return this._mesh.blockEarlyExit ? true : false;
        }
        isBackstackForBackNavigationSupported() {
            return this._mesh.useBackstackForBackNavigation;
        }
        isCloseToExitCxhSupported() {
            return this._mesh.useCloseToExitCxh;
        }
    }
    CloudExperienceHost.NavMesh = NavMesh;
})(CloudExperienceHost || (CloudExperienceHost = {}));
//# sourceMappingURL=navmesh.js.map