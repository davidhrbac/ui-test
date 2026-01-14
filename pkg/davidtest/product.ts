import { IPlugin } from '@shell/core/types';

export const NAME = 'davidtest';

export function init($plugin: IPlugin, store: any) {
  const { product } = $plugin.DSL(store, NAME);

  product({
    inStore: 'management',
    icon: 'globe',
    label: 'DavidTest',
    removable: true,
    showClusterSwitcher: false,
    category: 'global',
    to: { name: 'davidtest', params: { cluster: 'local' } } // klidně stejně jako clock
  } as any);
}
