import { IPlugin } from '@shell/core/types';

// Lazy load stránky
const DavidTestPage = () => import('./pages/DavidTest.vue');

export default function(plugin: IPlugin) {
  plugin.metadata = require('./package.json');

  // 1) Přidej “product” do levého menu
  // Product = horní položka v menu (jako Cluster Management apod.)
  plugin.addProduct({
    name: 'davidtest',
    label: 'DavidTest',
    icon: 'folder',          // jednoduchá ikonka; když nebude, nevadí
    removable: true
  });

  // 2) Přidej route
  // Path: /davidtest
  plugin.addRoute({
    name: 'davidtest',
    path: '/davidtest',
    component: DavidTestPage,
    meta: {
      product: 'davidtest',
      // Pokud chceš, aby to bylo i jako položka v menu v rámci produktu:
      // (Rancher to umí renderovat podle meta)
      // label: 'Home'
    }
  });
}
