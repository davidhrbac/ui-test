import { IPlugin } from '@shell/core/types';
import { importTypes } from '@rancher/auto-import';

export default function(plugin: IPlugin): void {
  importTypes(plugin);
  plugin.metadata = require('./package.json');

  plugin.addProduct(require('./product'));

  plugin.addRoute({
    name: 'davidtest',
    path: '/davidtest',
    component: () => import('./pages/DavidTest.vue'),
    meta: {
      product: 'davidtest',
      cluster: false
    }
  });
}

