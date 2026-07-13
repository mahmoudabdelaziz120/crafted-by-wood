import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminGetSettings, adminUpdateSettings } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/hero")({
  component: HeroSettings,
  head: () => ({ meta: [{ title: "إعدادات الرئيسية | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function HeroSettings() {
  const getFn = useServerFn(adminGetSettings);
  const updateFn = useServerFn(adminUpdateSettings);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin-settings"], queryFn: () => getFn() });
  const [form, setForm] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { if (data && !form) setForm(data); }, [data, form]);

  const m = useMutation({
    mutationFn: (payload: any) => updateFn({ data: payload }),
    onSuccess: () => {
      setSaved(true);
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      setTimeout(() => setSaved(false), 2500);
    },
  });

  if (!form) return <AdminShell title="إعدادات الصفحة الرئيسية"><p>جاري التحميل...</p></AdminShell>;

  function set(k: string, v: string) { setForm({ ...form, [k]: v }); }

  return (
    <AdminShell title="إعدادات الصفحة الرئيسية">
      <form
        onSubmit={(e) => { e.preventDefault(); const { id: _id, updated_at: _u, ...rest } = form; m.mutate(rest); }}
        className="rounded-3xl bg-white/70 border border-black/10 p-6 max-w-3xl space-y-5"
      >
        <Section title="عنوان الـ Hero">
          <Field label="العنوان الرئيسي"><Input value={form.hero_title} onChange={(v) => set("hero_title", v)} /></Field>
          <Field label="النص الفرعي"><Textarea value={form.hero_subtitle} onChange={(v) => set("hero_subtitle", v)} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="نص الزر الرئيسي"><Input value={form.hero_cta_primary} onChange={(v) => set("hero_cta_primary", v)} /></Field>
            <Field label="نص الزر الثانوي"><Input value={form.hero_cta_secondary} onChange={(v) => set("hero_cta_secondary", v)} /></Field>
          </div>
        </Section>

        <Section title="واتساب">
          <div className="grid grid-cols-2 gap-4">
            <Field label="رقم واتساب (بدون +)"><Input dir="ltr" value={form.whatsapp_phone} onChange={(v) => set("whatsapp_phone", v)} /></Field>
            <Field label="الرقم للعرض"><Input dir="ltr" value={form.whatsapp_display} onChange={(v) => set("whatsapp_display", v)} /></Field>
          </div>
        </Section>

        <Section title="الإحصائيات">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Field label="عدد المشاريع"><Input value={form.stat_projects} onChange={(v) => set("stat_projects", v)} /></Field>
            <Field label="سنوات الخبرة"><Input value={form.stat_years} onChange={(v) => set("stat_years", v)} /></Field>
            <Field label="الالتزام بالمواعيد"><Input value={form.stat_ontime} onChange={(v) => set("stat_ontime", v)} /></Field>
            <Field label="الأخشاب الطبيعية"><Input value={form.stat_wood} onChange={(v) => set("stat_wood", v)} /></Field>
          </div>
        </Section>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={m.isPending}
            className="rounded-xl bg-[#c9974f] px-6 py-3 font-bold text-white disabled:opacity-50"
          >
            {m.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
          {saved && <span className="text-green-600 text-sm">✓ تم الحفظ</span>}
          {m.isError && <span className="text-red-600 text-sm">فشل الحفظ</span>}
        </div>
      </form>
    </AdminShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-bold text-lg" style={{ fontFamily: "Aref Ruqaa, serif" }}>{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs text-black/60 mb-1 block">{label}</span>{children}</label>;
}
function Input(props: { value: string; onChange: (v: string) => void; dir?: string }) {
  return (
    <input
      dir={props.dir}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 focus:border-[#c9974f] focus:outline-none"
    />
  );
}
function Textarea(props: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      rows={3}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 focus:border-[#c9974f] focus:outline-none"
    />
  );
}
