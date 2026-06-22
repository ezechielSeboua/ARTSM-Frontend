export const Th = ({ children }) => (
  <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">
    {children}
  </th>
);

export const DeleteBtn = ({ id, deletingId, onDelete }) => (
  <button
    onClick={() => onDelete(id)}
    disabled={deletingId === id}
    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
    title="Supprimer"
  >
    {deletingId === id ? (
      <span className="w-4 h-4 border border-red-400 border-t-transparent rounded-full animate-spin block" />
    ) : (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )}
  </button>
);

export const SubTabBtn = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors
      ${active ? 'bg-blue-950 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
  >
    {children}
  </button>
);

export const CountBadge = ({ n, warn }) => (
  <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shrink-0
    ${warn ? 'bg-amber-500 text-blue-950' : 'bg-slate-200 text-slate-600'}`}>
    {n}
  </span>
);

export const LoadingSpinner = () => (
  <div className="flex justify-center py-16">
    <span className="w-8 h-8 border-2 border-blue-900/20 border-t-blue-900 rounded-full animate-spin" />
  </div>
);

export const EmptyState = ({ message }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
    <p className="text-slate-400 font-medium">{message}</p>
  </div>
);
