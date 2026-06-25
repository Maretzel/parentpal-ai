type TaskListProps = {
  tasks: string[];
};

export function TaskList({ tasks }: TaskListProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Family Tasks</h2>
      <ul className="mt-4 space-y-3">
        {tasks.map((task) => (
          <li key={task} className="flex items-center gap-3 text-sm">
            <input type="checkbox" className="h-4 w-4 rounded" />
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}