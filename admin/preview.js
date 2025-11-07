const { h } = window;

const safe = (value, fallback) =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback;

const imageEl = (src, alt, className) =>
  src
    ? h("img", {
        src,
        alt: alt || "",
        className,
      })
    : null;

const listOrEmpty = (value) => (Array.isArray(value) ? value : []);

function HeroPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--hero" }, [
    h(
      "small",
      {
        style: {
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#D4AF37",
          display: "block",
          marginBottom: "16px",
        },
      },
      safe(data.eyebrow, "Eyebrow Text")
    ),
    h(
      "h1",
      { style: { fontSize: "2.6rem", marginBottom: "16px" } },
      safe(data.headline, "Hero headline goes here")
    ),
    h(
      "p",
      { style: { fontSize: "1.05rem", marginBottom: "24px" } },
      safe(
        data.lead,
        "Introduce Mira's promise with a succinct lead paragraph."
      )
    ),
    imageEl(
      data.image,
      "Hero image preview",
      "cms-preview__hero-image",
    ),
  ]);
}

function AboutPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--about" }, [
    h("h2", null, safe(data.heading, "About section heading")),
    h(
      "p",
      null,
      safe(
        data.paragraph,
        "Tell the Mira story with a concise paragraph that highlights heritage and reliability."
      )
    ),
    imageEl(
      data.image,
      "About feature image",
      "cms-preview__about-image",
    ),
    h(
      "div",
      { className: "cms-preview__chips" },
      listOrEmpty(data.stats).map((item, index) =>
        h(
          "div",
          { key: index, className: "cms-preview__chip" },
          `${safe(item.label, "Stat")} · ${safe(
            item.description,
            "Descriptor"
          )}`
        )
      )
    ),
  ]);
}

function SustainabilityPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h(
    "section",
    { className: "cms-preview cms-preview--sustainability" },
    [
      h("h2", null, safe(data.heading, "Sustainability headline")),
      h(
        "p",
        null,
        safe(
          data.description,
          "Intro copy explaining Mira's sustainability philosophy."
        )
      ),
      h(
        "div",
        { className: "cms-preview__chips" },
        listOrEmpty(data.items).map((item, index) =>
          h(
            "div",
            { key: index, className: "cms-preview__chip" },
            safe(item.title, "Pillar title")
          )
        )
      ),
    ]
  );
}

function ProductsPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--products" }, [
    h("h2", null, safe(data.heading, "Product carousel heading")),
    h(
      "p",
      null,
      safe(
        data.description,
        "Short supporting copy for the product carousel."
      )
    ),
    h(
      "div",
      { className: "cms-preview__products" },
      listOrEmpty(data.items).map((item, index) =>
        h("div", { key: index, className: "cms-preview__product" }, [
          imageEl(item.image, item.name, ""),
          h("strong", null, safe(item.name, "Product Name")),
          h(
            "p",
            { style: { fontSize: "0.9rem" } },
            safe(item.text, "Add a short tasting note or feature highlight.")
          ),
        ])
      )
    ),
  ]);
}

function FacilitiesPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--facilities" }, [
    h("h2", null, safe(data.heading, "Facilities headline")),
    h(
      "p",
      null,
      safe(
        data.description,
        "Intro copy describing facilities or operational excellence."
      )
    ),
    h(
      "div",
      { className: "cms-preview__products" },
      listOrEmpty(data.facilities).map((facility, index) =>
        h("div", { key: index, className: "cms-preview__product" }, [
          imageEl(facility.image, facility.title, ""),
          h("strong", null, safe(facility.title, "Facility title")),
          h(
            "p",
            { style: { fontSize: "0.9rem" } },
            safe(facility.description, "Single sentence facility descriptor.")
          ),
        ])
      )
    ),
  ]);
}

function ContactPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--contact" }, [
    h("h2", null, safe(data.heading, "Contact headline")),
    h(
      "p",
      null,
      safe(
        data.description,
        "Lead-in copy inviting partners or customers to get in touch."
      )
    ),
    h("div", { className: "cms-preview__cta" }, [
      h("span", null, `📍 ${safe(data.address, "Company address")}`),
      h("span", null, `☎️ ${safe(data.phone, "Phone number")}`),
      h("span", null, `✉️ ${safe(data.email, "Email address")}`),
    ]),
    imageEl(data.map, "Map or feature image", "cms-preview__contact-map"),
  ]);
}

function FooterPreview({ entry }) {
  const data = entry.getIn(["data"])?.toJS() || {};
  return h("section", { className: "cms-preview cms-preview--footer" }, [
    h("p", null, safe(data.text, "Footer mission text.")),
    h("div", { className: "cms-preview__footer" }, [
      imageEl(data.logo, "Footer logo", ""),
      h(
        "small",
        null,
        `© ${new Date().getFullYear()} ${safe(
          data.copyright,
          "Mira International Foods, Inc. All rights reserved."
        )}`
      ),
    ]),
  ]);
}

CMS.registerPreviewTemplate("hero", HeroPreview);
CMS.registerPreviewTemplate("about", AboutPreview);
CMS.registerPreviewTemplate("sustainability", SustainabilityPreview);
CMS.registerPreviewTemplate("products", ProductsPreview);
CMS.registerPreviewTemplate("facilities", FacilitiesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerPreviewTemplate("footer", FooterPreview);

