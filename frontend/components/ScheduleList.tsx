type ScheduleListProps = {
  items: string[];
};

export function ScheduleList({ items }: ScheduleListProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
      <h2 className="text-xl font-semibold">Today&apos;s Schedule</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}