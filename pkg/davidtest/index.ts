import { importTypes } from '@rancher/auto-import';
import { IPlugin } from '@shell/core/types';
import DavidTestPage from './pages/DavidTest.vue';

export default function(plugin: IPlugin): void {
  importTypes(plugin);

  plugin.metadata = require('./package.json');

  plugin.addProduct(require('./product'));

  plugin.addRoute({
    name: 'davidtest',
    path: '/davidtest',
    component: DavidTestPage
  });
}
