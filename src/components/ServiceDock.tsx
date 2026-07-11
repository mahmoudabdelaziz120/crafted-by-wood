import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SERVICES, HOME_ICON, ETQAN_LOGO } from "@/lib/services";

/**
 * "Curtain" dock — collapsed into the Etqan logo by default.
 * On hover, all items unfurl downward with a staggered animation.
 * Home is the first item, followed by the services.
 * On mobile: stays as a fixed bottom bar (no hover).
 */

type Item = {
  key: string;
  to: string;
  label: string;
  icon: string;
};

const ITEMS: Item[] = [
  { key: "home", to: "/", label: "الرئيسية", icon: HOME_ICON },
  ...SERVICES.map((s) => ({ key: s.slug, to: s.path, label: s.labelAr, icon: s.iconImage })),
];

export function ServiceDock() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

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
          }}
        >
          {ITEMS.map((it) => {
            const active = pathname === it.to;
            return (
              <Link
                key={it.key}
                to={it.to}
                aria-label={it.label}
                className={`grid flex-1 place-items-center rounded-2xl py-2 transition-all active:scale-95 ${
                  active ? "shadow-[0_6px_16px_rgba(201,151,79,0.45)]" : ""
                }`}
                style={
                  active
                    ? { background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }
                    : undefined
                }
              >
                <img
                  src={it.icon}
                  alt=""
                  className="h-6 w-6 object-contain"
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  // ============ DESKTOP CURTAIN DOCK ============
  return (
    <div
      dir="ltr"
      aria-label="خدمات إتقان"
      className="fixed left-5 top-5 z-50 hidden md:block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger — the Etqan logo pill */}
      <button
        type="button"
        aria-expanded={open}
        aria-label="افتح قائمة الخدمات"
        className={`relative grid h-14 w-14 place-items-center rounded-2xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-[1.04] ${
          open ? "scale-[1.04]" : ""
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(60,42,26,0.85), rgba(20,14,8,0.85))",
          backdropFilter: "blur(22px) saturate(160%)",
        }}
      >
        <img
          src={ETQAN_LOGO}
          alt="إتقان"
          className="h-10 w-10 object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
          width={40}
          height={40}
        />
        {/* Subtle chevron hint */}
        <span
          aria-hidden
          className={`absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold transition-all ${
            open ? "opacity-0" : "opacity-70"
          }`}
        />
      </button>

      {/* Curtain items container */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-full mt-3"
        aria-hidden={!open}
      >
        <div
          className={`flex flex-col items-center gap-2 rounded-3xl border border-white/12 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out ${
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{
            background: "rgba(30, 21, 13, 0.62)",
            backdropFilter: "blur(22px) saturate(160%)",
            transformOrigin: "top center",
            transform: open ? "translateY(0) scaleY(1)" : "translateY(-14px) scaleY(0.7)",
          }}
        >
          {ITEMS.map((it, i) => {
            const active = pathname === it.to;
            const delay = open ? `${i * 40}ms` : `${(ITEMS.length - 1 - i) * 25}ms`;
            return (
              <div key={it.key} className="relative">
                {/* Tooltip on the right */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-black/85 px-3 py-1.5 text-[13px] font-semibold text-cream shadow-lg transition-all duration-200 ${
                    hoverKey === it.key && open ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                  }`}
                  style={{ fontFamily: "Tajawal, sans-serif" }}
                >
                  {it.label}
                </span>

                <Link
                  to={it.to}
                  aria-label={it.label}
                  onMouseEnter={() => setHoverKey(it.key)}
                  onMouseLeave={() => setHoverKey(null)}
                  className={`group relative grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-500 ease-out ${
                    active
                      ? "border-gold/60 shadow-[0_10px_28px_rgba(201,151,79,0.5)]"
                      : "border-white/10 bg-white/5 hover:border-gold/40 hover:bg-white/10"
                  }`}
                  style={{
                    background: active
                      ? "linear-gradient(135deg, var(--gold-light), var(--gold))"
                      : undefined,
                    transform: open ? "translateY(0) scale(1)" : "translateY(-40px) scale(0.4)",
                    opacity: open ? 1 : 0,
                    transitionDelay: delay,
                  }}
                >
                  <img
                    src={it.icon}
                    alt=""
                    className={`h-7 w-7 object-contain transition-transform duration-200 group-hover:scale-110 ${
                      active ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" : ""
                    }`}
                    width={28}
                    height={28}
                    loading="lazy"
                  />
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
        </div>
      </div>
    </div>
  );
}
