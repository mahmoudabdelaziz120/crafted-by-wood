// Icons
import iconHome from "@/assets/dock/icon-home.png";
import iconKitchens from "@/assets/dock/icon-kitchens.png";
import iconBedrooms from "@/assets/dock/icon-bedrooms.png";
import iconWardrobes from "@/assets/dock/icon-wardrobes.png";
import iconOffices from "@/assets/dock/icon-offices.png";
import iconLibraries from "@/assets/dock/icon-libraries.png";
import iconDoors from "@/assets/dock/icon-doors.png";
import iconCustom from "@/assets/dock/icon-custom.png";
import logoEtqan from "@/assets/dock/logo-etqan.png";

// Heroes
import heroKitchens from "@/assets/heroes/hero-kitchens.jpg";
import heroBedrooms from "@/assets/heroes/hero-bedrooms.jpg";
import heroWardrobes from "@/assets/heroes/hero-wardrobes.jpg";
import heroOffices from "@/assets/heroes/hero-offices.jpg";
import heroLibraries from "@/assets/heroes/hero-libraries.jpg";
import heroDoors from "@/assets/heroes/hero-doors.jpg";
import heroCustom from "@/assets/heroes/hero-custom.jpg";

// Gallery
import k1 from "@/assets/gallery/kitchens-1.jpg";
import k2 from "@/assets/gallery/kitchens-2.jpg";
import k3 from "@/assets/gallery/kitchens-3.jpg";
import b1 from "@/assets/gallery/bedrooms-1.jpg";
import b2 from "@/assets/gallery/bedrooms-2.jpg";
import b3 from "@/assets/gallery/bedrooms-3.jpg";
import w1 from "@/assets/gallery/wardrobes-1.jpg";
import w2 from "@/assets/gallery/wardrobes-2.jpg";
import w3 from "@/assets/gallery/wardrobes-3.jpg";
import o1 from "@/assets/gallery/offices-1.jpg";
import o2 from "@/assets/gallery/offices-2.jpg";
import o3 from "@/assets/gallery/offices-3.jpg";
import l1 from "@/assets/gallery/libraries-1.jpg";
import l2 from "@/assets/gallery/libraries-2.jpg";
import l3 from "@/assets/gallery/libraries-3.jpg";
import d1 from "@/assets/gallery/doors-1.jpg";
import d2 from "@/assets/gallery/doors-2.jpg";
import d3 from "@/assets/gallery/doors-3.jpg";
import c1 from "@/assets/gallery/custom-1.jpg";
import c2 from "@/assets/gallery/custom-2.jpg";
import c3 from "@/assets/gallery/custom-3.jpg";

export const ETQAN_LOGO = logoEtqan;

export type Service = {
  slug: string;
  path: "/kitchens" | "/bedrooms" | "/wardrobes" | "/offices" | "/libraries" | "/doors" | "/custom-furniture";
  icon: string;
  iconImage: string;
  heroImage: string;
  labelAr: string;
  labelEn: string;
  tagline: string;
  heroTitle: string;
  heroSub: string;
  intro: string;
  features: { icon: string; title: string; desc: string }[];
  materials: string[];
  gallery: { title: string; desc: string; image: string }[];
  faq: { q: string; a: string }[];
  seoTitle: string;
  seoDesc: string;
};

