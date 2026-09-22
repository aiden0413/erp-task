// 원형 상태 아이콘
export function StatusBadge({
  label,
  dot,
  extra,
}: {
  label: string;
  dot: string;
  extra?: string | null;
}) {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-700">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
      {label}
      {extra && <span className="text-orange-600 font-semibold ml-1">{extra}</span>}
    </span>
  );
}
