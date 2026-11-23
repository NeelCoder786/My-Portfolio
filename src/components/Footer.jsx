"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";
import {
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaBehance,
  FaDribbble,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa6";
import { trackClick } from "@/lib/trackClick";

const LINKS = [
  { label: "About",   href: "/about"   },
  { label: "Projects", href: "/projects" },
  { label: "GitHub",  href: "https://github.com/NeelCoder786", external: true },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_KEYS = [
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "github",    label: "GitHub",    icon: FaGithub },
  { key: "linkedin",  label: "LinkedIn",  icon: FaLinkedinIn },
  { key: "twitter",   label: "X",         icon: FaXTwitter },
  { key: "youtube",   label: "YouTube",   icon: FaYoutube },
  { key: "behance",   label: "Behance",   icon: FaBehance },
  { key: "dribbble",  label: "Dribbble",  icon: FaDribbble },
  { key: "whatsapp",  label: "WhatsApp",  icon: FaWhatsapp },
];

export default function Footer() {
  const ref = useRef(null);
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    const applyLinks = (values = {}) => {
      const active = SOCIAL_KEYS
        .filter(s => values[s.key]?.trim())
        .map(s => ({
          label: s.label,
          href: values[s.key].trim(),
          icon: s.icon,
        }));
      if (active.length === 0) {
        active.push({
          label: "GitHub",
          href: "https://github.com/NeelCoder786",
          icon: FaGithub,
        });
      }
      setSocials(active);
    };

    let cached = {};
    try { cached = JSON.parse(localStorage.getItem("social_links") || "{}"); } catch {}
    applyLinks(cached);

    const refresh = () => {
      fetch("/api/settings?key=social_links")
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          const values = data?.value || cached;
          if (data?.value) localStorage.setItem("social_links", JSON.stringify(data.value));
          applyLinks(values);
        })
        .catch(() => applyLinks(cached));
    };

    const onLocalUpdate = (event) => {
      const values = event.detail?.links || {};
      localStorage.setItem("social_links", JSON.stringify(values));
      applyLinks(values);
    };

    refresh();
    window.addEventListener("social-links-update", onLocalUpdate);
    const channel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("social-links") : null;
    if (channel) channel.onmessage = (event) => applyLinks(event.data?.links || {});

    return () => {
      window.removeEventListener("social-links-update", onLocalUpdate);
      channel?.close();
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="relative border-t border-white/8 px-10 md:px-20 py-16">

      {/* top row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">

        {/* name + tagline */}
        <div>
          <p className="text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-4 font-medium">
            AI & Machine Learning Engineer
          </p>
          <h2
            className="font-black tracking-tighter leading-[0.85]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            <span className="block text-white">Neel Sharma</span>
          </h2>
        </div>

        {/* nav + socials */}
        <div className="flex flex-col gap-8 md:items-end">
          <nav className="flex gap-8 text-[11px] uppercase tracking-[0.3em] font-medium">
            {LINKS.map(({ label, href, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-[#ff6b1a] transition-colors duration-300"
                >
                  <FiGithub size={14} />
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-white/40 hover:text-[#ff6b1a] transition-colors duration-300"
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {socials.length > 0 && (
            <div id="social-links" className="flex flex-col items-start md:items-end gap-3 scroll-mt-28">
              <p className="text-[9px] text-white/25 uppercase tracking-[0.45em]">Social Media</p>
              <div className="flex flex-wrap justify-start md:justify-end gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  onClick={() => trackClick(`social-${label.toLowerCase()}`, href)}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-white/45 hover:text-[#ff6b1a] hover:border-[#ff6b1a]/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  <Icon size={17} />
                </a>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* divider */}
      <div className="w-full h-px bg-white/8 mb-8" />

      {/* bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p
          className="text-[10px] text-white/20 tracking-widest"
          style={{ fontFamily: '"Times New Roman", Times, serif', fontStyle: "italic" }}
        >
          neelsharma332713@gmail.com
        </p>
        <p className="text-[10px] text-white/15 tracking-[0.3em] uppercase">
          © {new Date().getFullYear()} Neel Sharma. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
