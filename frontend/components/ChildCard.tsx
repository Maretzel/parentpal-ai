type ChildCardProps = {
  name: string;
  age: number;
  focus: string;
};

export function ChildCard({ name, age, focus }: ChildCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">Child profile</p>
      <h2 className="mt-2 text-xl font-semibold">{name}</h2>
      <p className="mt-1 text-slate-600">Age {age}</p>
      <p className="mt-4 rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-800">
        Focus: {focus}
      </p>
    </article>
  );
}