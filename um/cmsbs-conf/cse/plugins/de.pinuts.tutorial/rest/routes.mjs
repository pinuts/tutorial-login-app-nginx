/// <reference path="../../../.vscode.js"/>

import { RouterBuilder } from "@de.pinuts.apirouter/shared/routing.es6";

/**
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 */
const auth = (req, res) => {
    const originalUri = req.header('x-original-uri');
    console.log(`/auth: "${originalUri}"; headers =`, req.headers);
    res.status = 401;
}

de.pinuts.tutorial.apiController = new RouterBuilder()
    .get('/auth', auth)
    .build();
