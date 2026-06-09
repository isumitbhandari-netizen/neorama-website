import React from "react";
import { SERVICES } from "../data";
import { Clapperboard, Fingerprint, Sparkles, Check, ArrowRight } from "lucide-react";

export default function ServicesShowcase() {
  // Map icon names to lucide components
  const getIcon = (name: string) => {
    switch (name) {
      case "clapperboard":
        return <Clapperboard className="text-electric-blue" size={24} />;
      case "fingerprint":
        return <Fingerprint className="text-electric-blue" size={24} />;
      default:
        return <Sparkles className="text-electric-blue" size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {SERVICES.map((service) => (
        <div
          key={service.id}
          className="bg-pure-white border border-soft-gray p-6 md:p-8 rounded-xl flex flex-col justify-between hover:border-electric-blue hover:shadow-xl transition-all duration-300 group"
        >
          <div className="space-y-6">
            {/* Service Header Row */}
            <div className="flex items-center justify-between">
              <span className="p-3 bg-background-gray rounded-lg group-hover:bg-electric-blue/10 transition-colors">
                {getIcon(service.iconName)}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#727784] uppercase">
                CAPABILITY
              </span>
            </div>

            {/* Service Titles & Desc */}
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-xl text-on-surface group-hover:text-electric-blue transition-colors leading-tight">
                {service.title}
              </h3>
              <p className="font-sans text-xs md:text-sm text-[#414752] leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Key list items */}
            <ul className="space-y-2.5 pt-4 border-t border-soft-gray/60">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs font-sans text-on-surface/90">
                  <span className="p-0.5 rounded bg-green-50 text-green-600 border border-green-200 mt-0.5 flex-shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to action inside the card */}
          <div className="pt-8">
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-between px-4 py-3 bg-[#f9f9f9] hover:bg-electric-blue text-on-surface hover:text-pure-white rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer"
              id={`service-cta-${service.id}`}
            >
              <span>Enquire Now</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
