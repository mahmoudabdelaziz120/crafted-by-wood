import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/services";

/**
 * macOS-style floating dock for services.
 * - Desktop: centered vertically on the left edge, glassmorphism, magnify on hover.
 * - Mobile: fixed bottom bar (icons only).
 */
export function ServiceDock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isMobile, setIsMobile] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isHomeHero = pathname === "/";

  // ============ MOBILE BOTTOM BAR ============
  if (isMobile) {
    return (
      <nav
        dir="ltr"
        aria-label="خدماتنا"
        className="fixed inset-x-3 bottom-3 z-40 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div
          className="flex items-center justify-between gap-1 rounded-3xl border border-white/15 px-2 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
          style={{
            background: "rgba(30, 21, 13, 0.72)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
          }}
        >
          {SERVICES.map((s) => {
            const active = pathname === s.path;
            return (
              <Link
                key={s.slug}
                to={s.path}
                aria-label={s.labelAr}
                className={`grid flex-1 place-items-center rounded-2xl py-2 text-lg transition-all active:scale-95 ${
                  active ? "shadow-[0_6px_16px_rgba(201,151,79,0.45)]" : ""
                }`}
                style={
                  active
                    ? { background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }
                    : undefined
                }
              >
                <span aria-hidden>{s.icon}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // ============ DESKTOP MAGNIFY DOCK ============
  const getScale = (i: number) => {
    if (hoverIndex === null) return 1;
    const d = Math.abs(i - hoverIndex);
    if (d === 0) return 1.5;
    if (d === 1) return 1.22;
    if (d === 2) return 1.08;
    return 1;
  };

  return (
    <div
      dir="ltr"
      aria-label="خدمات إتقان"
      className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 md:block ${
        isHomeHero ? "" : ""
      }`}
    >
      <div
        ref={dockRef}
        onMouseLeave={() => setHoverIndex(null)}
        className="flex flex-col items-center gap-2 rounded-[26px] border border-white/15 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        style={{
          background: "rgba(30, 21, 13, 0.55)",
          backdropFilter: "blur(22px) saturate(160%)",
          WebkitBackdropFilter: "blur(22px) saturate(160%)",
        }}
      >
        {SERVICES.map((s, i) => {
          const active = pathname === s.path;
          const scale = getScale(i);
          return (
            <div key={s.slug} className="relative">
              {/* Tooltip */}
              <span
                aria-hidden
                className={`pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 text-[13px] font-semibold text-cream shadow-lg transition-all duration-200 ${
                  hoverIndex === i ? "translate-x-0 opacity-100" : "translate-x-1 opacity-0"
                }`}
                style={{ fontFamily: "Tajawal, sans-serif" }}
              >
                {s.labelAr}
              </span>

              <Link
                to={s.path}
                aria-label={s.labelAr}
                onMouseEnter={() => setHoverIndex(i)}
                className={`relative grid h-12 w-12 place-items-center rounded-2xl border text-xl transition-[transform,box-shadow,border-color,background] duration-300 ease-out will-change-transform ${
                  active
                    ? "border-gold/60 text-cream shadow-[0_10px_28px_rgba(201,151,79,0.5)]"
                    : "border-white/10 bg-white/5 text-cream hover:border-gold/40"
                }`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                  background: active
                    ? "linear-gradient(135deg, var(--gold-light), var(--gold))"
                    : undefined,
                }}
              >
                <span aria-hidden>{s.icon}</span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gold shadow-[0_0_12px_rgba(201,151,79,0.9)]"
                  />
                )}
              </Link>
            </div>
          );
        })}

        <div className="my-1 h-px w-8 bg-white/10" />

        {/* Home shortcut */}
        <Link
          to="/"
          aria-label="الرئيسية"
          onMouseEnter={() => setHoverIndex(SERVICES.length)}
          className={`grid h-12 w-12 place-items-center rounded-2xl border text-lg transition-all duration-300 ease-out ${
            pathname === "/"
              ? "border-gold/60 text-gold-light shadow-[0_10px_28px_rgba(201,151,79,0.3)]"
              : "border-white/10 bg-white/5 text-cream-dim hover:border-gold/30 hover:text-cream"
          }`}
          style={{
            transform: `scale(${getScale(SERVICES.length)})`,
            transformOrigin: "left center",
          }}
        >
          <span aria-hidden>🏠</span>
        </Link>
      </div>
    </div>
  );
}
