# Tawi Outdoor budget pacing inputs

Fictional source records for Windsor.ai B8-33. All campaign and account IDs are synthetic. No real advertising is running and no money is being spent.

Campaign reporting month: September 2026. Review date: September 24. Daily spend is complete through September 23 inclusive, Africa/Nairobi. All amounts are USD. Do not include partial September 24 data.

- campaign-daily.csv: 184 rows, eight campaigns across three simulated ad accounts, one record per campaign per day for September 1-23. Explicit zero-spend days are included.
- campaign-budgets.csv: eight approved September budget records with campaign IDs, flight dates, status, notes and cutoff. Monthly budgets total $39,000. Budgets are one per campaign and must not be added repeatedly after joining to daily spend.

Join on account_id and campaign_id. Retrieve source_row_id to retain the original grain. Campaign names are display labels, not join keys. No missing spend days or duplicate source rows are present.

Compare actual spend against an even pacing plan over each campaign's approved flight dates, inclusive. Calculate planned spend to cutoff, pace percentage, remaining budget, projected final spend and the remaining daily allowance. Use a 10% budget deviation as the material over/underspend threshold.

Show both a flight-adjusted average-to-date projection and a recent seven-complete-day run-rate projection. For the latter, add spend to date to average September 17-23 daily spend times remaining approved days. Treat a paused campaign as zero future spend unless a restart is approved. A completed campaign should not be projected past its end date. The mid-month launch has a September 16-30 flight and its whole $3,000 budget belongs to that flight.

The data includes steady high/low spending, a stable campaign, a recent surge, a recent slowdown, a mid-month launch, an ended sale and a paused campaign. Recommend follow-up actions only. Do not change budgets, status, source records or settings.

These CSVs are connected through Windsor File. Channel names do not establish native Google Ads, Meta Ads or TikTok connections. This is an approved synthetic test alternative and does not satisfy the native-account setup prerequisite in full.
