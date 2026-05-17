import Image from "next/image";

/**
 * Logo lateral (direita, inteira) como marca d’água: tons neutros discretos.
 * Colocar dentro de <section class="relative isolate overflow-hidden"> como primeiro filho.
 */
export function SectionBackdropMark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute right-0 top-[-4%] h-[min(58rem,95vh)] w-[min(92vw,58rem)] translate-x-[min(8vw,4rem)] sm:top-[-2%] sm:translate-x-[min(9vw,4.5rem)] md:h-[min(64rem,96vh)] md:w-[min(88vw,56rem)] md:translate-x-[min(10vw,5rem)] lg:top-0 lg:h-[68rem] lg:w-[56rem] lg:translate-x-[min(12vw,6rem)]">
        <div className="relative h-full w-full opacity-[0.07] [filter:grayscale(1)_brightness(0)_invert(1)] sm:opacity-[0.06] md:opacity-[0.055]">
          <Image
            src="/logo.png"
            alt=""
            fill
            sizes="(max-width: 768px) 92vw, 896px"
            className="object-contain object-right"
          />
        </div>
      </div>
    </div>
  );
}
