import logoArizona from "@/assets/arizona-logo.png";
import logoArizonaCollege from "@/assets/arizona-college-logo.png";
import logoDeborah from "@/assets/deborah-homes-logo.png";
import logoGreenfield from "@/assets/greenfield-logo.png";
import logoRosben from "@/assets/rosben-logo.png";
import logoShani from "@/assets/shani-logo.png";
import logoKibatia from "@/assets/kibatia-logo.png";
import logoTopTank from "@/assets/toptank-logo.png";
import logoPatrina from "@/assets/patrina-logo.png";
import logoChinaVillage from "@/assets/chinavillage-logo.png";
import logoSportsSparks from "@/assets/sportssparks-logo.png";

const logos = [
  { name: "Deborah Homes", image: logoDeborah },
  { name: "Shani School", image: logoShani },
  { name: "Kibatia Advocates", image: logoKibatia },
  { name: "TopTank", image: logoTopTank },
  { name: "Rosben Accounting", image: logoRosben },
  { name: "Arizona International College", image: logoArizonaCollege },
  { name: "Patrina Homes", image: logoPatrina },
  { name: "China Village", image: logoChinaVillage },
  { name: "Sports Sparks Africa", image: logoSportsSparks },
  { name: "Greenfield Real Estate", image: logoGreenfield },
  { name: "Arizona Group", image: logoArizona },
];

const BuiltLogoMarquee = () => (
  <div className="overflow-hidden" aria-label="Websites built and managed by Lumex Digital">
    <div className="built-logo-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="built-logo-group" aria-hidden={copy === 1}>
          {logos.map((logo) => (
            <div key={logo.name} className="built-logo-item" title={logo.name}>
              <img src={logo.image} alt={copy === 0 ? logo.name : ""} loading="lazy" className="max-h-14 max-w-32 object-contain" />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default BuiltLogoMarquee;