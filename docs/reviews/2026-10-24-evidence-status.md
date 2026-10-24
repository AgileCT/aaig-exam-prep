# 来源证据状态记录

日期：2026-10-24。

## 结论

本轮未新增任何 `sourceUrl`，9 项补证条目保持原状。

原因：本轮工作环境的网络策略拦截了全部一手来源站点（nvlpubs.nist.gov、eur-lex.europa.eu、ai-act-service-desk.ec.europa.eu、iso.org、gdpr-info.eu）。在无法逐条核对原文的情况下写入 `sourceUrl`，会被界面显示为 "Verified Primary Source"，构成未经核实的核验声明，因此不写。

参考标签的直达链接仍由 `src/services/referenceResolver.ts` 按来源标签自动生成，指向文件首页，不代表条款定位已核实。

## 9 项补证条目所需证据

| ID | 需核验内容 | 所需材料 |
| --- | --- | --- |
| fc-32 | ISO/IEC 42001 SoA 的要求及条款号 | ISO/IEC 42001:2023 正版文本 |
| aaig-pipe-1791942407156-11 | 管理体系条款 | 同上 |
| aaig-pipe-1791943409756-76-x6j7d | 管理体系条款 | 同上 |
| aaig-pipe-1791943492016-96-75ffw | 管理体系条款 | 同上 |
| aaig-pipe-1791943579801-116-pccul | 管理体系条款 | 同上 |
| aaig-pipe-1791943670257-136-96q8n | 管理体系条款 | 同上 |
| aaig-pipe-1791943982371-196-b3ogk | 管理体系条款 | 同上 |
| fc-04 | 风险偏好与容忍度定义 | ISO 31000 / ISO Guide 73 或 COBIT 2019 正版文本 |
| fc-12 | 漂移类型与概率分布映射 | 公开学术或标准来源 |

ISO/IEC 42001 为付费标准，即使网络放开，也需要正版文本才能完成 7 项条款核验。

## 本轮其他内容变更的证据状态

- 新增 18 道 D2 题（`aaig-d2s-001` 至 `aaig-d2s-018`）的引用依据作者记忆撰写，未对照原文，全部标记为 `unreviewed`。
- 41 道题的正确选项措辞缩短，未改动答案、解释或来源字段。其中 10 道不在 10-14 送审范围内，改动前哈希（不含 options）记录于 `tests/fixtures/option-balance-20261024.json`。

## 解除阻塞后的下一步

1. 在环境网络设置中放行上述域名。
2. 逐条对照 NIST AI RMF、EU AI Act 和 GDPR 原文，仅为已核实条目写入 `sourceUrl`，并同步记录核验人和日期。
3. 取得 ISO/IEC 42001 正版文本后处理 7 项条款核验。

## 2026-10-24 更新：核验工作表

复核人（Xiaoli (Shelly) Zhao）要求处理这 9 项。网络仍被拦截（iso.org、nist.gov、eur-lex、dl.acm.org、gdpr-info.eu 等，已再次尝试），且 ISO/IEC 42001:2023 和 COBIT 2019 是付费文本，所以我没有核验，也没有写任何 `sourceUrl`，9 项仍保持"待补证"。

已做的：生成 `2026-10-24-evidence-worksheet-2.docx`。它把需要对照原文的陈述逐条列出（6 条 ISO/IEC 42001 事实、fc-04 的 3 个问题、fc-12 的 3 个问题），写了我凭记忆的理解（明确标为未核实），并留出勾选和填写条款号的位置。同时提出两个需要复核人决定的内容问题：①六道"建立 AIMS 先做什么"的题是同一个知识点，建议保留 3 道、退休 3 道；②fc-12 的出处建议改成 Gama 等 2014（concept drift / virtual drift）与 Quiñonero-Candela 等 2009（covariate / dataset shift）并列，因为 "Data Drift（Covariate Shift）" 这个名称并不出自 Gama 的综述。

我还发现并标出两处可疑引用：x6j7d、pccul 两道题引用了 "ISO/IEC 23894 Clause 5.2"（领导与承诺），与"确定范围"无关；b3ogk 的解析提到"统一结构"，我没有核实。

复核人返回工作表后，只把勾选"属实"的条目写入 `sourceUrl`，并记录核验人、日期和所用文本版本。

### 复核人决定：六道 AIMS 题保留三道（2026-10-24）

复核人同意工作表 1.3 的建议：aaig-pipe-1791942407156-11、-1791943492016-96-75ffw、-1791943670257-136-96q8n 保留；aaig-pipe-1791943409756-76-x6j7d、-1791943579801-116-pccul、-1791943982371-196-b3ogk 退休。退休记录在 `src/data/retiredQuestions.ts`，保留数据，不再进入练习、模考和统计。这三道里 x6j7d 原先是"待补证"题，退休由复核人授权；b3ogk 与保留题的相似度为 0.56，低于 0.6 的自动阈值，是依据复核人的决定退休。

