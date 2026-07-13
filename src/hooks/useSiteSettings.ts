import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSiteSettings } from "@/lib/site.functions";

export type SiteSettings = {
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  whatsapp_phone: string;
  whatsapp_display: string;
  stat_projects: string;
  stat_years: string;
  stat_ontime: string;
  stat_wood: string;
};

const DEFAULTS: SiteSettings = {
  hero_title: "نصنع أثاثاً يدوم للأجيال",
  hero_subtitle: "تصميم وتنفيذ قطع أثاث فاخرة بأعلى جودة وأدق التفاصيل",
  hero_cta_primary: "احصل على عرض سعر",
  hero_cta_secondary: "شاهد أعمالنا",
  whatsapp_phone: "201064766650",
  whatsapp_display: "+20 106 476 6650",
  stat_projects: "+350",
  stat_years: "+12",
  stat_ontime: "100%",
  stat_wood: "100%",
};

export function useSiteSettings(): SiteSettings {
  const fn = useServerFn(getSiteSettings);
  const { data } = useQuery({ queryKey: ["site-settings"], queryFn: () => fn(), staleTime: 60_000 });
  return { ...DEFAULTS, ...(data ?? {}) } as SiteSettings;
}
