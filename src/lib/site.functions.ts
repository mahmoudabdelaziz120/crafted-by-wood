import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb.from("site_settings").select("*").eq("id", 1).maybeSingle();
  return data;
});

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const { data } = await sb.from("services").select("*").eq("is_active", true).order("order_index");
  return data ?? [];
});

export const getGalleryForService = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: rows } = await sb
      .from("gallery_images")
      .select("*")
      .eq("service_slug", data.slug)
      .order("order_index");
    return rows ?? [];
  });

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(30),
  city: z.string().trim().max(100).optional().nullable(),
  projectTypes: z.array(z.string().max(50)).max(20).optional().nullable(),
  style: z.string().max(50).optional().nullable(),
  budget: z.string().max(50).optional().nullable(),
  wood: z.string().max(50).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { error } = await sb.from("contact_messages").insert({
      name: data.name,
      phone: data.phone,
      city: data.city ?? null,
      project_types: data.projectTypes ?? null,
      style: data.style ?? null,
      budget: data.budget ?? null,
      wood: data.wood ?? null,
      description: data.description ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
