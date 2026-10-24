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
