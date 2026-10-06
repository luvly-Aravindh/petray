"use client";

/* Page behaviour for the static markup in LandingMarkup (the lead form lives in LeadForm).
   Ported from the original page script. Every listener, timer and observer is torn
   down on unmount, and one-time DOM rewrites are guarded so React Strict Mode's
   double effect run in development does not apply them twice. */

import { useEffect } from "react";

const ICON: Record<string, string> = {
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="#f0abfc" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/></svg>',
  form: '<svg viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
};

type Ticket = {
  id: string; ch: string; via: string; title: string; cust: string; look: string[];
  lbl: string; conf: string; draft: string; end: "ok" | "hu"; note: string;
};
const TICKETS: Ticket[] = [
  { id: "#1042", ch: "email", via: "Email", title: "Where is my order?", cust: "Hi, I ordered on the 3rd and still have nothing. Where is my order?",
    look: ["Order #4921 found", "Shipped via Delhivery", "Out for delivery today"], lbl: "AI draft", conf: "From live order data",
    draft: "Hi Ananya, good news. Order #4921 is out for delivery today with Delhivery. Here is your live tracking. Thanks for waiting!", end: "ok", note: "Agent approved in 1 click" },
  { id: "#1043", ch: "chat", via: "Chat", title: "Wrong size, need exchange", cust: "The hoodie came in M, I ordered L. Can I swap it?",
    look: ["Order #4933 found", "Size L in stock", "Exchange policy: 15 days"], lbl: "AI draft", conf: "Policy matched",
    draft: "So sorry about that, Jake. Size L is in stock. Here are the exchange steps under our 15-day policy, and our team will confirm the swap.", end: "ok", note: "Agent reviewed and sent" },
  { id: "#1044", ch: "form", via: "Support page", title: "Refund for damaged item", cust: "The glass bottle arrived cracked. I want a full refund of $148.",
    look: ["Order #4940 found", "Refund request", "Photo attached"], lbl: "Routed to a human", conf: "High priority",
    draft: "Refund requests go to your team. Sent to your refunds lead with the order, photo and customer history attached. SLA: 2 hrs.", end: "hu", note: "Escalated with full context" },
];

const REELS = [
  { name: "UrbanGabru", lines: ["Customers used to wonder where to reach us.", "Now the support flow is straightforward."], res: "Smoother from message one", who: "UrbanGabru, a GlobalBees brand. Shopify App Store review." },
  { name: "Seoulskin", lines: ["Customers used to write long, unclear emails.", "Now they pick exactly what they need help with."], res: "Less back-and-forth", who: "Seoulskin. Shopify App Store review." },
  { name: "UrbanYog", lines: ["The same order status and shipping questions, every day.", "Now the team handles them much faster."], res: "Faster on repeat questions", who: "UrbanYog. Shopify App Store review." },
];

/* VERIFY: replace ticker entries with real trial starts before launch */
const TICKER = [
  { name: "Ananya R.", city: "Bengaluru, KA", action: "Just started a free trial", time: "3 min ago" },
  { name: "Jake M.", city: "Austin, TX", action: "Just started a free trial", time: "8 min ago" },
  { name: "Kavya S.", city: "Mumbai, MH", action: "Just started a free trial", time: "13 min ago" },
  { name: "Emily T.", city: "Denver, CO", action: "Just started a free trial", time: "18 min ago" },
  { name: "Rohit G.", city: "Delhi NCR, DL", action: "Just started a free trial", time: "24 min ago" },
  { name: "Marcus L.", city: "Miami, FL", action: "Just started a free trial", time: "29 min ago" },
  { name: "Sneha P.", city: "Pune, MH", action: "Just started a free trial", time: "36 min ago" },
  { name: "Olivia K.", city: "Brooklyn, NY", action: "Just started a free trial", time: "43 min ago" },
  { name: "Harsh V.", city: "Ahmedabad, GJ", action: "Just started a free trial", time: "51 min ago" },
  { name: "Nora B.", city: "Seattle, WA", action: "Just started a free trial", time: "1 hr ago" },
];

/* Black Friday 2026 (local time) */
const BLACK_FRIDAY = new Date(2026, 10, 27, 0, 0, 0);

