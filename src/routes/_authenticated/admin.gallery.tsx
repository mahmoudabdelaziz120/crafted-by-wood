import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminListServices, adminListGallery, adminAddGalleryImage, adminDeleteGalleryImage } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
  head: () => ({ meta: [{ title: "معرض الصور | إتقان" }, { name: "robots", content: "noindex" }] }),
});

function GalleryAdmin() {
  const listServicesFn = useServerFn(adminListServices);
  const listGalleryFn = useServerFn(adminListGallery);
  const addFn = useServerFn(adminAddGalleryImage);
  const delFn = useServerFn(adminDeleteGalleryImage);
  const qc = useQueryClient();

  const { data: services } = useQuery({ queryKey: ["admin-services"], queryFn: () => listServicesFn() });
  const [slug, setSlug] = useState<string>("kitchens");
  const { data: images } = useQuery({ queryKey: ["admin-gallery", slug], queryFn: () => listGalleryFn({ data: { slug } }) });

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addMut = useMutation({
    mutationFn: (p: any) => addFn({ data: p }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-gallery", slug] });
      setUrl(""); setTitle(""); setDesc("");
    },
  });

  const delMut = useMutation({
    mutationFn: (id: string) => delFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-gallery", slug] }),
  });

  return (
    <AdminShell title="معرض الصور">
      <div className="mb-6">
        <label className="text-sm text-black/60 mb-2 block">اختر القسم:</label>
        <select value={slug} onChange={(e) => setSlug(e.target.value)} className="rounded-lg border border-black/15 bg-white px-4 py-2">
          {(services ?? []).map((s: any) => <option key={s.slug} value={s.slug}>{s.label_ar}</option>)}
        </select>
      </div>

      <div className="rounded-3xl bg-white/70 border border-black/10 p-5 mb-6">
        <h3 className="font-bold mb-3" style={{ fontFamily: "Aref Ruqaa, serif" }}>إضافة صورة جديدة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input dir="ltr" placeholder="رابط الصورة (URL)" value={url} onChange={(e) => setUrl(e.target.value)} className="rounded-lg border border-black/15 bg-white px-3 py-2" />
          <input placeholder="عنوان الصورة" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-lg border border-black/15 bg-white px-3 py-2" />
          <input placeholder="وصف قصير" value={desc} onChange={(e) => setDesc(e.target.value)} className="rounded-lg border border-black/15 bg-white px-3 py-2" />
        </div>
        <button
          onClick={() => addMut.mutate({ service_slug: slug, image_url: url, title: title || null, description: desc || null, order_index: (images?.length ?? 0) })}
          disabled={!url || addMut.isPending}
          className="rounded-lg bg-[#c9974f] text-white px-5 py-2 font-bold disabled:opacity-50"
        >
          {addMut.isPending ? "جاري الإضافة..." : "إضافة"}
        </button>
        {addMut.isError && <p className="text-red-600 text-sm mt-2">فشلت الإضافة — تأكد من صحة الرابط.</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {(images ?? []).map((img: any) => (
          <div key={img.id} className="rounded-2xl bg-white border border-black/10 overflow-hidden">
            <img src={img.image_url} alt={img.title ?? ""} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="font-bold text-sm mb-1">{img.title || "بدون عنوان"}</div>
              {img.description && <div className="text-xs text-black/60 mb-2">{img.description}</div>}
              <button onClick={() => delMut.mutate(img.id)} className="text-red-600 text-xs">حذف</button>
            </div>
          </div>
        ))}
        {(images ?? []).length === 0 && <p className="text-black/50">لا توجد صور بعد.</p>}
      </div>
    </AdminShell>
  );
}
