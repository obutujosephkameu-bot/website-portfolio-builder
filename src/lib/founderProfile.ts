export const founderProfile = {
  name: "Josemaria M. Njeru",
  path: "/about/josemaria-m-njeru",
  role: "C.E.O & Founder of Lumex Digital and Software World",
  description: "Josemaria M. Njeru is the C.E.O and founder of Lumex Digital and Software World, its software-building department in Kenya.",
  copyright: {
    title: "Lumex Digital Logo",
    category: "Artistic Works",
    registrationNumber: "RZ104397",
    authority: "Kenya Copyright Board",
  },
  businessName: "LUMEX DIGITAL",
};

export const founderSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `https://lumexdigital.co.ke${founderProfile.path}#profile`,
  url: `https://lumexdigital.co.ke${founderProfile.path}`,
  name: `${founderProfile.name} — ${founderProfile.role}`,
  mainEntity: {
    "@type": "Person",
    "@id": `https://lumexdigital.co.ke${founderProfile.path}#person`,
    name: founderProfile.name,
    url: `https://lumexdigital.co.ke${founderProfile.path}`,
    jobTitle: "C.E.O and Founder",
    description: founderProfile.description,
    worksFor: {
      "@type": "Organization",
      "@id": "https://lumexdigital.co.ke/#organization",
      name: "Lumex Digital",
      url: "https://lumexdigital.co.ke/",
    },
  },
};