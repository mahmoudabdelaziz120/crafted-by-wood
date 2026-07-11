import { Link } from "@tanstack/react-router";
import type { Service } from "@/lib/services";
import { SERVICES } from "@/lib/services";

const PHONE = "201064766650";
const PHONE_DISPLAY = "+20 106 476 6650";

export function ServicePage({ service }: { service: Service }) {
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  const waMsg = encodeURIComponent(
    `السلام عليكم، أرغب في الاستفسار عن خدمة: ${service.labelAr}.`,
  );

  return (
    <div className="relative bg-background text-cream" dir="rtl">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden px-[6vw] pb-24 pt-32">
        <div className="absolute inset-0 -z-0">
          <img
            src={service.heroImage}
            alt={service.heroTitle}
            className="absolute inset-0 h-full w-full animate-hero-zoom object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,10,6,0.55)_0%,rgba(15,10,6,0.35)_35%,rgba(15,10,6,0.95)_100%)]" />
          <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[140px]" />
          <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-gold-light/10 blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-3xl animate-fade-up">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs text-cream-dim backdrop-blur-md transition-colors hover:text-cream"
          >
            <span aria-hidden>→</span> العودة للرئيسية
          </Link>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-gold-light backdrop-blur-md"
               style={{ fontFamily: "Poppins, sans-serif" }}>
            <span aria-hidden className="text-base">{service.icon}</span>
            {service.labelEn.toUpperCase()}
          </div>

          <h1
            className="text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
            style={{
              fontFamily: "Aref Ruqaa, serif",
              fontSize: "clamp(40px, 6.5vw, 84px)",
              lineHeight: 1.15,
              fontWeight: 700,
            }}
          >
            {service.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-loose text-cream-dim md:text-xl">
            {service.heroSub}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${PHONE}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl px-7 py-4 text-[15px] font-bold text-[#20140a] shadow-[0_10px_28px_rgba(201,151,79,0.35)] transition-transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
            >
              اطلب عرض سعر
            </a>
            <a
              href={`tel:+${PHONE}`}
              dir="ltr"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-[15px] font-semibold text-cream backdrop-blur-md transition-all hover:bg-white/10"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="text-xs font-medium tracking-[0.24em] text-gold-light"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {service.tagline}
          </span>
          <p className="mt-6 text-lg leading-loose text-cream-dim md:text-2xl md:leading-loose">
            {service.intro}
          </p>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-cream md:text-5xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
              ما يميّز خدمتنا
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.features.map((f) => (
              <div
                key={f.title}
                className="glass group relative overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-2xl">
                    {f.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-loose text-cream-dim">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APPLE-STYLE GALLERY (Full-screen chapters) ============ */}
      {service.gallery.map((g, i) => (
        <section
          key={g.title}
          className="relative flex min-h-[80vh] items-center overflow-hidden px-[6vw] py-24"
        >
          <img
            src={g.image}
            alt={g.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,7,4,0.4)_0%,rgba(10,7,4,0.9)_100%)]" />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div
                className="text-xs font-medium tracking-[0.24em] text-gold-light"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                CHAPTER {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="mt-4 text-white drop-shadow-lg"
                style={{
                  fontFamily: "Aref Ruqaa, serif",
                  fontSize: "clamp(32px, 4.5vw, 60px)",
                  lineHeight: 1.2,
                  fontWeight: 700,
                }}
              >
                {g.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-loose text-cream-dim">{g.desc}</p>
            </div>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <div className="glass-strong aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ============ MATERIALS ============ */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-cream md:text-5xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
              خامات نستخدمها
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-dim">
              نختار أفضل الخامات من مصادر موثوقة لضمان جودة تدوم.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {service.materials.map((m) => (
              <span
                key={m}
                className="glass rounded-full px-5 py-2.5 text-[15px] text-cream"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      {service.faq.length > 0 && (
        <section className="px-[6vw] py-24">
          <div className="mx-auto max-w-3xl">
            <h2
              className="mb-10 text-center text-3xl font-bold text-cream md:text-5xl"
              style={{ fontFamily: "Aref Ruqaa, serif" }}
            >
              أسئلة شائعة
            </h2>
            <div className="space-y-4">
              {service.faq.map((f, i) => (
                <details
                  key={i}
                  className="glass group rounded-2xl px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[17px] font-semibold text-cream">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-gold-light transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-loose text-cream-dim">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="px-[6vw] py-24">
        <div className="mx-auto max-w-5xl">
          <div className="glass-strong relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold-light/15 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-cream md:text-5xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
                جاهزون لبدء مشروعك؟
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-cream-dim md:text-lg">
                احصل على استشارة وتصميم مجاني الآن — الرد خلال أقل من ساعة.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://wa.me/${PHONE}?text=${waMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl px-8 py-4 text-[15px] font-bold text-[#20140a] shadow-[0_10px_28px_rgba(201,151,79,0.35)] transition-transform hover:-translate-y-1"
                  style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
                >
                  اطلب عرض سعر عبر واتساب
                </a>
                <Link
                  to="/"
                  hash="consult"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-[15px] font-semibold text-cream backdrop-blur-md transition-all hover:bg-white/10"
                >
                  استشارة مفصلة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OTHER SERVICES ============ */}
      <section className="border-t border-white/5 px-[6vw] py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-medium tracking-[0.24em] text-gold-light" style={{ fontFamily: "Poppins, sans-serif" }}>
                MORE SERVICES
              </span>
              <h2 className="mt-2 text-2xl font-bold text-cream md:text-4xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
                استكشف خدمات أخرى
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.path}
                className="glass group relative overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-2xl">
                  {o.icon}
                </div>
                <div className="text-lg font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>
                  {o.labelAr}
                </div>
                <div className="mt-1 text-xs text-cream-dim">{o.tagline}</div>
                <div className="mt-6 flex items-center gap-2 text-sm text-gold-light">
                  اكتشف <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/5 bg-[#0f0a06] px-[6vw] py-10 text-center text-sm text-cream-dimmer">
        © {new Date().getFullYear()} إتقان للنجارة. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
