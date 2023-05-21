import router from '@koa/router';

import { view, app, asset } from './demo.controller.js';

const views = new router();

// Application Bundle
views.get('/app.js', app);

// Assets
views.get('/assets/:file', asset);

// Page Routes
views.get([ '/hook', '/about', '/' ], view);

export {
    views
}