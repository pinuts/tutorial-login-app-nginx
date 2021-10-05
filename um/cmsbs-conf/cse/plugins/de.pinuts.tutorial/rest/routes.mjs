/// <reference path="../../../.vscode.js"/>

import { RouterBuilder } from "@de.pinuts.apirouter/shared/routing.es6";

/**
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
const auth = (req, res) => {
    const originalUri = new java.net.URI(req.header('x-original-uri'));

    /** @type {Entry} */
    const entry = new de.pinuts.cmsbs.lib.plugin.SessionHandler().getUserEntry();

    if (!entry) {
        return res.sendError(401);
    } else {
        console.log(`/auth:
        originalUri.path=${originalUri.path}
        entry.oid=${entry.oid}
        req.headers=${JSON.stringify(req.headers)}
        req.session=${JSON.stringify(req.session)}`);

        // TODO: Implement appropriate checks against originalUri and entry...
    }
}

de.pinuts.tutorial.apiController = new RouterBuilder()
    .get('/auth', auth)
    .build();
