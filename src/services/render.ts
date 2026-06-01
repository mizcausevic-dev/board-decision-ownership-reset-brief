import {
  interventionPosture,
  ownershipLane,
  payload,
  resetLedger,
  riskMap,
  summary,
  verification
} from "./verticalBriefService.js";

const productTitle = "Board Decision Ownership Reset Brief";
const domain = "https://ownership-reset.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/ownership-lane", "Ownership lane"],
    ["/reset-ledger", "Reset ledger"],
    ["/intervention-posture", "Intervention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = ownershipLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Ownership theme:</strong> ${escapeHtml(item.ownershipTheme)}</p>
        <p><strong>Decision handoffs:</strong> ${item.decisionHandoffs} · <strong>Unresolved owners:</strong> ${item.unresolvedOwners}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeOwnershipRiskScore} · confidence ${item.boardConfidenceScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Ownership reset</span>
      <h1>Where has final decision ownership drifted far enough that the board can no longer trust who actually has the last call?</h1>
      <p class="lede">Board Decision Ownership Reset Brief turns handoff sprawl, owner drift, approval conflict, ownership coverage, and board confidence into one executive packet for owner resets, approver clarity, handoff collapse, or scope pauses.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Ownership lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled decision-ownership lanes in the current board packet.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Lanes with high handoff, owner, approval-conflict, coverage, clarity, or confidence strain.</div></div>
        <div class="metric"><span class="metric-label">Reset priority</span><span class="metric-value">${executiveSummary.resetPriorityLanes}</span><div class="metric-copy">Lanes that already justify an owner reset or final-approver clarification before more scope is approved.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to unresolved ownership and approval-chain weaknesses.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Ownership lane</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible ownership exposures</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready ownership-reset surface for restoring final decision accountability, escalation clarity, and board-safe intervention paths."
  );
}

export function renderOwnershipLane() {
  const rows = ownershipLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.ownershipTheme)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.unresolvedOwners}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Ownership lane",
    "/ownership-lane",
    `<section class="hero">
      <span class="eyebrow">Ownership lane</span>
      <h1>Each lane stays tied to one ownership problem, one board audience, one corrective action, and one clean next move.</h1>
      <p class="lede">The ownership-lane view keeps final accountability readable instead of hiding owner drift behind more committee motion.</p>
      <div class="nav">${navLinks("/ownership-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Ownership theme</th><th>Handoffs</th><th>Unresolved owners</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Decision-ownership view showing actions, handoff counts, owner gaps, and board-confidence strength."
  );
}

export function renderResetLedger() {
  const rows = resetLedger()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.resetHeadline)}</td>
        <td>${escapeHtml(item.ownershipSignal)}</td>
        <td>${escapeHtml(item.ownerOfRecord)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.approvalConflicts}</td>
        <td>${escapeHtml(item.requiredEvidence.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Reset ledger",
    "/reset-ledger",
    `<section class="hero">
      <span class="eyebrow">Reset ledger</span>
      <h1>Ownership headlines, conflict signals, owners of record, handoff counts, and required evidence stay visible before another board packet gets reopened.</h1>
      <p class="lede">This view makes it obvious which decision chains are really ownership failures and who must reset them before leadership funds more scope.</p>
      <div class="nav">${navLinks("/reset-ledger")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Reset headline</th><th>Ownership signal</th><th>Owner of record</th><th>Handoffs</th><th>Approval conflicts</th><th>Required evidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Reset-ledger view for ownership drift, final approver ambiguity, and board-visible evidence needs."
  );
}

export function renderInterventionPosture() {
  const rows = interventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeOwnershipRiskScore}</td>
        <td>${escapeHtml(item.handoffs.severity)}</td>
        <td>${escapeHtml(item.owner.severity)}</td>
        <td>${escapeHtml(item.approvalConflicts.severity)}</td>
        <td>${escapeHtml(item.coverage.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Intervention posture",
    "/intervention-posture",
    `<section class="hero">
      <span class="eyebrow">Intervention posture</span>
      <h1>See where leadership should reset owners, clarify final approvers, collapse handoffs, or pause scope before ownership ambiguity distorts the board story.</h1>
      <p class="lede">This posture view keeps ownership risk and confidence risk connected so leadership can intervene before responsibility diffusion compounds across adjacent lanes.</p>
      <div class="nav">${navLinks("/intervention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Composite risk</th><th>Handoffs</th><th>Owner</th><th>Approval conflicts</th><th>Coverage</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Intervention posture for ownership severities, owner drift, approval conflict, and board-safe action."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this ownership-reset packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, ownership assumptions, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Decision Ownership Reset Brief sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Decision Ownership Reset Brief docs</h1>
      <p class="lede">This surface packages board-readable ownership-reset signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/ownership-lane</code> keeps actions, themes, and next moves readable.</li>
        <li><code>/reset-ledger</code> compares ownership signals, owner-of-record gaps, and evidence needs.</li>
        <li><code>/intervention-posture</code> shows which lanes should reset owners, clarify approvers, collapse handoffs, or pause scope.</li>
        <li><code>/api/payload</code> exposes the reproducible ownership-reset packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Decision Ownership Reset Brief and its board-ready routes."
  );
}