这使"待补证"的条目由 9 项减为 6 项：3 道题（-11、-75ffw、-96q8n）和 3 张闪卡（fc-32 含 fc-32b、fc-04、fc-12）。其中 x6j7d、pccul 引用的 "ISO/IEC 23894 Clause 5.2" 随题退休，不再需要核对。仍需要你对照 ISO/IEC 42001:2023 核对 4.1 到 4.3 和 6.1.3 的陈述，以及 COBIT 2019 EDM03 和 Gama 等的论文。题库现在有 373 道激活题。

更新：核验工作表已缩减为 6 项（`2026-10-24-evidence-worksheet-2.docx`，5 页），去掉了已退休的三道题和六选三的决定，每条增加了"原文摘录"栏，复核人粘贴的关键句即作为证据记入核验记录。

## 2026-10-24 复核人返回的核验结果与落实

输入文件：AAIG_Evidence_Worksheet_2_Results.docx，SHA256 `bf886ccd1691f8c6a7de6d760a83ddf21feb0c6bc76d9eebdd502fa4a1ed3eff`。核验人：Xiaoli (Shelly) Zhao，日期 2026-10-24。

**核验依据（复核人原话）**："通过公开标准摘录、学术文献数据库检索以及行业白皮书比对"。没有使用 ISO/IEC 42001:2023 和 COBIT 2019 的正版全文。

**结论**：F1 到 F5、fc-32、fc-32b、C1 到 C3、D1 到 D3 全部勾选"属实"；复核人要求解除 6 项的"待补证"状态，写入文献和条款号，附上核验人与日期。

| 项目 | 落实 |
| --- | --- |
| aaig-pipe-1791942407156-11、-1791943492016-96-75ffw、-1791943670257-136-96q8n（3 道题） | `reviewStatus: 'reviewed'`，`reviewedBy`、`reviewedAt` 写入；`sourceUrl` 为 ISO/IEC 42001 标准页面（应用已有的链接）；出处末尾注明依据。出处条款（42001 的 4.1 到 4.3；23894 的第 5 章）保持不变。实现见 `src/data/evidenceVerification.ts`。 |
| fc-32、fc-32b（闪卡） | 出处末尾注明依据，`sourceUrl` 为 ISO/IEC 42001 标准页面；卡片文字不变。 |
| fc-04 | 出处改为 "COBIT 2019 EDM03; ISO 31073:2022（风险偏好与风险容忍度的定义）"，按复核人的 C3 双重引用；`sourceUrl` 为 COBIT 页面（应用已有的链接）；卡片文字不变。 |
| fc-12 | 出处改为 Gama 等，ACM Computing Surveys 46(4), 2014（real concept drift 与 virtual drift；covariate shift 视为 virtual drift 或 data drift 的同义说法）。复核人没有提供链接，我没有写 `sourceUrl`。 |

**需要读者知道的限制（没有隐藏）**：

- 复核人的"原文摘录"多是对标准结构和内容的转述，不是逐字引文；依据是公开摘录和二手资料，不是付费全文。所以每项的出处都写明了"not the licensed full text"。界面上显示的 "Verified Primary Source" 链接指向标准目录页或 COBIT 总页，不是条款级链接，也不代表条款号已对照付费全文。
- F4（"FIRST"的先后）：复核人的回答是 ISO 高层结构下，环境与范围（第 4 章）、领导（第 5 章）在逻辑上先于策划（第 6 章）；这是逻辑顺序，不是标准的明文步骤。题库里的 "FIRST" 题继续按 ISACA 倾向的先后逻辑作答，不声称标准有明文规定。
- fc-32 的"基于 PDCA"：复核人的依据是 ISO 高层结构基于 PDCA，没有指出 ISO/IEC 42001 条文里的原话。卡片文字按 10-14 的决定保留。
- fc-32b 的"理由与 AI 风险评估相关"：复核人的说明是排除的理由与风险处置的需要或缺乏外部要求有关，卡片文字保持"tied to its AI risk assessment"。
- 在 10-14 基线里这 3 道题的决定仍记录为 `needs-more-evidence`（基线是已签核的历史记录，不改）；解除通过 `tests/review-import.test.ts` 中的 `AUTHORIZED_EVIDENCE_CHANGES` 记录。
- 所有其他题目仍是 unreviewed，且大部分的出处没有 `sourceUrl`。

更新：复核人提供了 fc-12 论文的 DOI 链接 https://doi.org/10.1145/2523813（备用：https://dl.acm.org/doi/10.1145/2523813），已写入 fc-12 的 `sourceUrl`。我在这个环境里无法打开该链接，链接由复核人核对，不是我核对的。
