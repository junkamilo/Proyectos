export const LoadingState = () => `
  <div class="col-span-full flex flex-col items-center justify-center h-64">
     <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
     <p class="mt-4 text-slate-500 font-medium animate-pulse">Cargando pedidos...</p>
  </div>
`;

export const EmptyState = () => `
  <div class="col-span-full flex flex-col items-center justify-center py-16 text-slate-400 opacity-60">
    <svg class="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
    <p class="text-lg font-medium">No hay pedidos en esta sección.</p>
  </div>
`;
