import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import heroImage from "@/assets/hero-kitchen.jpg";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { submitContact } from "@/lib/site.functions";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "إتقان للنجارة | أثاث فاخر يدوم للأجيال" },
      { name: "description", content: "نصنع أثاثاً يدوم للأجيال — تصميم وتنفيذ مطابخ ودواليب وغرف نوم فاخرة. احصل على عرض سعر عبر واتساب." },
      { property: "og:title", content: "إتقان للنجارة | أثاث فاخر يدوم للأجيال" },
      { property: "og:description", content: "تصميم وتنفيذ قطع أثاث فاخرة بأعلى جودة وأدق التفاصيل." },
    ],
  }),
});

const PROJECT_TYPES = ["مطبخ", "غرفة نوم", "دولاب", "غرفة أطفال", "مكتب", "مكتبة", "باب", "أثاث حسب الطلب"];
const STYLES = ["مودرن", "نيو كلاسيك", "كلاسيك", "مينيمال", "لا أعرف — أحتاج استشارة"];
const BUDGETS = ["أقل من 20 ألف", "20 - 40 ألف", "40 - 70 ألف", "أكثر من 70 ألف", "أفضل مناقشتها"];
const WOODS = ["MDF", "كونتر", "زان", "لا أعرف"];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative bg-background text-cream">
      <Nav scrolled={scrolled} />
      <Hero />
      <Benefits />
      <ConsultationSection />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* ============================ NAV ============================ */
