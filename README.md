# AAIG™ Exam Prep Master (ISACA AI 治理认证备考平台)

融合 **CISM-exam-prep 的工程骨架 (Vite + React + TypeScript + Tailwind CSS)** 与 **AAISM 的核心灵魂 (StudyBase 四模式 AI 助教 + Anti-bias 出题质检门禁体系)**，专为 **ISACA Advanced in AI Governance™ (AAIG™)** 认证打造。

---

## 🎯 核心功能体系

1. **📊 考情仪表盘 (Dashboard)**
   - 考纲四大知识域（D1 30%、D2 20%、D3 25%、D4 25%）掌握度雷达与进度条。
   - 综合正确率、总刷题数与闪卡攻克统计。
   - 核心三大体系（ISO/IEC 42001 AIMS、NIST AI RMF 1.0、EU AI Act）速查导航。

2. **📝 全真刷题演练 (Quiz Engine)**
   - **随堂练习模式**：选定选项立即显示正确答案、ISACA 官方治理逻辑解析与干扰项陷阱拆解。
   - **知识域专项筛选**：支持快速过滤 D1 至 D4。
   - **一键追问 AI 助教**：对当前题目随时展开多模式辅导。

3. **💡 记忆闪卡 (Flashcards - 3D Flip)**
   - 专攻难背的核心法规与技术治理标准（如三道防线模型、EU AI Act 风险金字塔、数据漂移 vs 概念漂移）。
   - 3D 翻转卡片，支持「生疏 / 模糊 / 已掌握」掌握度自评与循环复习。

4. **📕 错题本与收藏夹 (Review Notebook)**
   - 自动沉淀做错的题目，支持“仅练错题”与“错题重测消除”机制。
   - 重点题目一键加书签收藏。

5. **🤖 智能备考导师 (StudyBase AI Tutor)**
   - **Standard 模式**：标准精讲与考点深度剖析。
   - **Socratic 模式**：苏格拉底启发式反问，引导自主推导最优解。
   - **Teach-Back 模式**：费曼讲题审查，考生用自己的话讲一遍，导师逐条批改。
   - **Drill 模式**：针对薄弱点即时生成全新同考点情境变式题。

6. **⚡️ 防偏差 AI 出题引擎 (Anti-bias Question Generator)**
   - **长度平价门禁（Length-parity Gate）**：正确答案与干扰项字数比强制控制在 $[0.8, 1.3]$，杜绝 LLM “正确答案最长”的泄题漏洞。
   - **位置动态打散（Position Steering）**：确保 A/B/C/D 选项分布均匀。
   - **三大正交干扰轴**：Priority（优先级）、Timing（次序/时机）、Scope（权责层级）精准诱捕。
   - **生成新题一键入库**：生成预览通过后，直接沉淀到本地题库与练习流中。

---

## 🚀 快速启动

### 本地启动 Web 平台
```bash
# 启动本地开发服务器
npm run dev
# 或 bun run dev
```
打开浏览器访问：`http://localhost:5173` 即可开始复习！

### 构建静态发布版本
```bash
npm run build
```
打包产物位于 `dist/`，可一键部署至 Vercel、Cloudflare Pages、GitHub Pages，或直接双击离线使用。

### 批量离线生成题目脚本
```bash
# 配置 .env 中的 GEMINI_API_KEY 后运行
npm run gen:questions
```
自动运行出题脚本并执行双盲判卷质检门禁，输出合格题目至 `reports/gen-questions.json`。
