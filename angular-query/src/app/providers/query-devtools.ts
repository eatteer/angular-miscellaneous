import { ENVIRONMENT_INITIALIZER, Provider, inject } from '@angular/core';
import { QueryClientService } from '@ngneat/query';

export const QUERY_DEVTOOLS_PROVIDER: Provider = {
  provide: ENVIRONMENT_INITIALIZER,
  multi: true,
  useValue: () => {
    const queryClient = inject(QueryClientService);
    import('@ngneat/query-devtools').then((m) => {
      m.ngQueryDevtools({ queryClient });
    });
  },
};
