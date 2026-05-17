type TopicGroup = {
  title: string;
  items: string[];
};

type Props = {
  groups: TopicGroup[];
};

export function ServiceAccordions({ groups }: Props) {
  return (
    <div className="mt-10 space-y-3 sm:mt-12">
      {groups.map((group) => (
        <details
          key={group.title}
          className="group rounded-lg border border-white/10 bg-jac-navy-950/55 shadow-lg shadow-black/20 open:border-jac-blue-bright/30 open:bg-jac-navy-950/70"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-base font-semibold tracking-wide text-white transition hover:bg-white/[0.04] sm:px-5 sm:text-lg [&::-webkit-details-marker]:hidden">
            <span>{group.title}</span>
            <svg
              className="h-5 w-5 shrink-0 text-jac-blue-bright transition-transform duration-300 group-open:rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="border-t border-white/10 px-4 pb-5 pt-2 sm:px-5">
            <ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-jac-silver-300 sm:text-[0.95rem]">
              {group.items.map((item, j) => (
                <li
                  key={`${group.title}-${j}`}
                  className="relative pl-4 before:pointer-events-none before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-jac-blue-bright"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
