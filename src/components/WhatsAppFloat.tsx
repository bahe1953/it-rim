"use client";

import { useEffect, useState } from "react";
import { WhatsApp } from "./icons";

export default function WhatsAppFloat({ url, label }: { url: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact")?.getBoundingClientRect();
      const contactVisible = contact ? contact.top < window.innerHeight && contact.bottom > 0 : false;
      setShow(window.scrollY > 300 && !contactVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href={url} target="_blank" rel="noopener" aria-label={label}
      className={`fixed end-5 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] z-40 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_12px_24px_-10px_rgba(31,168,85,.7)] transition duration-300 hover:-translate-y-0.5 ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <WhatsApp size={28} />
    </a>
  );
}
