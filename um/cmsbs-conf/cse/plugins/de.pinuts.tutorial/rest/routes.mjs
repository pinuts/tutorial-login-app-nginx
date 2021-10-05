/// <reference path="../../../.vscode.js"/>

import { RouterBuilder } from "@de.pinuts.apirouter/shared/routing.es6";

/**
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
const auth = (req, res) => {
    const originalUri = req.header('x-original-uri');
    const entry = new de.pinuts.cmsbs.lib.plugin.SessionHandler().getUserEntry();

    if (!entry) {
        return res.sendError(401);
    } else {
        console.log(`/auth: "${originalUri}"; headers =`, req.headers, req.session, entry);
    }
}

de.pinuts.tutorial.apiController = new RouterBuilder()
    .get('/auth', auth)
    .build();
