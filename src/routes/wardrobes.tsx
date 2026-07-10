import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/ServicePage";
import { getService } from "@/lib/services";

const service = getService("wardrobes")!;

export const Route = createFileRoute("/wardrobes")({
  component: () => <ServicePage service={service} />,
  head: () => ({
    meta: [
      { title: service.seoTitle },
      { name: "description", content: service.seoDesc },
      { property: "og:title", content: service.seoTitle },
      { property: "og:description", content: service.seoDesc },
      { property: "og:type", content: "website" },
    ],
  }),
});
