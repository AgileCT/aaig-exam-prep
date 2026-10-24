# Second flashcard review: results and how they were applied (2026-10-24)

Input: `AAIG_Flashcard_Review_Packet_2_Results.docx`, SHA256 `077407981a14eb70d6983c5fe3a6f5ce45a5e75c7967bb769eef4ca4a6ea81f8`.
Packet reviewed: `2026-10-24-flashcard-review-packet-2.docx` (99 cards).

## Decisions

| Item | Decision | Applied |
| --- | --- | --- |
| R1-R7, all 99 cards | Approved; "Pending verification" labels may be removed | Labels removed from fc-41 to fc-61. Every card is `reviewStatus: 'reviewed'`. |
| Q1 flagged sources | Source checked, keep (the report names 17 items; the packet listed 31) | No source text changed. |
| Q2 terms | Keep representation drift, data contract, continuous assurance | Unchanged. |
| Q3 | Merge fc-50 into fc-49 | fc-50 removed; fc-49 now opens with the baseline reason. 98 cards. |
| Q4 | fc-47 "at least six months" is correct | Unchanged. |
| Q5 | Write reviewer information | `reviewedBy: Xiaoli (Shelly) Zhao`, `reviewedAt: 2026-10-24` on every card. |
| Q6 | D2 share is fine | D2 stays at 29 of 98. |

Reviewer qualifications as stated in the report: CISSP, CISM, CISA, CRISC, CCSP, CGRC, CTPRP, TOGAF 9, SABSA Foundation, PMP.

## What this does and does not establish

- The reviewer's statement is recorded as a practitioner review. It is not ISACA approval and not independent SME certification.
- The report gives a blanket approval and does not list, source by source, which passages of the NIST, ISO, EU AI Act, GDPR or COBIT texts were checked. The report says 17 flagged items while the packet flagged 31; the reviewer's decision was applied to all of them.
- No `sourceUrl` was added; the nine evidence-pending questions from 2026-10-14 are unchanged and still open.
- Saved mastery for fc-50 (a card added the same day) no longer points at a card; fc-49 keeps its own.
- Review metadata is not part of the content hash: `tests/review-import.test.ts` compares cards with the 2026-10-14 snapshot ignoring `reviewedBy` and `reviewedAt`.