function Nav({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      dir="ltr"
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[5vw] transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(18,13,8,0.78)] py-3 backdrop-blur-xl"
          : "bg-[rgba(21,15,10,0.35)] py-4 backdrop-blur-md"
      } border-b border-white/5`}
    >
      <div className="flex items-center gap-3" dir="rtl">
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-xl font-bold text-[#1c130b] shadow-lg"
          style={{
            background: "linear-gradient(145deg, var(--gold-light), var(--wood-700))",
            fontFamily: "Aref Ruqaa, serif",
          }}
        >
          إ
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[17px] font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>
            إتقان للنجارة
          </span>
          <span className="text-[9.5px] tracking-[0.24em] text-gold-light" style={{ fontFamily: "Poppins, sans-serif" }}>
            ETQAN CARPENTRY
          </span>
        </div>
      </div>

      <nav dir="rtl" className="hidden gap-8 md:flex">
        {[
          { label: "الرئيسية", href: "#home", active: true },
          { label: "خدماتنا", href: "#benefits" },
          { label: "أعمالنا", href: "#benefits" },
          { label: "تواصل معنا", href: "#consult" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={`relative pb-1.5 text-[15px] transition-colors ${
              l.active ? "text-cream" : "text-cream-dim hover:text-cream"
            }`}
          >
            {l.label}
            {l.active && <span className="absolute inset-x-0 -bottom-0 h-0.5 rounded bg-gold" />}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="#consult"
          className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-[#20140a] shadow-[0_6px_18px_rgba(201,151,79,0.3)] transition-transform hover:-translate-y-0.5 md:flex"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Get a Quote <span aria-hidden>→</span>
        </a>
        <div className="hidden text-sm text-cream-dim md:block" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span className="text-cream underline">AR</span> | <span>EN</span>
        </div>
      </div>
    </header>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-[6vw] pt-32 pb-56 md:pb-40">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="مطبخ خشبي فاخر — إتقان للنجارة"
          className="h-full w-full animate-hero-zoom object-cover"
          width={1920}
          height={1280}
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,10,6,0.85)_0%,rgba(15,10,6,0.55)_35%,rgba(15,10,6,0.15)_65%,rgba(15,10,6,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,7,4,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl animate-fade-up">
        <h1
          className="text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
          style={{
            fontFamily: "Aref Ruqaa, serif",
            fontSize: "clamp(44px, 7vw, 88px)",
            lineHeight: 1.15,
            fontWeight: 700,
          }}
        >
          نصنع أثاثاً
          <br />
          يدوم <span className="text-gold-light">للأجيال</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-loose text-cream-dim md:text-xl">
          تصميم وتنفيذ قطع أثاث فاخرة
          <br />
          بأعلى جودة وأدق التفاصيل
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#consult"
            className="group flex items-center gap-3 rounded-2xl px-7 py-4 text-[15px] font-bold text-[#20140a] shadow-[0_10px_28px_rgba(201,151,79,0.35)] transition-transform hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
          >
            احصل على عرض سعر
            <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span>
          </a>
          <a
            href="#benefits"
            className="glass flex items-center gap-3 rounded-2xl px-6 py-4 text-[15px] font-semibold text-cream transition-all hover:bg-white/15"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full border border-cream/80 text-xs">▶</span>
            شاهد أعمالنا
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-56 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream-dimmer md:bottom-44">
        <div className="scroll-dot relative h-10 w-6 rounded-full border-[1.5px] border-cream-dimmer" />
      </div>

      {/* Stats bar */}
      <StatsBar />
    </section>
  );
}

/* ============================ STATS ============================ */
function StatsBar() {
  const s = useSiteSettings();
  const stats = [
    { icon: "🛋", num: s.stat_projects, ar: "مشروع مكتمل", en: "Projects Completed" },
    { icon: "🏅", num: s.stat_years, ar: "سنوات من الخبرة", en: "Years of Experience" },
    { icon: "⏱", num: s.stat_ontime, ar: "التزام بالمواعيد", en: "On-Time Delivery" },
    { icon: "🪵", num: s.stat_wood, ar: "أخشاب طبيعية", en: "Natural Wood" },
  ];
  return (
    <div className="absolute inset-x-[6vw] bottom-8 z-10">
      <div className="glass-strong grid grid-cols-2 gap-6 rounded-3xl px-6 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:grid-cols-4 md:px-10 md:py-7">
        {stats.map((st, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-xl text-gold-light">
              {st.icon}
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-bold text-cream md:text-[28px]" style={{ fontFamily: "Poppins, sans-serif" }}>
                {st.num}
              </div>
              <div className="truncate text-[13px] text-cream-dim">{st.ar}</div>
              <div className="truncate text-[10px] tracking-wide text-cream-dimmer" style={{ fontFamily: "Poppins, sans-serif" }}>
                {st.en}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ BENEFITS SECTION (bridge) ============================ */
function Benefits() {
  return (
    <section id="benefits" className="relative px-[6vw] py-28">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-medium tracking-[0.24em] text-gold-light" style={{ fontFamily: "Poppins, sans-serif" }}>
          WHY ETQAN
        </span>
        <h2 className="mt-3 text-3xl font-bold text-cream md:text-5xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
          حرفة تُتقَن، وثقة تُبنى
        </h2>
        <p className="mt-4 text-base leading-loose text-cream-dim md:text-lg">
          كل قطعة نصنعها تحمل روح الحرفة الأصيلة، بمعايير حديثة وأخشاب مختارة تدوم للأجيال.
        </p>
      </div>
    </section>
  );
}

/* ============================ CONSULTATION FORM ============================ */
type FormState = {
  name: string;
  phone: string;
  city: string;
  projectTypes: string[];
  style: string;
  budget: string;
  wood: string;
  description: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  city: "",
  projectTypes: [],
  style: "",
  budget: "",
  wood: "",
  description: "",
};

function ConsultationSection() {
  const settings = useSiteSettings();
  const submitFn = useServerFn(submitContact);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const toggleType = (t: string) =>
    setForm((f) => ({
      ...f,
      projectTypes: f.projectTypes.includes(t)
        ? f.projectTypes.filter((x) => x !== t)
        : [...f.projectTypes, t],
    }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // 1) Save to database (fire and continue; don't block WhatsApp if it fails)
    try {
      await submitFn({
        data: {
          name: form.name,
          phone: form.phone,
          city: form.city || null,
          projectTypes: form.projectTypes,
          style: form.style || null,
          budget: form.budget || null,
          wood: form.wood || null,
          description: form.description || null,
        },
      });
    } catch (err) {
      console.error("Failed to save contact message:", err);
    }
    setSubmitting(false);

    // 2) Open WhatsApp with pre-filled message
    const msg =
      `السلام عليكم،\n` +
      `لدي طلب جديد من خلال الموقع.\n` +
      `━━━━━━━━━━━━━━\n\n` +
      `👤 الاسم\n${form.name || "—"}\n\n` +
      `📞 الهاتف\n${form.phone || "—"}\n\n` +
      `📍 المدينة\n${form.city || "—"}\n\n` +
      `🪵 نوع المشروع\n${form.projectTypes.length ? form.projectTypes.join("، ") : "—"}\n\n` +
      `🎨 النمط\n${form.style || "—"}\n\n` +
      `💰 الميزانية\n${form.budget || "—"}\n\n` +
      `🌳 نوع الخشب\n${form.wood || "—"}\n\n` +
      `💬 وصف المشروع\n${form.description || "—"}\n\n` +
      `━━━━━━━━━━━━━━\n` +
      `تم إرسال الطلب من الموقع الإلكتروني.`;
    const url = `https://wa.me/${settings.whatsapp_phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const perks = [
    { icon: "🕒", title: "الرد خلال أقل من ساعة" },
    { icon: "📐", title: "استشارة وتصميم مجاني" },
    { icon: "🛡", title: "ضمان على التنفيذ" },
    { icon: "🚚", title: "قياس وتركيب احترافي" },
    { icon: "⭐", title: "أكثر من 350 مشروع منفَّذ" },
  ];

  return (
    <section id="consult" className="relative px-[6vw] py-24 md:py-32">
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute right-1/4 top-20 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-gold-light/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-xs font-medium tracking-[0.24em] text-gold-light" style={{ fontFamily: "Poppins, sans-serif" }}>
            📋 CONSULTATION
          </span>
          <h2 className="mt-3 text-3xl font-bold text-cream md:text-5xl" style={{ fontFamily: "Aref Ruqaa, serif" }}>
            اطلب استشارة مجانية
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-loose text-cream-dim md:text-lg">
            املأ البيانات التالية، وسيتواصل معك فريقنا خلال وقت قصير لتقديم أفضل تصميم وعرض سعر يناسب احتياجاتك.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Perks card (40%) */}
          <aside className="glass relative overflow-hidden rounded-3xl p-8 lg:col-span-2">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative">
              <h3 className="text-2xl font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>
                لماذا يختار العملاء إتقان؟
              </h3>
              <p className="mt-3 text-sm leading-loose text-cream-dim">
                تجربة تصميم داخلي متكاملة — من الفكرة حتى التركيب.
              </p>

              <ul className="mt-8 space-y-4">
                {perks.map((p) => (
                  <li key={p.title} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-xl">
                      {p.icon}
                    </span>
                    <span className="text-[15px] text-cream">{p.title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs text-cream-dimmer" style={{ fontFamily: "Poppins, sans-serif" }}>
                  DIRECT LINE
                </div>
                <a
                  href={`tel:+${settings.whatsapp_phone}`}
                  className="mt-1 block text-2xl font-bold text-gold-light hover:text-gold"
                  style={{ fontFamily: "Poppins, sans-serif", direction: "ltr" }}
                >
                  {settings.whatsapp_display}
                </a>
                <div className="mt-1 text-xs text-cream-dim">اتصال مباشر أو واتساب</div>
              </div>
            </div>
          </aside>

          {/* Form (60%) */}
          <form
            onSubmit={submit}
            className="glass rounded-3xl p-6 md:p-10 lg:col-span-3"
          >
            <SectionLabel icon="👤" title="المعلومات الشخصية" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الاسم بالكامل">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="أدخل اسمك"
                  className={inputCls}
                />
              </Field>
              <Field label="رقم الهاتف">
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className={inputCls}
                  dir="ltr"
                />
              </Field>
              <Field label="المدينة">
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="القاهرة، الجيزة، ..."
                  className={inputCls}
                />
              </Field>
              <Field label="النمط المفضل">
                <select
                  value={form.style}
                  onChange={(e) => setForm({ ...form, style: e.target.value })}
                  className={inputCls}
                >
                  <option value="">اختر النمط</option>
                  {STYLES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>

            <div className="my-8 h-px bg-white/10" />
            <SectionLabel icon="🪵" title="تفاصيل المشروع" />

            <div className="mb-5">
              <div className="mb-3 text-[13px] text-cream-dim">نوع المشروع (يمكن اختيار أكثر من واحد)</div>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => {
                  const on = form.projectTypes.includes(t);
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        on
                          ? "border-gold bg-gold/20 text-cream"
                          : "border-white/12 bg-white/5 text-cream-dim hover:border-white/25 hover:text-cream"
                      }`}
                    >
                      {on ? "✓ " : ""}{t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="الميزانية التقريبية">
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className={inputCls}
                >
                  <option value="">اختر الميزانية</option>
                  {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="نوع الخشب (اختياري)">
                <select
                  value={form.wood}
                  onChange={(e) => setForm({ ...form, wood: e.target.value })}
                  className={inputCls}
                >
                  <option value="">اختر النوع</option>
                  {WOODS.map((w) => <option key={w}>{w}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field label="💬 وصف المشروع">
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={5}
                  placeholder="مثال: أريد تنفيذ مطبخ مودرن بمقاس ٤×٣ متر مع جزيرة وسطية، وأفضل الألوان الخشبية الفاتحة، وأحتاج إلى اقتراح أفضل نوع خشب يناسب الميزانية."
                  className={`${inputCls} resize-none leading-loose`}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl py-5 text-lg font-bold text-[#20140a] shadow-[0_16px_36px_rgba(201,151,79,0.35)] transition-transform hover:-translate-y-1 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, var(--gold-light), var(--gold))" }}
            >
              <WhatsAppIcon className="h-6 w-6" />
              {submitting ? "جاري الإرسال..." : "احصل على عرض سعر عبر واتساب"}
            </button>

            <p className="mt-4 text-center text-xs text-cream-dimmer">
              سيتم فتح واتساب برسالة جاهزة تحتوي على بياناتك. لن يتم إرسال أي شيء بدون موافقتك.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-[15px] text-cream outline-none transition-colors placeholder:text-cream-dimmer focus:border-gold focus:bg-white/10";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] text-cream-dim">{label}</span>
      {children}
    </label>
  );
}

function SectionLabel({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-gold/25 bg-gold/10 text-base">{icon}</span>
      <h3 className="text-xl font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>{title}</h3>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  const s = useSiteSettings();
  return (
    <footer className="border-t border-white/5 bg-[#0f0a06] px-[6vw] py-14">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="grid h-11 w-11 place-items-center rounded-lg text-xl font-bold text-[#1c130b]"
              style={{
                background: "linear-gradient(145deg, var(--gold-light), var(--wood-700))",
                fontFamily: "Aref Ruqaa, serif",
              }}
            >
              إ
            </div>
            <div>
              <div className="text-lg font-bold text-cream" style={{ fontFamily: "Aref Ruqaa, serif" }}>إتقان للنجارة</div>
              <div className="text-[10px] tracking-[0.24em] text-gold-light" style={{ fontFamily: "Poppins, sans-serif" }}>ETQAN CARPENTRY</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-loose text-cream-dim">
            نصنع أثاثاً يدوم للأجيال، بحرفية أصيلة ومعايير حديثة.
          </p>
        </div>
        <div>
          <div className="mb-4 text-sm font-bold text-cream">تواصل</div>
          <ul className="space-y-2 text-sm text-cream-dim">
            <li>
              <a href={`tel:+${s.whatsapp_phone}`} className="hover:text-gold-light" dir="ltr">{s.whatsapp_display}</a>
            </li>
            <li>
              <a href={`https://wa.me/${s.whatsapp_phone}`} target="_blank" rel="noreferrer" className="hover:text-gold-light">
                واتساب مباشر
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-cream-dimmer md:text-left">
          © {new Date().getFullYear()} إتقان للنجارة. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}

/* ============================ WHATSAPP FLOAT ============================ */
function WhatsAppFloat() {
  const s = useSiteSettings();
  return (
    <a
      href={`https://wa.me/${s.whatsapp_phone}?text=${encodeURIComponent("السلام عليكم، أود الاستفسار عن خدمات إتقان للنجارة.")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-2 text-center"
      aria-label="تواصل عبر واتساب"
    >
      <span className="animate-wa-pulse grid h-14 w-14 place-items-center rounded-full bg-whatsapp shadow-[0_10px_24px_rgba(37,211,102,0.5)]">
        <WhatsAppIcon className="h-7 w-7 text-white" />
      </span>
      <span className="hidden text-[11px] leading-tight text-cream-dim md:block">
        تواصل معنا<br />عبر واتساب
      </span>
    </a>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.09 1.09 0 0 0-.79.371c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.594 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.005c6.581 0 11.94-5.335 11.943-11.893A11.82 11.82 0 0 0 20.52 3.449M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.36-.214-3.742.976 1.005-3.635-.235-.374a9.86 9.86 0 0 1-1.51-5.267c.002-5.45 4.437-9.884 9.881-9.884 2.64 0 5.121 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.451-4.437 9.884-9.885 9.884" />
    </svg>
  );
}
