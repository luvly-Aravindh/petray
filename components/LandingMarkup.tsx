/* Generated from the static landing page markup (index.html). Edit freely. */
import LeadForm from "./LeadForm";

export default function LandingMarkup() {
  return (
    <>
      <div className="band" role="note">
        {"Black Friday is "}
        <b>
          <span id="bandDays">
            57
          </span>
          {" days"}
        </b>
        {" away. Prep your support now."}
      </div>
      <nav className="topnav" id="topnav" aria-label="Chili Labs">
        <div className="wrap nav-in">
          <span className="nav-brand">
            <img src="/img/img-a150b75102.png" alt="Chili Labs logo" width="28" height="28" />
            <span>
              Chili Labs
            </span>
          </span>
          <button type="button" className="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="#160b2e" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <div className="nav-links" id="navLinks">
            <a href="https://chililabs.ai/whats-new" target="_blank" rel="noopener">
              {"What's New"}
              <span className="new" aria-hidden="true" />
            </a>
            <a href="https://chililabs.ai/demo" target="_blank" rel="noopener">
              Live Demo
            </a>
            <a href="https://chililabs.ai/dashboard" target="_blank" rel="noopener">
              Dashboard
            </a>
          </div>
        </div>
      </nav>
      <header className="hero">
        <div className="wrap">
          <h1 className="split" id="h1">
            {"Stop typing the same "}
            <em>
              “Where is my order?”
            </em>
            {" reply for the 50th time today."}
          </h1>
          <p className="hero-sub h-in" style={{ animationDelay: ".2s" }}>
            AI drafts every reply from the real Shopify order. Tricky tickets go to your team.
          </p>
          <div className="cta-block h-in" style={{ animationDelay: ".3s" }}>
            <button className="cta" data-go="">
              Book my setup call
              <span className="arr" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
            <p className="cta-note">
              15 days free. Setup in under 7 minutes.
            </p>
          </div>
          <div className="hero-proof h-in" style={{ animationDelay: ".45s" }}>
            <span>
              <span className="star" aria-hidden="true">
                ★
              </span>
              <b>
                4.6
              </b>
              {" rating on the Shopify App Store"}
            </span>
            <span className="hp-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6d28d9" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.2 4.2L19 7" />
              </svg>
              Built only for Shopify
            </span>
          </div>
          <div className="stage h-in" style={{ animationDelay: ".6s" }}>
            <div className="demo" aria-label="Product demo: Chili Labs answering Shopify support tickets">
              <div className="demo-bar">
                <i />
                <i />
                <i />
                <span className="ttl">
                  Demo store inbox
                </span>
                <span className="live">
                  AI active
                </span>
              </div>
              <div className="demo-body">
                <div className="q-list" id="qList" />
                <div className="pane">
                  <div className="pane-h">
                    <b id="pTitle">
                      Loading ticket
                    </b>
                    <span className="pill open" id="pState">
                      Open
                    </span>
                  </div>
                  <div className="msg cust" id="pCust" />
                  <div className="lookup" id="pLook" />
                  <div className="msg draft">
                    <div className="lbl">
                      <span id="pLbl">
                        AI draft
                      </span>
                      <span id="pConf" />
                    </div>
                    <span id="pDraft" />
                    <span className="caret" id="caret" />
                  </div>
                  <div className="sendrow">
                    <span id="pNote" style={{ fontSize: "12px", color: "#9c8fc0" }} />
                    <button className="sendbtn" id="pSend" tabIndex={-1} aria-hidden="true">
                      Send
                    </button>
                  </div>
                </div>
              </div>
              <div className="demo-foot">
                <span>
                  {"Resolved this session: "}
                  <b id="solved" style={{ color: "#fff" }}>
                    0
                  </b>
                </span>
                <button type="button" id="demoToggle">
                  Pause demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="logos-sec" aria-label="Shopify brands using Chili Labs">
        <p className="logos-lbl">
          Used by growing Shopify brands
        </p>
        <div className="marquee">
          <div className="mq-track" id="mq">
            <div className="lg">
              <img className="sq" src="/img/img-e0ef6b52af.png" alt="Urban Gabru" />
            </div>
            <div className="lg">
              <img className="sq" src="/img/img-653b479ecc.png" alt="Seoulskin" />
            </div>
            <div className="lg">
              <img src="/img/img-82c454ebc2.png" alt="Urbanyog" />
            </div>
            <div className="lg">
              <img src="/img/img-331f719a4b.png" alt="Trimfinity" />
            </div>
            <div className="lg">
              <img src="/img/img-cf9e3e5f67.png" alt="MakeMeeBold by Urban Yog" />
            </div>
            <div className="lg">
              <img src="/img/img-bca34f840b.png" alt="Carbamide Forte" />
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "24px" }}>
        <div className="wrap pain-grid">
          <div className="pain-photo rv zoom" id="painPhoto">
            <img src="/img/img-3da97dbcad.webp" alt="Stacks of shipped parcels waiting to go out" />
            <div className="bubbles">
              <div className="bub">
                <small>
                  Email, 9:14 am
                </small>
                {"Where is my order? It's been 6 days."}
              </div>
              <div className="bub">
                <small>
                  Chat, 9:15 am
                </small>
                Hi, I got the wrong size. Can I exchange?
              </div>
              <div className="bub">
                <small>
                  Contact form, 9:17 am
                </small>
                Hello?? Still waiting on my refund.
              </div>
            </div>
          </div>
          <div className="pain-copy">
            <span className="eyebrow rv up">
              Sound familiar?
            </span>
            <h2 className="rv up d1">
              {"Your team isn't slow. "}
              <em>
                Your workflow is.
              </em>
            </h2>
            <p className="rv up d2">
              Every order you ship creates questions. Where is it. Can I swap it. When is my money back. Most of them are lookups, and answering them by hand eats the hours that should go into growing the store.
            </p>
            <div className="chain rv up d2" aria-label="The manual support chain">
              <span>
                Order in Shopify
              </span>
              <i>
                +
              </i>
              <span>
                Tracking in your courier app
              </span>
              <i>
                +
              </i>
              <span>
                Question in your inbox
              </span>
              <i>
                =
              </i>
              <span>
                Someone checks all three, then types
              </span>
            </div>
            <div className="voice rv up d3">
              <b>
                “Replying to the same ‘Where is my order?’ DMs was taking up 2 hours of my day.”
              </b>
              <small>
                A Shopify founder, in a founder community
              </small>
            </div>
            <div className="tried">
              <div className="rv right d2">
                <span className="x">
                  ✕
                </span>
                <span>
                  You held off hiring to protect margins, so every lookup landed on you.
                </span>
              </div>
              <div className="rv right d3">
                <span className="x">
                  ✕
                </span>
                <span>
                  You tried a unified inbox. It became one more tab, and you still wonder, “Did I ever reply to this person?”
                </span>
              </div>
              <div className="rv right d4">
                <span className="x">
                  ✕
                </span>
                <span>
                  You tried a chatbot. It could not see the order, guessed on a delivery exception and burned a customer’s trust.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ background: "var(--tint)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              How it works
            </span>
            <h2 className="rv blur">
              {"AI handles the repetitive work. "}
              <em>
                Humans handle what matters.
              </em>
            </h2>
          </div>
          <div className="steps" id="steps">
            <span className="track" aria-hidden="true">
              <i />
            </span>
            <div className="step rv up">
              <div className="num">
                1
              </div>
              <div className="step-c">
                <h3>
                  Connect your Shopify store
                </h3>
                <p>
                  Approve the app in Shopify. Chili Labs pulls your orders, customers and policies.
                </p>
                <span className="time">
                  Under 7 minutes
                </span>
              </div>
            </div>
            <div className="step rv up d1">
              <div className="num">
                2
              </div>
              <div className="step-c">
                <h3>
                  Customers say exactly what is wrong
                </h3>
                <p>
                  An Amazon-style issue menu means every ticket arrives with the order and the reason attached.
                </p>
                <span className="time">
                  No back-and-forth
                </span>
              </div>
            </div>
            <div className="step rv up d2">
              <div className="num">
                3
              </div>
              <div className="step-c">
                <h3>
                  AI drafts the reply from the real order
                </h3>
                <p>
                  Order status, returns, exchanges and refunds get an accurate draft in your brand voice.
                </p>
                <span className="time">
                  One click to send
                </span>
              </div>
            </div>
            <div className="step rv up d3">
              <div className="num">
                4
              </div>
              <div className="step-c">
                <h3>
                  Tricky tickets go to a human
                </h3>
                <p>
                  Anything that needs judgment is routed with full context, a priority flag and an SLA timer.
                </p>
                <span className="time">
                  No ticket stranded
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingLeft: "0", paddingRight: "0" }}>
        <div className="dark-panel dark">
          <div className="wrap sec" style={{ paddingBottom: "72px" }}>
            <div className="sec-head">
              <span className="eyebrow rv up">
                Inside Chili Labs
              </span>
              <h2 className="rv blur">
                {"Everything your support team needs, "}
                <em>
                  in one place.
                </em>
              </h2>
              <p className="rv up d1">
                The real product, straight from the Shopify App Store listing.
              </p>
            </div>
            <div className="show-track swipe" aria-label="Product features, swipe to see more">
              <div className="show-row">
                <div className="show-copy">
                  <span className="eyebrow rv up">
                    One place for everything
                  </span>
                  <h3 className="serif rv up d1">
                    {"A single entry point for "}
                    <em>
                      every query.
                    </em>
                  </h3>
                  <p className="rv up d2">
                    No more hunting across inboxes. Email, chat and contact forms land in one queue, with the order, priority, status, owner and SLA on every ticket.
                  </p>
                  <ul className="rv up d3">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      Unified inbox with filters for category, priority and SLA
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      Auto-assign and team shift scheduling
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      Connect Gmail, Outlook and multiple support inboxes
                    </li>
                  </ul>
                </div>
                <div className="shot rv">
                  <img src="/img/img-685be50adc.webp" alt="Chili Labs All Tickets view with order, priority, status, assignee, channel and SLA columns" />
                </div>
              </div>
              <div className="show-row flip">
                <div className="show-copy">
                  <span className="eyebrow rv up">
                    Issue tree builder
                  </span>
                  <h3 className="serif rv up d1">
                    {"Run support "}
                    <em>
                      like Amazon.
                    </em>
                  </h3>
                  <p className="rv up d2">
                    Customers pick their issue from a guided menu: order tracking, cancellations, address changes, returns, refunds and more. Every request reaches the right team, instantly.
                  </p>
                  <ul className="rv up d3">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      No long, unclear emails
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      The order and the reason arrive with the ticket
                    </li>
                  </ul>
                </div>
                <div className="shot rv">
                  <img src="/img/img-f89481f31a.webp" alt="Chili Labs issue tree asking the customer what the issue is, with nine categories" />
                </div>
              </div>
              <div className="show-row">
                <div className="show-copy">
                  <span className="eyebrow rv up">
                    Quick help
                  </span>
                  <h3 className="serif rv up d1">
                    {"Let customers handle "}
                    <em>
                      basic queries.
                    </em>
                  </h3>
                  <p className="rv up d2">
                    One tap gives customers their order status, order summary, payments, refunds, returns, contact changes and cancellation requests, so the simple questions never reach your queue.
                  </p>
                </div>
                <div className="shot rv">
                  <img src="/img/img-ffe695d4d2.webp" alt="Chili Labs Quick help panel with order status, order summary, payments, refunds, returns, change contact and cancel order" />
                </div>
              </div>
              <div className="show-row flip">
                <div className="show-copy">
                  <span className="eyebrow rv up">
                    AI drafted replies
                  </span>
                  <h3 className="serif rv up d1">
                    {"Save time with "}
                    <em>
                      AI drafted replies.
                    </em>
                  </h3>
                  <p className="rv up d2">
                    AI writes the first draft from the real order, trained on your store policies. Your agent reviews it, edits if needed and sends.
                  </p>
                  <ul className="rv up d3">
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      Send, edit, redo or discard in one click
                    </li>
                    <li>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.2 4.2L19 7" />
                      </svg>
                      AI summaries on long threads
                    </li>
                  </ul>
                  <span className="plan-tag rv up d4">
                    On Growth and Pro plans
                  </span>
                </div>
                <div className="shot rv">
                  <img src="/img/img-c62cb3fd97.webp" alt="Chili Labs ticket with an auto AI draft reply ready to send" />
                </div>
              </div>
              <div className="show-row">
                <div className="show-copy">
                  <span className="eyebrow rv up">
                    Support page
                  </span>
                  <h3 className="serif rv up d1">
                    {"A "}
                    <em>
                      premium
                    </em>
                    {" support page for your store."}
                  </h3>
                  <p className="rv up d2">
                    Swap the plain contact form for a clean, branded support page on your own custom domain. Customers enter their order number and get going.
                  </p>
                </div>
                <div className="shot rv">
                  <img src="/img/img-02d87ed741.webp" alt="Chili Labs branded support page asking for order number and email or phone" />
                </div>
              </div>
            </div>
            <div className="feat-cloud rv up">
              <h3>
                Plus everything else on the App Store listing
              </h3>
              <p>
                Built into every Chili Labs workspace.
              </p>
              <div className="tags">
                <span>
                  Unified inbox
                </span>
                <span>
                  Auto-assign
                </span>
                <span>
                  Escalation
                </span>
                <span>
                  Auto-reply
                </span>
                <span>
                  AI responses
                </span>
                <span>
                  AI summaries
                </span>
                <span>
                  Order tracking
                </span>
                <span>
                  Customer notifications
                </span>
                <span>
                  Feedback surveys
                </span>
                <span>
                  FAQs
                </span>
                <span>
                  Chatbot
                </span>
                <span>
                  Contact forms
                </span>
                <span>
                  Multi-store
                </span>
                <span>
                  Team shift scheduling
                </span>
                <span>
                  Analytics
                </span>
                <span>
                  Custom support domain
                </span>
              </div>
            </div>
            <div className="cta-block rv up">
              <button className="cta" data-go="">
                Book my setup call
                <span className="arr" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "40px" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              You stay in control
            </span>
            <h2 className="rv blur">
              {"You decide "}
              <em>
                where the AI stops.
              </em>
            </h2>
            <p className="rv up d1">
              Predictable questions get drafted from your live store data. Anything risky, messy or emotional goes to a person.
            </p>
          </div>
          <div className="line-grid">
            <div className="lane ai rv left">
              <h3>
                {"AI drafts "}
                <span className="lane-tag">
                  Predictable work
                </span>
              </h3>
              <p className="sub">
                Answered from your orders, tracking, products and policies. Never from guesswork.
              </p>
              <ul>
                <li>
                  <span className="dot">
                    ✓
                  </span>
                  Where is my order? Tracking and delivery dates
                </li>
                <li>
                  <span className="dot">
                    ✓
                  </span>
                  Shipping questions and delivery timelines
                </li>
                <li>
                  <span className="dot">
                    ✓
                  </span>
                  Return and exchange steps, per your policy
                </li>
                <li>
                  <span className="dot">
                    ✓
                  </span>
                  Product and FAQ questions from your catalog
                </li>
              </ul>
            </div>
            <div className="lane hu rv right d1">
              <h3>
                {"Humans decide "}
                <span className="lane-tag">
                  Judgment calls
                </span>
              </h3>
              <p className="sub">
                Sent to the right person with a priority flag and an SLA timer.
              </p>
              <ul>
                <li>
                  <span className="dot">
                    !
                  </span>
                  Refunds and order edits
                </li>
                <li>
                  <span className="dot">
                    !
                  </span>
                  Delivery exceptions and damaged items
                </li>
                <li>
                  <span className="dot">
                    !
                  </span>
                  Angry or upset customers
                </li>
                <li>
                  <span className="dot">
                    !
                  </span>
                  Anything the AI is not sure about
                </li>
              </ul>
            </div>
          </div>
          <div className="handoff rv up d2">
            <span className="hi">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <div>
              <b>
                The customer never repeats themselves.
              </b>
              <p>
                Every handoff carries the order, the conversation and the customer history.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ background: "var(--tint)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              Do the math
            </span>
            <h2 className="rv blur">
              {"How many hours is “Where is my order?” "}
              <em>
                costing you?
              </em>
            </h2>
            <p className="rv up d1">
              Move the sliders to match your store. The numbers are yours, not ours.
            </p>
          </div>
          <div className="calc rv up d2">
            <div className="calc-in">
              <div className="rng">
                <label htmlFor="r1">
                  {"Tickets a day "}
                  <output id="o1">
                    47
                  </output>
                </label>
                <input id="r1" type="range" min="5" max="600" step="1" defaultValue="47" />
                <small>
                  Across email, chat and contact forms
                </small>
              </div>
              <div className="rng">
                <label htmlFor="r2">
                  {"Minutes per reply "}
                  <output id="o2">
                    6
                  </output>
                </label>
                <input id="r2" type="range" min="1" max="20" step="1" defaultValue="6" />
                <small>
                  Look up order, type, send
                </small>
              </div>
              <div className="rng">
                <label htmlFor="r3">
                  {"Repetitive share "}
                  <output id="o3">
                    63%
                  </output>
                </label>
                <input id="r3" type="range" min="10" max="90" step="1" defaultValue="63" />
                <small>
                  Order status, returns, refunds, FAQs
                </small>
              </div>
            </div>
            <div className="calc-out" aria-live="polite">
              <div className="big" id="hOut">
                89
              </div>
              <p>
                hours a month spent typing answers your Shopify data already knows.
              </p>
              <div className="sub2">
                <div>
                  <b id="wOut">
                    2.2
                  </b>
                  work weeks a month
                </div>
                <div>
                  <b id="tOut">
                    889
                  </b>
                  repeat tickets a month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              Your options
            </span>
            <h2 className="rv blur">
              {"Three ways to fix a drowning inbox. "}
              <em>
                Only one scales.
              </em>
            </h2>
            <p className="rv up d1">
              You have probably tried the first two already.
            </p>
          </div>
          <div className="cmp swipe" aria-label="Three options, swipe to compare">
            <div className="cmp-card rv up">
              <h3>
                Hire another agent
              </h3>
              <p className="who">
                The default move
              </p>
              <ul>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  A new salary for questions that are basically lookups
                </li>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  Seasonal hires leave before they learn your returns policy
                </li>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  Swamped again at the next sale or spike
                </li>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  Handles judgment calls well
                </li>
              </ul>
            </div>
            <div className="cmp-card win rv up d1">
              <h3>
                {"Chili Labs "}
                <span className="win-tag">
                  Built for Shopify
                </span>
              </h3>
              <p className="who">
                AI drafts, humans decide
              </p>
              <ul>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  Reads the real order before it replies
                </li>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  One inbox, SLA alerts, smart routing
                </li>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  Hands tricky tickets to a human with context
                </li>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  From $29 a month
                </li>
              </ul>
            </div>
            <div className="cmp-card rv up d2">
              <h3>
                Generic chatbot
              </h3>
              <p className="who">
                The quick fix
              </p>
              <ul>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  Cannot see live order or tracking data
                </li>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  Confidently guesses on delivery exceptions
                </li>
                <li>
                  <span className="m no">
                    ✕
                  </span>
                  A slightly interactive FAQ, with no clean handoff
                </li>
                <li>
                  <span className="m yes">
                    ✓
                  </span>
                  Cheap to switch on
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="sec" style={{ background: "var(--tint)" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              Reviews
            </span>
            <h2 className="rv blur">
              {"Shopify brands that "}
              <em>
                stopped drowning.
              </em>
            </h2>
            <p className="rv up d1">
              Real Shopify stores, in their own words.
            </p>
          </div>
          <div className="gr rv up d1">
            <div className="gr-top">
              <div className="gr-score">
                <span className="gr-num">
                  4.6
                </span>
                <span className="gr-stars" aria-label="Rated 4.6 out of 5">
                  <span className="gr-bg">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                  </span>
                  <span className="gr-fg" style={{ width: "92%" }}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                    </svg>
                  </span>
                </span>
                <span className="gr-count">
                  5 reviews on the Shopify App Store
                </span>
              </div>
              <div className="gr-bars" aria-hidden="true">
                <div>
                  <span>
                    5
                  </span>
                  <i>
                    <b style={{ width: "60%" }} />
                  </i>
                </div>
                <div>
                  <span>
                    4
                  </span>
                  <i>
                    <b style={{ width: "40%" }} />
                  </i>
                </div>
                <div>
                  <span>
                    3
                  </span>
                  <i>
                    <b style={{ width: "0" }} />
                  </i>
                </div>
                <div>
                  <span>
                    2
                  </span>
                  <i>
                    <b style={{ width: "0" }} />
                  </i>
                </div>
                <div>
                  <span>
                    1
                  </span>
                  <i>
                    <b style={{ width: "0" }} />
                  </i>
                </div>
              </div>
            </div>
            <div className="gr-list swipe" aria-label="Reviews, swipe to read more">
              <article className="gr-card">
                <div className="gr-head">
                  <div className="gr-av">
                    <img src="/img/img-653b479ecc.png" alt="" />
                  </div>
                  <div className="gr-who">
                    <b>
                      Seoulskin
                    </b>
                    <small>
                      India
                    </small>
                  </div>
                </div>
                <div className="gr-meta">
                  <span>
                    Aug 4, 2026
                  </span>
                  <span className="gr-dot" />
                  <span>
                    4 days using the app
                  </span>
                </div>
                <p className="gr-title">
                  Support feels much more organized
                </p>
                <p className="gr-text">
                  Customers can select exactly what they need help with instead of writing long emails, so our team gets the right context straight away. It has cut down on back-and-forth and made resolving tickets much smoother.
                </p>
              </article>
              <article className="gr-card">
                <div className="gr-head">
                  <div className="gr-av">
                    <img src="/img/img-82c454ebc2.png" alt="" />
                  </div>
                  <div className="gr-who">
                    <b>
                      UrbanYog
                    </b>
                    <small>
                      India
                    </small>
                  </div>
                </div>
                <div className="gr-meta">
                  <span>
                    Aug 4, 2026
                  </span>
                  <span className="gr-dot" />
                  <span>
                    7 days using the app
                  </span>
                </div>
                <p className="gr-title">
                  Less time on the same questions
                </p>
                <p className="gr-text">
                  We were spending too much time answering the same order status and shipping questions every day. Chililabs helps us handle those much faster, which lets our team focus on more complex customer issues.
                </p>
              </article>
              <article className="gr-card">
                <div className="gr-head">
                  <div className="gr-av">
                    <img src="/img/img-e0ef6b52af.png" alt="" />
                  </div>
                  <div className="gr-who">
                    <b>
                      UrbanGabru
                    </b>
                    <small>
                      A GlobalBees brand, India
                    </small>
                  </div>
                </div>
                <div className="gr-meta">
                  <span>
                    Aug 4, 2026
                  </span>
                  <span className="gr-dot" />
                  <span>
                    4 days using the app
                  </span>
                </div>
                <p className="gr-title">
                  Exactly what our support team needed
                </p>
                <p className="gr-text">
                  {"Customers don't have to wonder where to reach us anymore. The support flow is straightforward, and we've noticed conversations are much smoother from the start."}
                </p>
              </article>
              <article className="gr-card">
                <div className="gr-head">
                  <div className="gr-av">
                    <img src="/img/img-331f719a4b.png" alt="" />
                  </div>
                  <div className="gr-who">
                    <b>
                      Trimfinity
                    </b>
                    <small>
                      India
                    </small>
                  </div>
                </div>
                <div className="gr-meta">
                  <span>
                    Aug 4, 2026
                  </span>
                  <span className="gr-dot" />
                  <span>
                    4 days using the app
                  </span>
                </div>
                <p className="gr-title">
                  Every ticket in one dashboard
                </p>
                <p className="gr-text">
                  The biggest challenge for us was managing customer queries across multiple channels. Chililabs centralized everything into a single dashboard, making it much easier for our team to stay on top of every ticket.
                </p>
              </article>
            </div>
          </div>
          <div className="reels">
            <button className="reel rv zoom" data-reel="0" aria-label="Play UrbanGabru story">
              <span className="rl-logo">
                <img src="/img/img-e0ef6b52af.png" alt="" />
              </span>
              <span className="play">
                <svg viewBox="0 0 24 24">
                  <path d="M7 4l13 8-13 8z" fill="#2e1065" />
                </svg>
              </span>
              <span className="rn">
                UrbanGabru
                <small>
                  Support flow story
                </small>
              </span>
            </button>
            <button className="reel rv zoom d1" data-reel="1" aria-label="Play Seoulskin story">
              <span className="rl-logo">
                <img src="/img/img-653b479ecc.png" alt="" />
              </span>
              <span className="play">
                <svg viewBox="0 0 24 24">
                  <path d="M7 4l13 8-13 8z" fill="#2e1065" />
                </svg>
              </span>
              <span className="rn">
                Seoulskin
                <small>
                  Issue flow story
                </small>
              </span>
            </button>
            <button className="reel rv zoom d2" data-reel="2" aria-label="Play UrbanYog story">
              <span className="rl-logo">
                <img src="/img/img-82c454ebc2.png" alt="" />
              </span>
              <span className="play">
                <svg viewBox="0 0 24 24">
                  <path d="M7 4l13 8-13 8z" fill="#2e1065" />
                </svg>
              </span>
              <span className="rn">
                UrbanYog
                <small>
                  Repeat questions story
                </small>
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              Pricing
            </span>
            <h2 className="rv blur">
              {"Costs less than one extra hire. "}
              <em>
                By a lot.
              </em>
            </h2>
            <p className="rv up d1">
              Plans scale with your monthly ticket volume. Every plan starts with a 15-day free trial, billed through Shopify in USD.
            </p>
          </div>
          <div className="prices swipe" aria-label="Plans, swipe to compare">
            <div className="price rv up">
              <h3>
                Starter
              </h3>
              <div className="amt">
                $29
                <small>
                  {" /month"}
                </small>
              </div>
              <p>
                For stores that want one organized support inbox.
              </p>
              <div className="inc">
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Up to 250 tickets a month
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Custom support domain
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Connect multiple support inboxes
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Team shift scheduling
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Smart ticket assignment
                </div>
              </div>
            </div>
            <div className="price rec rv up d1">
              <span className="rec-tag">
                AI draft replies start here
              </span>
              <h3>
                Growth
              </h3>
              <div className="amt">
                $59
                <small>
                  {" /month"}
                </small>
              </div>
              <p>
                For stores ready to let AI draft the repetitive replies.
              </p>
              <div className="inc">
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Up to 1,000 tickets a month
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Everything in Starter
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  AI draft replies
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  AI replies trained on your store policies
                </div>
              </div>
            </div>
            <div className="price rv up d2">
              <h3>
                Pro
              </h3>
              <div className="amt">
                $99
                <small>
                  {" /month"}
                </small>
              </div>
              <p>
                For scaling stores with a busy queue.
              </p>
              <div className="inc">
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Up to 2,500 tickets a month
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Everything in Growth
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Priority support setup
                </div>
                <div>
                  <span className="m yes">
                    ✓
                  </span>
                  Extra tickets at $6 per 100
                </div>
              </div>
            </div>
          </div>
          <div className="cta-block rv up">
            <button className="cta" data-go="">
              Book my setup call
              <span className="arr" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
            <p className="cta-note">
              Uninstall before the trial ends and you pay nothing.
            </p>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "24px" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow rv up">
              FAQ
            </span>
            <h2 className="rv blur">
              {"Questions "}
              <em>
                before you start.
              </em>
            </h2>
          </div>
          <div className="faq">
            <details className="rv up">
              <summary>
                What if the AI tells a customer something wrong?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                Chili Labs reads the real order and tracking data from your store before it drafts anything, so it is not guessing. Your agents review drafts and send in one click, and anything that needs judgment goes to a human with the full context.
              </div>
            </details>
            <details className="rv up">
              <summary>
                If I still have to check every AI answer, do I actually save time?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                Yes. The slow part of support is the lookup: open the order, find the tracking, check the policy, then type. Chili Labs does all of that and hands your agent a finished draft with the order already on screen. Reviewing a ready reply takes seconds.
              </div>
            </details>
            <details className="rv up">
              <summary>
                Will the AI issue refunds or cancel orders on its own?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                No. Refunds, order edits and other judgment calls go to a person on your team, with the full context attached. The AI drafts. Your team decides.
              </div>
            </details>
            <details className="rv up">
              <summary>
                How does pricing work?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                Plans are priced by monthly ticket volume. Starter covers up to 250 tickets, Growth up to 1,000 and Pro up to 2,500, with extra tickets on Pro at $6 per 100. AI draft replies are included from Growth up. Billing runs through Shopify in USD.
              </div>
            </details>
            <details className="rv up">
              <summary>
                Is this another tool I have to set up and babysit?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                No. You approve the app inside Shopify and it connects to your orders in under 7 minutes. There is no long onboarding and no new system to learn from scratch.
              </div>
            </details>
            <details className="rv up">
              <summary>
                Does it replace my support team?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                No, and that is the point. AI handles the repetitive work like order status, returns and refunds. Your people handle what matters. Most stores use it to grow without hiring a big support team.
              </div>
            </details>
            <details className="rv up">
              <summary>
                My store is not on Shopify. Can I still use it?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                Not yet. Chili Labs is built only for Shopify so it can read your order data directly. That is what makes the replies accurate.
              </div>
            </details>
            <details className="rv up">
              <summary>
                Do you work with stores in the US and India?
                <span className="pm">
                  +
                </span>
              </summary>
              <div className="a">
                Yes. Chili Labs works for Shopify stores selling in the US, India and elsewhere. Plans are billed monthly in USD.
              </div>
            </details>
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: "24px", paddingBottom: "56px" }}>
        <div className="wrap">
          <div className="final-card dark rv zoom">
            <h2>
              {"Scale your store, "}
              <em>
                not your support chaos.
              </em>
            </h2>
            <p>
              Your next “Where is my order?” is already on its way. Let Chili Labs draft the answer.
            </p>
            <div className="cta-block">
              <button className="cta" data-go="">
                Book my setup call
                <span className="arr" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="brand">
          <img src="/img/img-a150b75102.png" alt="" width="26" height="26" />
          <span>
            Chili Labs
          </span>
        </div>
        <p>
          AI customer support for Shopify merchants.
        </p>
        <p style={{ marginTop: "4px" }}>
          © 2026 Chili Labs. All rights reserved.
        </p>
      </footer>
      <div className="fbar" id="fbar" aria-label="Black Friday countdown">
        <div className="fbar-in">
          <div className="fb-l">
            <small>
              Black Friday countdown. Get support ready first.
            </small>
            <div className="clock">
              <span id="cd">
                57
              </span>
              <em>
                d
              </em>
              <span id="ch">
                00
              </span>
              <em>
                h
              </em>
              <span id="cm">
                00
              </span>
              <em>
                m
              </em>
              <span id="cs">
                00
              </span>
              <em>
                s
              </em>
            </div>
          </div>
          <button className="cta" data-go="">
            Book my setup call
            <span className="arr" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <LeadForm />
      <div className="modal" id="modal" role="dialog" aria-modal="true" aria-label="Customer story">
        <div className="reel-box">
          <div className="reel-prog">
            <i id="reelProg" />
          </div>
          <button className="x-close" id="xClose" aria-label="Close story">
            ✕
          </button>
          <div className="reel-logo" id="reelLogo">
            <img id="reelImg" alt="" />
          </div>
          <div className="reel-txt" id="reelTxt" />
        </div>
      </div>
      <div className="gn-proof-ticker" id="gn-proof-ticker" role="status" aria-live="polite">
        <div className="gn-proof-ticker__thumb">
          <svg className="gn-proof-ticker__pin" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 0C4.925 0 0 4.925 0 11c0 7.5 11 17 11 17s11-9.5 11-17c0-6.075-4.925-11-11-11z" fill="#3b5afe" />
            <circle cx="11" cy="11" r="4" fill="#ffffff" />
          </svg>
        </div>
        <div className="gn-proof-ticker__content">
          <div className="gn-proof-ticker__line1">
            <span id="gn-ticker-name">
              Ananya R.
            </span>
            <span className="gn-proof-ticker__line1-from">
              {" from "}
            </span>
            <span id="gn-ticker-city">
              Bengaluru, KA
            </span>
          </div>
          <div className="gn-proof-ticker__line2" id="gn-ticker-action">
            Just started a free trial
          </div>
          <div className="gn-proof-ticker__line3">
            <span className="gn-proof-ticker__time" id="gn-ticker-time">
              2 min ago
            </span>
            <svg className="gn-proof-ticker__badge" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Z" fill="#3b5afe" />
              <path d="M8 12.5l2.7 2.7L16.5 9" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="gn-proof-ticker__verified">
              Verified by Proof
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
