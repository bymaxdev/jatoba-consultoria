"use client";

type SectionHeadingProps = {
  index: string;
  title: string;
  intro?: string;
  className?: string;
  /** id opcional no elemento de título (ex.: aria-labelledby). */
  headingId?: string;
};

export function SectionHeading({
  index,
  title,
  intro,
  className = "",
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`.trim()}>
      <div className="flex flex-col gap-3 border-b border-white/15 pb-5 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-5">
        <span className="font-mono text-sm tabular-nums tracking-[0.2em] text-jac-blue-bright">
          {index}
        </span>
        <h2
          id={headingId}
          className="text-balance font-semibold text-2xl tracking-tight text-white sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
      </div>
      {intro ? (
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-jac-silver-300 sm:mt-6 sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
