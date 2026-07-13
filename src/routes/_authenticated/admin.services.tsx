import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListServices, adminUpdateService } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/services")({
  component: ServicesAdmin,
  head: () => ({ meta: [{ title: "الخدمات | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function ServicesAdmin() {
  const listFn = useServerFn(adminListServices);
  const updateFn = useServerFn(adminUpdateService);
  const qc = useQueryClient();
  const { data: services } = useQuery({ queryKey: ["admin-services"], queryFn: () => listFn() });
  const [editing, setEditing] = useState<any | null>(null);

  const m = useMutation({
    mutationFn: (payload: any) => updateFn({ data: payload }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-services"] });
      qc.invalidateQueries({ queryKey: ["services"] });
      setEditing(null);
    },
  });

  return (
    <AdminShell title="إدارة الخدمات">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(services ?? []).map((s: any) => (
          <div key={s.id} className="rounded-2xl bg-white/70 border border-black/10 p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold" style={{ fontFamily: "Aref Ruqaa, serif" }}>{s.label_ar}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.is_active ? "bg-green-100 text-green-700" : "bg-black/10 text-black/60"}`}>
                {s.is_active ? "نشط" : "مخفي"}
              </span>
            </div>
            <p className="text-sm text-black/60 mb-3">{s.tagline}</p>
            <button
              onClick={() => setEditing(s)}
              className="rounded-lg bg-[#c9974f] text-white px-4 py-2 text-sm"
            >تعديل</button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Aref Ruqaa, serif" }}>تعديل: {editing.label_ar}</h2>
            <div className="space-y-3">
              <Row label="الاسم بالعربي"><Input value={editing.label_ar} onChange={(v) => setEditing({ ...editing, label_ar: v })} /></Row>
              <Row label="الاسم بالإنجليزي"><Input value={editing.label_en} onChange={(v) => setEditing({ ...editing, label_en: v })} /></Row>
              <Row label="Tagline"><Input value={editing.tagline ?? ""} onChange={(v) => setEditing({ ...editing, tagline: v })} /></Row>
              <Row label="عنوان الـ Hero"><Input value={editing.hero_title ?? ""} onChange={(v) => setEditing({ ...editing, hero_title: v })} /></Row>
              <Row label="نص الـ Hero"><Textarea value={editing.hero_sub ?? ""} onChange={(v) => setEditing({ ...editing, hero_sub: v })} /></Row>
              <Row label="مقدمة"><Textarea value={editing.intro ?? ""} onChange={(v) => setEditing({ ...editing, intro: v })} /></Row>
              <Row label="رابط صورة الـ Hero (URL)"><Input dir="ltr" value={editing.hero_image_url ?? ""} onChange={(v) => setEditing({ ...editing, hero_image_url: v })} /></Row>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} />
                <span>نشط ومرئي للزوار</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => m.mutate({
                  id: editing.id,
                  label_ar: editing.label_ar,
                  label_en: editing.label_en,
                  tagline: editing.tagline,
                  hero_title: editing.hero_title,
                  hero_sub: editing.hero_sub,
                  intro: editing.intro,
                  hero_image_url: editing.hero_image_url,
                  is_active: editing.is_active,
                  order_index: editing.order_index,
                })}
                disabled={m.isPending}
                className="rounded-lg bg-[#c9974f] text-white px-6 py-2.5 font-bold disabled:opacity-50"
              >
                {m.isPending ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button onClick={() => setEditing(null)} className="rounded-lg bg-black/10 px-6 py-2.5">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-xs text-black/60 mb-1 block">{label}</span>{children}</label>;
}
function Input(props: { value: string; onChange: (v: string) => void; dir?: string }) {
  return <input dir={props.dir} value={props.value} onChange={(e) => props.onChange(e.target.value)} className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 focus:border-[#c9974f] focus:outline-none" />;
}
function Textarea(props: { value: string; onChange: (v: string) => void }) {
  return <textarea rows={3} value={props.value} onChange={(e) => props.onChange(e.target.value)} className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 focus:border-[#c9974f] focus:outline-none" />;
}