export const SERVICES: Service[] = [
  {
    slug: "kitchens",
    path: "/kitchens",
    icon: "🪵",
    iconImage: iconKitchens,
    heroImage: heroKitchens,
    labelAr: "مطابخ",
    labelEn: "Kitchens",
    tagline: "قلب المنزل، بحرفية إتقان",
    heroTitle: "مطابخ فاخرة تُصنع لتدوم",
    heroSub: "تصميم وتنفيذ مطابخ عصرية وكلاسيكية بأدق التفاصيل — من القياس حتى التركيب.",
    intro:
      "المطبخ ليس مجرد مساحة للطهي، بل هو قلب المنزل النابض. في إتقان نصمم مطابخ تجمع بين الجمال والوظيفة، باستخدام أفضل أنواع الأخشاب والإكسسوارات الأوروبية لضمان تجربة استخدام يومية استثنائية.",
    features: [
      { icon: "📐", title: "تصميم ثلاثي الأبعاد", desc: "نعرض عليك تصميم كامل للمطبخ قبل التنفيذ." },
      { icon: "🪵", title: "أخشاب مقاومة للرطوبة", desc: "MDF مضاد للماء وكونتر عالي الجودة." },
      { icon: "🔩", title: "إكسسوارات هيتش وبلوم", desc: "مفصلات ومجاري درج بضمان طويل الأمد." },
      { icon: "💡", title: "إضاءة LED مدمجة", desc: "إضاءة داخلية للدواليب وتحت الوحدات." },
      { icon: "🎨", title: "دهانات دوكو ولاكيه", desc: "لمسات نهائية ملساء ومقاومة للخدش." },
      { icon: "🛡", title: "ضمان 5 سنوات", desc: "على التصنيع والإكسسوارات." },
    ],
    materials: ["MDF مضاد للماء", "كونتر إسباني", "قشرة خشب طبيعي", "أكريليك لامع", "زجاج معشق", "استانلس ستيل"],
    gallery: [
      { title: "مطبخ مودرن أبيض", desc: "خطوط نظيفة، إضاءة مخفية، جزيرة وسطية.", image: k1 },
      { title: "مطبخ نيو كلاسيك", desc: "تفاصيل محفورة، دهان لاكيه، مقابض ذهبية.", image: k2 },
      { title: "مطبخ خشب طبيعي", desc: "دفء الخشب الطبيعي مع لمسات نحاسية.", image: k3 },
    ],
    faq: [
      { q: "كم يستغرق تنفيذ المطبخ؟", a: "عادة من 3 إلى 6 أسابيع حسب حجم المشروع ودرجة التخصيص." },
      { q: "هل يشمل السعر التركيب؟", a: "نعم، السعر شامل القياس والنقل والتركيب والضمان." },
      { q: "ما أفضل نوع خشب للمطبخ؟", a: "MDF مضاد للماء مع كونتر عالي الجودة هو الخيار الأمثل من حيث القيمة." },
    ],
    seoTitle: "مطابخ فاخرة | تصميم وتنفيذ مطابخ خشبية — إتقان للنجارة",
    seoDesc: "تصميم وتنفيذ مطابخ مودرن وكلاسيك بأعلى جودة، أخشاب مقاومة للرطوبة، إكسسوارات أوروبية وضمان 5 سنوات.",
  },
  {
    slug: "bedrooms",
    path: "/bedrooms",
    icon: "🛏",
    iconImage: iconBedrooms,
    heroImage: heroBedrooms,
    labelAr: "غرف نوم",
    labelEn: "Bedrooms",
    tagline: "راحة تشبهك، أناقة تدوم",
    heroTitle: "غرف نوم تُروى فيها القصص",
    heroSub: "تصاميم متكاملة تجمع بين الفخامة والدفء، بأناقة تعكس ذوقك الخاص.",
    intro:
      "غرفة النوم هي ملاذك الشخصي. نصمم غرف نوم متكاملة (سرير، كوموندينو، تسريحة، دولاب) بتناغم بصري كامل وخامات فاخرة تمنحك شعوراً بالراحة كل يوم.",
    features: [
      { icon: "🛌", title: "سرير مصمم خصيصاً", desc: "بمقاسات ومواصفات حسب مساحتك." },
      { icon: "💎", title: "تفاصيل يدوية", desc: "نقوش وحفر يدوي على الطراز الكلاسيكي." },
      { icon: "🪞", title: "تسريحات بإضاءة LED", desc: "مرايا بإضاءة قابلة للتحكم." },
      { icon: "🎨", title: "تنسيق ألوان كامل", desc: "نساعدك في اختيار لوحة الألوان المثالية." },
      { icon: "📏", title: "استغلال أمثل للمساحة", desc: "حلول تخزين مبتكرة تحت السرير وفي الرؤوس." },
      { icon: "🛡", title: "ضمان تنفيذ", desc: "على جميع القطع والدهانات." },
    ],
    materials: ["MDF عالي الكثافة", "قشرة أوك", "قشرة والنت", "دهان دوكو مطفي", "أقمشة كابيتونيه"],
    gallery: [
      { title: "غرفة نوم مودرن", desc: "خطوط منخفضة، ألوان محايدة، إضاءة دافئة.", image: b1 },
      { title: "غرفة نوم كلاسيك", desc: "رأس سرير كابيتونيه، تفاصيل ذهبية.", image: b2 },
      { title: "غرفة نوم أطفال", desc: "تصاميم آمنة وممتعة بألوان هادئة.", image: b3 },
    ],
    faq: [
      { q: "هل يمكن تصميم غرفة نوم كاملة؟", a: "نعم، نصمم وننفذ الغرفة كاملة بتناغم بصري كامل." },
      { q: "ما مدة التنفيذ؟", a: "من 4 إلى 8 أسابيع حسب التصميم." },
    ],
    seoTitle: "غرف نوم فاخرة | تصميم غرف نوم مودرن وكلاسيك — إتقان",
    seoDesc: "تصميم وتنفيذ غرف نوم متكاملة بخامات فاخرة وأدق التفاصيل، بأسعار تنافسية وضمان.",
  },
  {
    slug: "wardrobes",
    path: "/wardrobes",
    icon: "🚪",
    iconImage: iconWardrobes,
    heroImage: heroWardrobes,
    labelAr: "دواليب",
    labelEn: "Wardrobes",
    tagline: "تنظيم يليق بأناقتك",
    heroTitle: "دواليب مصممة لكل زاوية",
    heroSub: "دواليب مفصلة حسب المساحة، بحلول تخزين ذكية وتشطيبات فاخرة.",
    intro:
      "الدولاب الجيد يوفر مساحة، ويسهّل حياتك اليومية. نصمم دواليب بمقاسات دقيقة تستغل كل سنتيمتر من مساحتك، مع تقسيمات داخلية ذكية.",
    features: [
      { icon: "📐", title: "قياس ميداني دقيق", desc: "زيارة موقع مجانية لأخذ القياسات." },
      { icon: "🗄", title: "تقسيمات داخلية ذكية", desc: "أدراج، أرفف، وحوامل بنطلونات وأحذية." },
      { icon: "💡", title: "إضاءة داخلية", desc: "إضاءة LED تعمل بحساس عند فتح الباب." },
      { icon: "🚪", title: "أبواب سحابة أو مفصلات", desc: "حسب المساحة والاستخدام." },
      { icon: "🪞", title: "مرايا مدمجة", desc: "مرايا داخلية أو خارجية بإطار خشبي." },
      { icon: "🛡", title: "ضمان الإكسسوارات", desc: "على المفصلات والمجاري." },
    ],
    materials: ["MDF عالي الجودة", "أكريليك لامع", "قشرة خشب", "زجاج مضبب", "بروفيلات ألومنيوم"],
    gallery: [
      { title: "دولاب سحّاب مودرن", desc: "أبواب زجاجية مع بروفيلات ألومنيوم.", image: w1 },
      { title: "دريسنج روم كامل", desc: "غرفة ملابس متكاملة بجزيرة وسطية.", image: w2 },
      { title: "دولاب كلاسيك", desc: "تفاصيل محفورة ومقابض معدنية.", image: w3 },
    ],
    faq: [
      { q: "هل تنفذون دريسنج روم؟", a: "نعم، من أبسط دولاب حتى غرفة ملابس كاملة." },
    ],
    seoTitle: "دواليب فاخرة | تصميم دواليب سحاب ومفصلات — إتقان",
    seoDesc: "دواليب مصممة حسب مساحتك، بتقسيمات داخلية ذكية وتشطيبات فاخرة.",
  },
  {
    slug: "offices",
    path: "/offices",
    icon: "🪑",
    iconImage: iconOffices,
    heroImage: heroOffices,
    labelAr: "مكاتب",
    labelEn: "Offices",
    tagline: "بيئة عمل تلهم الإبداع",
    heroTitle: "مكاتب تعكس هيبة عملك",
    heroSub: "مكاتب تنفيذية ومكاتب منزلية بتصاميم تجمع الأناقة والعملية.",
    intro:
      "بيئة العمل الجيدة تصنع فارقاً. نصمم مكاتب متكاملة (مكتب تنفيذي، كراسي، مكتبات، طاولات اجتماع) بخامات فاخرة تعكس هوية شركتك.",
    features: [
      { icon: "💼", title: "مكاتب تنفيذية", desc: "بتصاميم تعكس مكانتك المهنية." },
      { icon: "🏢", title: "أثاث شركات كامل", desc: "من مكتب واحد حتى تجهيز مقر كامل." },
      { icon: "🔌", title: "تمديدات كهرباء مدمجة", desc: "مخارج للكهرباء والشبكات داخل المكتب." },
      { icon: "📚", title: "مكتبات جانبية", desc: "بتصاميم متناسقة مع المكتب." },
      { icon: "🎨", title: "تخصيص كامل", desc: "الألوان والمقاسات والتشطيبات." },
    ],
    materials: ["قشرة والنت", "قشرة أوك", "MDF لاكيه", "زجاج تمبرد", "جلد طبيعي"],
    gallery: [
      { title: "مكتب تنفيذي فاخر", desc: "قشرة والنت مع تفاصيل جلدية.", image: o1 },
      { title: "مكتب منزلي مودرن", desc: "حل عملي لمساحة العمل من المنزل.", image: o2 },
      { title: "قاعة اجتماعات", desc: "طاولة اجتماعات كبيرة بتشطيب فاخر.", image: o3 },
    ],
    faq: [
      { q: "هل تنفذون مقرات شركات كاملة؟", a: "نعم، لدينا خبرة في تجهيز مقرات شركات ومكاتب محاماة وعيادات." },
    ],
    seoTitle: "مكاتب تنفيذية فاخرة | أثاث مكاتب وشركات — إتقان",
    seoDesc: "تصميم وتنفيذ مكاتب تنفيذية وأثاث شركات كامل بخامات فاخرة.",
  },
  {
    slug: "libraries",
    path: "/libraries",
    icon: "📚",
    iconImage: iconLibraries,
    heroImage: heroLibraries,
    labelAr: "مكتبات",
    labelEn: "Libraries",
    tagline: "للكتب مكانها اللائق",
    heroTitle: "مكتبات تحكي شغفك بالمعرفة",
    heroSub: "مكتبات مصممة خصيصاً لتناسب مقتنياتك، بأناقة تمنح غرفتك طابعاً فريداً.",
    intro:
      "المكتبة الجيدة هي قطعة أثاث محورية. نصمم مكتبات بأشكال متعددة (حائط كامل، جانبية، مقسمات غرف) لتعرض كتبك ومقتنياتك بأناقة.",
    features: [
      { icon: "📖", title: "أرفف قابلة للتعديل", desc: "لتناسب كل مقاسات الكتب." },
      { icon: "💡", title: "إضاءة داخلية", desc: "لعرض القطع الثمينة." },
      { icon: "🔲", title: "مقسمات غرف", desc: "مكتبات مفتوحة الوجهين." },
      { icon: "🎨", title: "تنفيذ حائط كامل", desc: "من الأرض للسقف بتصميم موحد." },
    ],
    materials: ["MDF عالي الجودة", "قشرة خشب طبيعي", "زجاج", "معدن مطلي"],
    gallery: [
      { title: "مكتبة حائط كامل", desc: "من الأرض للسقف مع سلم متحرك.", image: l1 },
      { title: "مكتبة مودرن مفتوحة", desc: "أرفف معلقة بتوزيع فني.", image: l2 },
      { title: "مكتبة كلاسيكية", desc: "بتفاصيل محفورة وأبواب زجاجية.", image: l3 },
    ],
    faq: [
      { q: "هل يمكن تصميم مكتبة تناسب سقفاً عالياً؟", a: "نعم، ننفذ مكتبات ارتفاع كامل مع سلم إن لزم." },
    ],
    seoTitle: "مكتبات خشبية فاخرة | تصميم مكتبات منزلية — إتقان",
    seoDesc: "مكتبات مصممة حسب الطلب بأشكال وأحجام متعددة، بخامات فاخرة.",
  },
  {
    slug: "doors",
    path: "/doors",
    icon: "🚪",
    iconImage: iconDoors,
    heroImage: heroDoors,
    labelAr: "أبواب",
    labelEn: "Doors",
    tagline: "أول انطباع يبقى",
    heroTitle: "أبواب خشبية فاخرة",
    heroSub: "أبواب داخلية وخارجية بتصاميم متعددة، من الكلاسيكي حتى المودرن.",
    intro:
      "الباب هو أول ما يستقبل ضيوفك. نصنع أبواباً خشبية بأنماط متعددة، بأخشاب مصمتة أو HDF عالي الجودة، بتشطيبات تدوم.",
    features: [
      { icon: "🚪", title: "أبواب رئيسية", desc: "أبواب مدخل بتصاميم فاخرة." },
      { icon: "🏠", title: "أبواب داخلية", desc: "بتصاميم متناسقة مع ديكور المنزل." },
      { icon: "🔒", title: "أقفال أمان", desc: "أقفال متعددة النقاط للأبواب الرئيسية." },
      { icon: "🎨", title: "دهانات فاخرة", desc: "دوكو، لاكيه، أو تشطيب طبيعي." },
    ],
    materials: ["زان مصمت", "HDF مضغوط", "قشرة أوك", "قشرة والنت"],
    gallery: [
      { title: "باب مدخل رئيسي", desc: "خشب زان مصمت مع تفاصيل نحاسية.", image: d1 },
      { title: "أبواب داخلية مودرن", desc: "خطوط نظيفة وتفاصيل بسيطة.", image: d2 },
      { title: "أبواب كلاسيك محفورة", desc: "نقوش يدوية على الطراز الفرنسي.", image: d3 },
    ],
    faq: [
      { q: "ما الفرق بين الزان والHDF؟", a: "الزان مصمت وأثقل وأكثر متانة، بينما HDF أخف وأقل تكلفة." },
    ],
    seoTitle: "أبواب خشبية فاخرة | أبواب رئيسية وداخلية — إتقان",
    seoDesc: "تصنيع أبواب خشبية بجميع الأنماط، بأخشاب مصمتة وتشطيبات فاخرة.",
  },
  {
    slug: "custom-furniture",
    path: "/custom-furniture",
    icon: "✨",
    iconImage: iconCustom,
    heroImage: heroCustom,
    labelAr: "أثاث حسب الطلب",
    labelEn: "Custom Furniture",
    tagline: "قطعة فريدة تحمل بصمتك",
    heroTitle: "أثاث يُصنع خصيصاً لك",
    heroSub: "أي قطعة تتخيلها، نحوّلها إلى واقع — بحرفية إتقان.",
    intro:
      "أحياناً القطعة المناسبة لا توجد في السوق. نصمم وننفذ أي قطعة أثاث بمواصفاتك الدقيقة — من طاولة طعام مميزة إلى وحدة تلفزيون حائطية أو قطعة ديكور فريدة.",
    features: [
      { icon: "✏️", title: "تصميم من الصفر", desc: "نحوّل فكرتك إلى تصميم ثلاثي الأبعاد." },
      { icon: "🎯", title: "مقاسات دقيقة", desc: "تفصيلاً على مساحتك واحتياجك." },
      { icon: "🎨", title: "خامات مختارة", desc: "أنت تختار الخشب والتشطيب والألوان." },
      { icon: "🤝", title: "متابعة كاملة", desc: "من الفكرة حتى التركيب." },
    ],
    materials: ["كل أنواع الأخشاب", "معادن", "زجاج", "أقمشة فاخرة", "جلد طبيعي"],
    gallery: [
      { title: "وحدة تلفزيون حائطية", desc: "تصميم مخصص يمتد على الحائط بالكامل.", image: c1 },
      { title: "طاولة طعام فريدة", desc: "قطعة محورية لغرفة الطعام.", image: c2 },
      { title: "بار منزلي", desc: "بار داخلي بإضاءة ورفوف زجاجية.", image: c3 },
    ],
    faq: [
      { q: "ما الحد الأدنى للطلب؟", a: "لا يوجد حد أدنى — ننفذ من قطعة واحدة إلى أثاث منزل كامل." },
    ],
    seoTitle: "أثاث حسب الطلب | تصميم أثاث مخصص — إتقان للنجارة",
    seoDesc: "تصميم وتنفيذ أي قطعة أثاث بمواصفاتك الدقيقة، بخامات فاخرة وحرفية عالية.",
  },
];

export const HOME_ICON = iconHome;

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
