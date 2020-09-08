// @ts-nocheck
import { ApplyPluginsType } from '/Users/liazhen/Desktop/web/react/users/node_modules/@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default
  },
  {
    "path": "/users",
    "exact": true,
    "component": require('@/pages/users/index.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
