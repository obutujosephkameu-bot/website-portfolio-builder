import { describe, expect, it } from "vitest";
import { founderProfile, founderSchema } from "@/lib/founderProfile";

describe("supplied founder and certificate details", () => {
  it("identifies Josemaria as the founder and CEO", () => {
    expect(founderSchema.mainEntity.name).toBe("Josemaria M. Njeru");
    expect(founderSchema.mainEntity.jobTitle).toBe("C.E.O and Founder");
    expect(founderSchema.mainEntity.worksFor.name).toBe("Lumex Digital");
  });
  it("applies RZ104397 to the logo copyright, not company certification", () => {
    expect(founderProfile.copyright.registrationNumber).toBe("RZ104397");
    expect(founderProfile.copyright.title).toBe("Lumex Digital Logo");
    expect(founderProfile.copyright.category).toBe("Artistic Works");
  });
  it("retains the supplied registered business name", () => {
    expect(founderProfile.businessName).toBe("LUMEX DIGITAL");
  });
});