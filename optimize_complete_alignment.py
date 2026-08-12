import re

file_path = '/Users/paman/Downloads/SIMRAN DIDI/web_backup/css/styles.css'

with open(file_path, 'r', encoding='utf-8') as f:
    css = f.read()

# Append clean alignment utility rules and section alignment overrides to styles.css
alignment_css = """

/* ============================================================
   ALIGNMENT & GEOMETRY OPTIMIZATION PASS
   ============================================================ */

/* Container & Grid Alignment */
.container {
  width: 100%;
  max-width: var(--max-w);
  margin-left: auto;
  margin-right: auto;
  padding-inline: clamp(1.25rem, 4vw, 2.5rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: center;
}

/* Stats Strip Alignment */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-lg);
  margin-top: var(--sp-3xl);
  padding-top: var(--sp-xl);
  border-top: 1px solid var(--border);
  align-items: start;
}

@media (max-width: 850px) {
  .stats-strip {
    grid-template-columns: 1fr;
    gap: var(--sp-md);
  }
}

/* Evidence Cards Alignment */
.ev-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-md);
}

@media (max-width: 550px) {
  .ev-grid {
    grid-template-columns: 1fr;
  }
}

/* Timeline & Morphing Badge Center Alignment */
.timeline-morph-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Simulator Output Vertical Alignment */
.sim-output {
  display: flex;
  flex-direction: column;
  gap: var(--sp-md);
  height: 100%;
  justify-content: center;
}

/* Newsletter Input Row Alignment */
#newsletter form {
  display: flex;
  align-items: center;
  gap: var(--sp-sm);
  flex-wrap: wrap;
}

#newsletter input[type="text"],
#newsletter input[type="email"] {
  height: 48px;
  border-radius: 4px;
  padding-inline: var(--sp-md);
}

#newsletter button {
  height: 48px;
  padding-inline: var(--sp-xl);
}

/* Section Header Clean Baseline */
.sec-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--sp-sm);
  border-bottom: 1px solid var(--border);
  margin-bottom: clamp(1.5rem, 3.5vw, 2.5rem);
}
"""

if 'ALIGNMENT & GEOMETRY OPTIMIZATION PASS' not in css:
    css += alignment_css

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Alignment CSS optimization appended successfully.")
