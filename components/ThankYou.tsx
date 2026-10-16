"use client";

/* CHILI LABS THANK YOU PAGE v1 (built by GetNos, matches landing page v9.8), Next.js edition.
   Ported from thank-you.html. Styles live in app/globals.css under the "ty-" prefix.
   The landing page sends people here after the form with URL params:
     name, store, slot (UTC ISO time of the booked call, empty if they skipped), mins (call length)
   Example: /thank-you?name=Test%20User&store=teststore.myshopify.com&slot=2026-10-14T05:30:00.000Z&mins=20 */

import { useEffect, useRef, useState } from "react";

type Booking = { start: number; end: number; mins: number; title: string; tz: string };

const DETAILS = "Call with the Chili Labs team.";

const LOGOS = [
  { src: "/img/img-653b479ecc.png", alt: "SEOULSKIN" },
  { src: "/img/img-82c454ebc2.png", alt: "UrbanYog" },
  { src: "/img/img-e0ef6b52af.png", alt: "UrbanGabru" },
  { src: "/img/img-331f719a4b.png", alt: "Trimfinity" },
  { src: "/img/img-cf9e3e5f67.png", alt: "MakeMeeBold" },
  { src: "/img/img-bca34f840b.png", alt: "Carbamide Forte" },
];

/* UTC timestamp in the compact form calendars expect: 20261014T053000Z */
function z(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function formatWhen(ms: number): string {
  return (
    new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" }).format(ms) +
    ", " +
    new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(ms)
  );
}

export default function ThankYou() {
  const [name, setName] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const proofRef = useRef<HTMLElement>(null);

  /* Read the URL params after mount so server and client render the same first frame. */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setName((q.get("name") || "").trim().split(" ")[0]);
    const store = (q.get("store") || "").trim();
    const slot = q.get("slot");
    const mins = parseInt(q.get("mins") || "20", 10) || 20;
    const start = slot ? Date.parse(slot) : NaN;
    if (!isNaN(start)) {
      let tz = "";
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}
      setBooking({
        start,
        end: start + mins * 60000,
        mins,
        title: "Call with Chili Labs" + (store ? " (" + store + ")" : ""),
        tz,
      });
    }
    /* Dev: conversion events go here. fbq('track','Lead'); if a slot is present, fbq('track','Schedule'). */
  }, []);

  /* Fade the proof section in when it scrolls into view. */
  useEffect(() => {
    const el = proofRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const gcalHref = booking
    ? "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(booking.title) +
      "&dates=" + z(booking.start) + "/" + z(booking.end) + "&details=" + encodeURIComponent(DETAILS)
    : "#";

  const downloadIcs = () => {
    if (!booking) return;
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Chili Labs//Call//EN", "BEGIN:VEVENT",
      "UID:" + z(booking.start) + "-" + Math.random().toString(36).slice(2) + "@chililabs.ai",
      "DTSTAMP:" + z(Date.now()), "DTSTART:" + z(booking.start), "DTEND:" + z(booking.end),
      "SUMMARY:" + booking.title, "DESCRIPTION:" + DETAILS, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "chililabs-call.ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  };

  return (
    <div className="ty-page">
      <div className="ty-wrap">
        <header className="ty-top">
          <img src="/img/img-a150b75102.png" alt="" width="30" height="30" />
          <span>Chili Labs</span>
        </header>

        <section className="ty-hero">
          <div className="ty-ic">
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.2 4.2L19 7" />
            </svg>
          </div>
          <span className="ty-eyebrow">{booking ? "Call booked" : "Request received"}</span>
          <h1>{name ? "Thank you, " + name + "." : "Thank you."}</h1>
          <p className="ty-lead">
            {booking
              ? "We are so glad you are here. Your call is booked, and someone from the Chili Labs team will get in touch with you before then."
              : "We are so glad you are here. Someone from the Chili Labs team will get in touch with you soon."}
          </p>

          {booking && (
            <div className="ty-card">
              <div className="ty-lbl">Your call</div>
              <div className="ty-when">{formatWhen(booking.start)}</div>
              <div className="ty-meta">
                <span className="ty-chip">{booking.mins} minutes</span>
                <span className="ty-chip">With the Chili Labs team</span>
                <span className="ty-chip">{booking.tz ? "Your time (" + booking.tz + ")" : "Your local time"}</span>
              </div>
              <div className="ty-cal">
                <a className="ty-btn2" href={gcalHref} target="_blank" rel="noopener">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="5" width="18" height="16" rx="3" />
                    <path d="M3 10h18M8 3v4M16 3v4" />
                  </svg>
                  Add to Google Calendar
                </a>
                <button type="button" className="ty-btn2" onClick={downloadIcs}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                  </svg>
                  Download invite
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="ty-proof ty-rv" ref={proofRef}>
          <div className="ty-stars" aria-hidden="true">{"★★★★★"}</div>
          <p>Rated 4.6 on the Shopify App Store. Used by growing Shopify brands.</p>
          <div className="ty-logos">
            {LOGOS.map((l) => (
              <div className="ty-lg" key={l.alt}>
                <img src={l.src} alt={l.alt} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <footer className="ty-footer">Chili Labs. AI customer support built inside Shopify.</footer>
    </div>
  );
}
