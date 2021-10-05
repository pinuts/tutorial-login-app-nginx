/// <reference path="../../../.vscode.js"/>

import { RouterBuilder } from "@de.pinuts.apirouter/shared/routing.es6";
import { getCurrentUserEntry } from "@de.pinuts.cmsbs.auth2/rest/index.mjs";

/**
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
const auth = (req, res) => {
    const originalUri = new java.net.URI(req.header('x-original-uri'));
    const entry = getCurrentUserEntry(req);

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