export default function LandingEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T | null;
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(t: Window | Document | HTMLElement, type: K | string, fn: EventListener, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      cleanups.push(() => t.removeEventListener(type, fn, opts));
    };
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => { const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
    const every = (fn: () => void, ms: number) => { const id = window.setInterval(fn, ms); cleanups.push(() => clearInterval(id)); };
    const observe = (io: IntersectionObserver) => { cleanups.push(() => io.disconnect()); return io; };

    /* mobile menu */
    const topnav = $("topnav"), navToggle = $("navToggle");
    if (topnav && navToggle) {
      const setOpen = (open: boolean) => { topnav.classList.toggle("open", open); navToggle.setAttribute("aria-expanded", open ? "true" : "false"); };
      on(navToggle, "click", () => setOpen(!topnav.classList.contains("open")));
      on(document, "click", (e) => { if (topnav.classList.contains("open") && !topnav.contains(e.target as Node)) setOpen(false); });
      on(document, "keydown", (e) => { if ((e as KeyboardEvent).key === "Escape" && topnav.classList.contains("open")) { setOpen(false); navToggle.focus(); } });
    }

    /* headline words */
    const h1 = $("h1");
    if (h1 && !reduce && !h1.dataset.split) {
      h1.dataset.split = "1";
      let i = 0;
      const walk = (node: Node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (n.textContent || "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement("span");
              s.className = "w"; s.textContent = part; s.style.animationDelay = `${0.06 + i * 0.04}s`; i++;
              frag.appendChild(s);
            });
            n.parentNode?.replaceChild(frag, n);
          } else if (n.nodeType === 1) walk(n);
        });
      };
      walk(h1);
    }

    /* mobile swipe dots */
    document.querySelectorAll<HTMLElement>(".swipe").forEach((sw) => {
      const kids = Array.from(sw.children) as HTMLElement[];
      if (kids.length < 2) return;
      let dots = sw.nextElementSibling as HTMLElement | null;
      if (!dots || !dots.classList.contains("dots")) {
        dots = document.createElement("div");
        dots.className = "dots"; dots.setAttribute("aria-hidden", "true");
        kids.forEach(() => dots!.appendChild(document.createElement("i")));
        sw.parentNode?.insertBefore(dots, sw.nextSibling);
      }
      const dotEl = dots;
      const upd = () => {
        const c = sw.scrollLeft + sw.clientWidth / 2;
        let best = 0, bd = 1e9;
        kids.slice().sort((x, y) => x.offsetLeft - y.offsetLeft).forEach((k, i) => {
          const d = Math.abs(k.offsetLeft + k.offsetWidth / 2 - c);
          if (d < bd) { bd = d; best = i; }
        });
        Array.from(dotEl.children).forEach((d, i) => d.classList.toggle("on", i === best));
      };
      on(sw, "scroll", () => requestAnimationFrame(upd), { passive: true });
      on(window, "resize", upd);
      later(upd, 50);
    });

    /* reveal */
    const io = observe(new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }));
    document.querySelectorAll(".rv,.pain-photo,.gr").forEach((el) => io.observe(el));
    const pp = $("painPhoto");
    if (pp) {
      const ppo = observe(new IntersectionObserver((es, ob) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          pp.querySelectorAll(".bub").forEach((b, k) => later(() => b.classList.add("show"), 350 + k * 650));
          ob.disconnect();
        });
      }, { threshold: 0.35 }));
      ppo.observe(pp);
    }

    /* logo carousel: fill the track, then duplicate for a seamless loop */
    const mq = $("mq");
    if (mq && !mq.dataset.filled) {
      mq.dataset.filled = "1";
      const base = mq.innerHTML;
      let guard = 0;
      while (mq.scrollWidth < window.innerWidth * 1.2 && guard++ < 20) mq.innerHTML += base;
      mq.innerHTML += mq.innerHTML;
    }

    /* live demo */
    const qList = $("qList");
    const demo = document.querySelector(".demo");
    let running = true, idx = 0, solved = 0;
    const demoTimers: number[] = [];
    const dLater = (fn: () => void, ms: number) => { demoTimers.push(later(fn, ms)); };
    const clearDemo = () => { demoTimers.forEach((t) => { clearTimeout(t); timers.delete(t); }); demoTimers.length = 0; };
    if (qList && demo) {
      qList.innerHTML = TICKETS.map((t, i) =>
        `<div class="tk" id="tk${i}"><span class="ch">${ICON[t.ch]}</span><span class="t"><b>${t.id} ${t.title}</b><small>via ${t.via}</small></span><span class="pill open">Open</span></div>`
      ).join("");
      const pTitle = $("pTitle")!, pState = $("pState")!, pCust = $("pCust")!, pLook = $("pLook")!, pLbl = $("pLbl")!,
        pConf = $("pConf")!, pDraft = $("pDraft")!, caret = $("caret")!, pNote = $("pNote")!, sb = $("pSend")!, solvedEl = $("solved")!;
      const play = (i: number) => {
        const t = TICKETS[i];
        document.querySelectorAll(".tk").forEach((el, k) => el.classList.toggle("on", k === i));
        pTitle.textContent = `${t.id} ${t.title}`;
        pState.className = "pill ai"; pState.textContent = "AI reading";
        pCust.textContent = t.cust;
        pLook.innerHTML = t.look.map((l) => `<span class="chip">${l}</span>`).join("");
        pLbl.textContent = t.lbl; pConf.textContent = "";
        pDraft.textContent = ""; caret.style.display = "inline-block";
        pNote.textContent = ""; sb.className = "sendbtn"; sb.textContent = t.end === "hu" ? "Assign" : "Send";
        const chips = Array.from(pLook.children);
        chips.forEach((c, k) => dLater(() => c.classList.add("show"), 500 + k * 450));
        const start = 500 + chips.length * 450 + 250, speed = reduce ? 0 : 22;
        for (let c = 0; c <= t.draft.length; c++) dLater(() => { pDraft.textContent = t.draft.slice(0, c); }, start + c * speed);
        const endAt = start + t.draft.length * speed + 350;
        dLater(() => { pConf.textContent = t.conf; sb.classList.add("ready"); }, endAt);
        dLater(() => {
          caret.style.display = "none"; sb.classList.add("sent"); sb.textContent = t.end === "hu" ? "Assigned" : "Sent";
          pNote.textContent = t.note;
          const pill = document.querySelector(`#tk${i} .pill`)!;
          if (t.end === "hu") { pill.className = "pill hu"; pill.textContent = "Human"; pState.className = "pill hu"; pState.textContent = "With a human"; }
          else { pill.className = "pill ok"; pill.textContent = "Resolved"; pState.className = "pill ok"; pState.textContent = "Resolved"; }
          $("tk" + i)?.classList.add("done"); solved++; solvedEl.textContent = String(solved);
        }, endAt + 900);
        dLater(() => {
          idx = (i + 1) % TICKETS.length;
          if (idx === 0) document.querySelectorAll(".tk").forEach((el) => {
            el.classList.remove("done"); const p = el.querySelector(".pill")!; p.className = "pill open"; p.textContent = "Open";
          });
          if (running) play(idx);
        }, endAt + 2600);
      };
      let started = false;
      observe(new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting && !started) { started = true; play(0); } });
      }, { threshold: 0.2 })).observe(demo);
      const toggle = $("demoToggle");
      if (toggle) on(toggle, "click", () => {
        running = !running; toggle.textContent = running ? "Pause demo" : "Play demo";
        clearDemo(); if (running) play(idx);
      });
    }

    /* steps progress */
    const steps = $("steps");
    const stepEls = steps ? Array.from(steps.querySelectorAll<HTMLElement>(".step")) : [];
    const stepScroll = () => {
      if (!steps) return;
      const r = steps.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / Math.max(1, r.height * 0.9)));
      steps.style.setProperty("--p", p.toFixed(3));
      const wide = window.innerWidth >= 960;
      stepEls.forEach((s, k) => s.classList.toggle("lit", wide ? p >= k / stepEls.length + 0.02 : s.getBoundingClientRect().top < vh * 0.7));
    };

    /* calculator */
    const r1 = $<HTMLInputElement>("r1"), r2 = $<HTMLInputElement>("r2"), r3 = $<HTMLInputElement>("r3");
    const frames = new Set<number>();
    cleanups.push(() => frames.forEach(cancelAnimationFrame));
    const tween = (el: HTMLElement | null, to: number, dec?: boolean) => {
      if (!el) return;
      const from = parseFloat(el.dataset.v || "0"), t0 = performance.now(), d = reduce ? 1 : 420;
      el.dataset.v = String(to);
      const f = (now: number) => {
        const k = Math.min(1, (now - t0) / d);
        const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
        el.textContent = dec ? v.toFixed(1) : Math.round(v).toLocaleString("en-US");
        if (k < 1) frames.add(requestAnimationFrame(f));
      };
      frames.add(requestAnimationFrame(f));
    };
    if (r1 && r2 && r3) {
      const calc = () => {
        const t = +r1.value, m = +r2.value, s = +r3.value / 100;
        $("o1")!.textContent = String(t); $("o2")!.textContent = String(m); $("o3")!.textContent = `${r3.value}%`;
        const rep = t * 30.4 * s, hrs = (rep * m) / 60;
        tween($("hOut"), Math.round(hrs)); tween($("wOut"), hrs / 40, true); tween($("tOut"), Math.round(rep));
      };
      [r1, r2, r3].forEach((r) => on(r, "input", calc));
      calc();
    }

    /* story reels: brand logo up front */
    const logos = Array.from(document.querySelectorAll<HTMLImageElement>(".reel .rl-logo img")).map((i) => i.src);
    const modal = $("modal"), rtx = $("reelTxt"), rprog = $("reelProg"), reelImg = $<HTMLImageElement>("reelImg"), xClose = $("xClose");
    if (modal && rtx && rprog && reelImg && xClose) {
      let rt: number[] = [];
      let lastFocus: HTMLElement | null = null;
      const closeReel = () => { rt.forEach((t) => { clearTimeout(t); timers.delete(t); }); rt = []; modal.classList.remove("open"); lastFocus?.focus(); };
      const openReel = (i: number) => {
        const R = REELS[i]; if (!R) return;
        lastFocus = document.activeElement as HTMLElement | null;
        reelImg.src = logos[i] || ""; reelImg.alt = `${R.name} logo`;
        const lg = $("reelLogo");
        if (lg) { lg.style.animation = "none"; void lg.offsetWidth; lg.style.animation = ""; }
        rtx.innerHTML = R.lines.map((l) => `<div class="ln">${l}</div>`).join("") + `<div class="ln res">${R.res}</div><div class="ln who">${R.who}</div>`;
        modal.classList.add("open"); xClose.focus();
        const lns = rtx.querySelectorAll(".ln"), total = 1300 * lns.length + 1600;
        rprog.style.transition = "none"; rprog.style.width = "0"; void rprog.offsetWidth;
        rprog.style.transition = `width ${total}ms linear`; rprog.style.width = "100%";
        lns.forEach((l, k) => rt.push(later(() => l.classList.add("show"), 500 + k * 1300)));
        rt.push(later(closeReel, total + 400));
      };
      document.querySelectorAll<HTMLElement>("[data-reel]").forEach((b) => on(b, "click", () => openReel(+(b.dataset.reel || 0))));
      on(xClose, "click", closeReel);
      on(modal, "click", (e) => { if (e.target === modal) closeReel(); });
      on(document, "keydown", (e) => { if ((e as KeyboardEvent).key === "Escape" && modal.classList.contains("open")) closeReel(); });
    }

    /* Black Friday countdown */
    const pad = (n: number) => (n < 10 ? "0" : "") + n;
    const tick = () => {
      const s = Math.floor(Math.max(0, BLACK_FRIDAY.getTime() - Date.now()) / 1000);
      const d = Math.floor(s / 86400);
      const set = (id: string, v: string) => { const el = $(id); if (el) el.textContent = v; };
      set("cd", String(d)); set("ch", pad(Math.floor((s % 86400) / 3600))); set("cm", pad(Math.floor((s % 3600) / 60))); set("cs", pad(s % 60));
      set("bandDays", String(d));
    };
    tick(); every(tick, 1000);

    /* frozen bar: after hero, hidden over the final CTA */
    const fbar = $("fbar"), hero = document.querySelector(".hero"), fin = document.querySelector(".final-card");
    const barScroll = () => {
      if (!fbar || !hero || !fin) return;
      const fr = fin.getBoundingClientRect();
      const overFinal = fr.top < window.innerHeight && fr.bottom > 0;
      fbar.classList.toggle("show", hero.getBoundingClientRect().bottom < 0 && !overFinal);
    };
    let ticking = false;
    on(window, "scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { barScroll(); stepScroll(); ticking = false; });
    }, { passive: true });
    on(window, "resize", stepScroll);
    barScroll(); stepScroll();

    /* proof ticker */
    const tk = $("gn-proof-ticker");
    if (tk) {
      const nameEl = $("gn-ticker-name"), cityEl = $("gn-ticker-city"), actEl = $("gn-ticker-action"), timeEl = $("gn-ticker-time");
      let c = Math.floor(Math.random() * TICKER.length);
      const paint = (i: number) => {
        const r = TICKER[i];
        if (nameEl) nameEl.textContent = r.name; if (cityEl) cityEl.textContent = r.city;
        if (actEl) actEl.textContent = r.action; if (timeEl) timeEl.textContent = r.time;
      };
      const hide = () => { tk.classList.remove("is-visible"); c = (c + 1) % TICKER.length; };
      const show = () => { paint(c); tk.classList.add("is-visible"); later(hide, 6000); };
      if (reduce) tk.style.transition = "opacity 0.2s";
      later(() => { show(); every(show, 11000); }, 4000);
    }

    return () => {
      running = false;
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
