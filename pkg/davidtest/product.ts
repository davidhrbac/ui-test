import { IPlugin } from '@shell/core/types';

export const NAME = 'davidtest';

export function init($plugin: IPlugin, store: any) {
  // DSL je oficiální způsob, jak registrovat produkt v menu (viz clock)
  const { product } = $plugin.DSL(store, NAME);

  product({
    inStore: 'management',
    icon: 'globe',                 // můžeš změnit, ale globe funguje i bez dalších věcí
    label: 'DavidTest',
    removable: true,
    showClusterSwitcher: false,
    category: 'global',
    to: { name: 'davidtest', params: { cluster: 'local' } }
  } as any);
}
