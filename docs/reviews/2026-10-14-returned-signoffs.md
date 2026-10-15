# AAIG 题库复核意见落实记录

日期：2026-10-14。

## 落实范围

依据用户返回的两份已复核 Word 文档和确认，落实明确的内容修订并验证。本轮不合并、不部署，也未变更 Domain 分类。

| 复核结论 | 数量 | 实际处理 |
| --- | ---: | --- |
| 修订 | 313 | 282 道选择题及 31 张卡片已更新 |
| 保留 | 5 | 完整内容保持原样 |
| 补证 | 9 | 原内容保持原样，不采用临时建议文本 |
| 未送审 | 30 | 完整内容保持原样 |

题库仍为 317 道选择题与 40 张卡片。全部 ID、数组顺序和选择题正确答案索引保持不变。17 道题的选项措辞有明确修订，选项位置未交换。

变更覆盖来源字段 313 项、选择题解释 31 项、选项数组 17 项、干扰项解释 11 项、问题文本 1 项、情境 1 项，以及卡片答案 31 项、要点 31 项、正面 6 项。部分文档措辞与现有字段一致，因此保留原值。

## 对签核稿的额外纠正

独立核对公开原文后，纠正了签核稿本身的 10 项问题，共 14 个字段，并保留导入值、修正值、理由和来源的差异日志：

- 三道题的角色职责引用调整至 NIST GOVERN 2.1。
- 两道隐私题的解释与来源统一至 MEASURE 2.10，避免误用 MANAGE 2.2 或 2.4。
- 两道招聘题不再将 DPIA 写成所有私营雇主的普遍义务，补充处理风险触发条件及适用安排。
- fc-31 正确区分 Article 50 下 provider 的直接 AI 交互告知义务与 deployer 的特定披露义务。
- fc-21 明确 Article 25 下成为 provider 的高风险系统及用途变化触发条件。
- fc-19 移除误带入教学内容的编辑标记。

公开依据：[NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)、[AI Act Article 26](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-26)、[Article 50](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50)、[Article 25](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-25)。

## 继续补证的 9 项

| ID | 待核验内容 |
| --- | --- |
| fc-32 | ISO/IEC 42001 SoA 精确要求及条款 |
| aaig-pipe-1791942407156-11 | ISO/IEC 42001 管理体系条款 |
| aaig-pipe-1791943409756-76-x6j7d | ISO/IEC 42001 管理体系条款 |
| aaig-pipe-1791943492016-96-75ffw | ISO/IEC 42001 管理体系条款 |
| aaig-pipe-1791943579801-116-pccul | ISO/IEC 42001 管理体系条款 |
| aaig-pipe-1791943670257-136-96q8n | ISO/IEC 42001 管理体系条款 |
| aaig-pipe-1791943982371-196-b3ogk | ISO/IEC 42001 管理体系条款 |
| fc-04 | 风险偏好与容忍度定义及依据 |
| fc-12 | 漂移类型、概率分布与来源映射 |

本轮保持现有 `unreviewed` 元数据；文档中通用的复核人标签未被转写成真实外部 SME 身份或认证声明。内容修订完成不等于完成所有标准条款的核验。

## 验证

- `npm run verify`：44/44 测试通过，题库结构检查无错误，TypeScript 与 Vite 生产构建通过。
- 全字段独立对账：357 项中恰好 313 项按变更日志修改，其余 44 项完全不变。
- 回归覆盖：ID、顺序、答案索引、未授权内容保护、NIST 条款定位、法律责任主体、DPIA 条件及编辑标记清理。
- 独立复核：后续 10 项修正及全部变更日志与源码一致，无阻塞问题。
- 仍存在既有的题型/答案位置集中提示，以及生产包体积提示；本轮未声称这些内容质量问题已解决。

## 输入文件留痕

- AAIG人工签核优先复核册_已复核.docx  
  SHA256 `70cc1cf2386e0bd3fec8d62bc9a12acfea8733ca2d2999b0c81096fe6bbfabf8`
- AAIG人工签核其余复核册_已复核.docx  
  SHA256 `50c444c65a20119e612e5ea6f44fa10e4b7effc31cb3030654e87c92ee5ab6cf`

## Domain 建议

建议一级分类对齐 ISACA 官网公开的三个核心领域：AI Enterprise Governance、Data and AI Architecture Principles、AI Enterprise Integration and Performance Monitoring。现有 D4 按题目内容归入对应领域，旧自定义内容和历史成绩保留兼容。官网此页未提供考试权重，不能把自定义抽题比例称为官方权重。[ISACA AAIG](https://www.isaca.org/credentialing/aaig)

分类调整尚待本轮同步或下一轮处理的选择，本轮没有静默修改。

