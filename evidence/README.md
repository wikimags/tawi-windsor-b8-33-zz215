# B8-33 before-state verification

Verified September 24, 2026 before the scored model runs. These are input setup checks, not Actual Results.

Windsor File, authenticated as zz215@expert.micro1.ai:

- tawi_b8_33_daily, account 379: all 184 rows retrieved, 2,208 source cells matched.
- tawi_b8_33_budgets, account 380: all eight rows retrieved, 144 source cells matched.
- Total: **2,352 source values matched** after normalizing Boolean text only. Full readbacks and discovered field definitions are retained here.

The source CSVs are pinned at Git revision f2a1b544c02ab8804e28e1085573c120cee0c983. Reporting month is September 2026, with complete September 1-23 spending in Africa/Nairobi and eight campaign plans. Raw spend totals $27,600 and unique campaign budgets total $39,000. All amounts are USD.

Readback query date range: September 1-23. Each query used every discovered field for its dataset. source_row_id identifies individual source records. Source files and settings should remain identical for both read-only benchmark runs.

The local before pack contains screenshots of Windsor connections, source definitions, budget records, daily spending, the recent spending shift and this verification report. GitHub screenshots are views of the source CSVs, not native ad-platform pages. JSON readbacks document what Windsor actually returned.

No live ad accounts were connected. This approved synthetic File setup supports pacing analysis but does not fully reproduce the task's native paid-ad-account prerequisite.
