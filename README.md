# 微信小程序开发专家｜小程达

辅助规划微信小程序架构、编写页面、接入登录和支付、优化性能及准备提审。仓库提供方法和示例片段，并不是可直接导入运行的完整小程序。

> Skill 是给 AI 助手使用的工作方法和参考资料；实际执行能力取决于宿主工具、权限和环境。中文名称用于说明展示，英文仓库地址保留以方便安装与更新。

## 新手从这里开始

### 1. 准备什么

准备能读写项目文件的 AI 助手和微信开发者工具。实际联调需要相应 AppID、后端服务与配置。第一次先做静态页面，暂不接登录、支付和真实数据。

### 2. 下载并加载技能

1. 在本页面点击绿色 **Code → Download ZIP**，解压到你能找到的位置。
2. 本项目入口是 [SKILL.md](SKILL.md)。保留整个技能文件夹，不能只复制 README 或单个 SKILL.md；入口引用的相对路径文件也需要一起保留。
3. 在支持本地文件的 AI 助手中打开解压目录，明确要求“读取 `SKILL.md` 并按该技能处理接下来的任务”。如果助手无法读取电脑文件，使用该产品支持的文件导入方式；只粘贴 README 不等于加载完整技能。
4. 想要长期自动调用时，按下方安装章节放入宿主的技能目录，然后重新打开会话；不同产品的目录和工具权限可能不同。
5. 先询问：“请说明刚加载的技能名称、能做什么、当前缺少哪些工具。”确认识别正确后再执行任务。

命令行下载（可选，需要已安装 Git；在你存放项目的目录执行）：

```bash
git clone https://github.com/fantasyo123/wechat-miniprogram-dev-skill.git
```

### 3. 复制这段话开始第一次使用

```text
请读取 SKILL.md，帮我做一个原生微信小程序的待办清单演示。第一版只支持新增、完成和删除待办，使用本地示例数据，不接登录、支付或后端。请生成完整项目文件，并一步步说明如何在微信开发者工具中导入、编译和预览。
```

### 4. 你应该得到什么

完整演示项目、导入说明和验收步骤。导入的是生成后的项目目录，包含 app.js、app.json 等文件；不是这个技能仓库。新增、完成、删除操作应可实际验证。

### 从演示到真实业务

1. 用开发者工具打开生成的项目并编译，确认页面可见、操作可用。
2. 再添加后端接口，明确请求字段、响应格式、错误码、登录状态和合法域名。
3. 最后接入支付、订阅消息等能力，按实际账户权限和平台当前要求配置。
4. 用真机测试正常流程、拒绝授权、网络失败和空数据，再准备提审。

### 当前模板的已知限制

- `references/request.js` 调用了未提供实现的 `refreshTokenAndRetry()`；直接复制后遇到 401 会失败，需要先补充有次数上限的刷新逻辑。
- 登录示例中的 `await wx.login()` 需要结合所用基础库和封装核对；不要假定所有回调 API 都可以直接 await。
- 后端地址 `api.example.com` 是示意值；登录响应数据层级、支付参数都要与自己的服务端协议一致。
- `references/payment.js` 只展示客户端流程，不包含服务端下单、签名和支付结果核验。
- 主技能部分旧引用写成 `request-template.md`、`request.md`、`payment-template.md`；实际文件是 `references/request.js`、`references/payment.js`。

### 常见问题

| 现象 | 处理方法 |
|---|---|
| 导入仓库后无法编译 | 这是技能资料，请让助手生成完整小程序项目后再导入 |
| 请求域名错误 | 核对实际 HTTPS 域名和后台配置，不能把开发调试设置当上线方案 |
| 登录或 401 报错 | 先处理上述示例限制，贴出脱敏错误信息与接口结构 |
| 没有后端或支付资格 | 先用本地数据跑通页面，暂不启用对应能力 |

性能数字是优化目标，不是审核通过率或运行效果保证；平台额度与权限以当时官方说明为准。

### 更新与反馈

ZIP 安装用户先备份自己的修改和产出，再下载新版本替换技能文件。Git 安装用户在没有本地修改时可在仓库目录执行 `git pull --ff-only`；有修改时先保存，避免覆盖。更新后重新打开会话。遇到问题请在 [Issues](https://github.com/fantasyo123/wechat-miniprogram-dev-skill/issues) 提供宿主名称、操作步骤、预期结果和脱敏后的错误信息。

---

## 详细能力与原有参考

> 一个自包含、可移植的 AI Agent Skill，把「微信小程序开发专家」的完整方法论与代码模板打包成单一技能包，可被 Claude Code、WorkBuddy 等任意支持 Skill 规范的 AI Agent 直接加载使用。

<div align="center">

**架构配置 → 核心开发 → 性能优化 → 测试提审 → 上架运维**

微信生态高性能小程序开发全流程

</div>

## ✨ 功能特性

| 能力 | 说明 |
|------|------|
| 🏗️ 项目架构规划 | app.json 路由/tabBar/分包配置、主包分包拆分策略（主包 ≤ 2MB）、全局状态选型（globalData / mobx-miniprogram） |
| 🧩 核心能力集成 | 微信登录闭环、统一请求封装（token 注入 + 401 刷新重试）、微信支付（wx.requestPayment）、订阅消息授权、分享与朋友圈卡片 |
| ⚡ 性能优化方法论 | setData 合并与瘦身、纯数据字段、懒加载、图片 CDN/WebP、分包 preloadRule、启动耗时控制 |
| 🧪 提审自查清单 | 常见驳回原因（类目不符 / 强制授权 / 诱导分享 / 隐私未声明）逐项规避策略 |
| 🛡️ 平台硬性规则 | 域名白名单、HTTPS 强制、包体积红线、隐私合规（PIPL）、UGC 内容安全检测 |
| 📦 开发参考模板 | request.js / payment.js / product-page.js 三份需适配后使用的代码模板 + 目录结构规范 |
| 📐 跨端方案衔接 | Taro / uni-app 微信端适配、公众号 / 视频号 / 企业微信联动、Skyline 渲染 |

## 📁 目录结构

```
wechat-miniprogram-dev-skill/
├── SKILL.md                     # 主入口：平台硬规则 + 标准工作流 + 提审自查表 + 关联技能
└── references/                  # 可直接复用的代码模板与规范
    ├── request.js               # 统一请求封装（token 注入 + 401 刷新重试）+ 微信登录闭环
    ├── payment.js               # 微信支付（下单 + 唤起）+ 订阅消息授权
    ├── product-page.js          # 性能优化型商品详情页模板（懒加载 / setData 精简 / 分享）
    └── project-structure.md     # 推荐项目目录结构 + 分包策略 + 全局状态选型
```

## 🚀 安装使用

### 方式一：WorkBuddy（推荐）

```bash
# 放到用户级 skills 目录（全局可用）
git clone https://github.com/fantasyo123/wechat-miniprogram-dev-skill.git \
  ~/.workbuddy/skills/wechat-miniprogram-dev
```

之后在 WorkBuddy 里直接用自然语言触发，例如：

- 「帮我从零搭一个微信小程序，电商类的」
- 「给这个小程序加上微信支付」
- 「小程序首屏加载太慢，帮我优化到 1.5 秒以内」
- 「帮我写一个带分享和朋友圈配置的商品详情页」
- 「这个需求要提审了，帮我按审核规范自查一遍」

### 方式二：Claude Code

```bash
# 克隆仓库到 skills 目录
git clone https://github.com/fantasyo123/wechat-miniprogram-dev-skill.git \
  ~/.claude/skills/wechat-miniprogram-dev
```

之后在 Claude Code 中直接描述你的小程序开发需求即可。

### 方式三：直接下载 zip

1. 在 GitHub 仓库页面点击 **Code → Download ZIP**
2. 解压到目标 Agent 的 skills 目录（如 `~/.workbuddy/skills/`、`~/.claude/skills/`）

## 📖 使用说明

### 触发场景

当你的任务涉及以下任意一项时，本 Skill 会自动（或手动指定）生效：

| 场景 | 示例 |
|------|------|
| 小程序从零开发 | 搭骨架、定架构、规划分包 |
| 微信生态能力 | 登录、支付、订阅消息、分享、隐私授权 |
| 页面与组件开发 | WXML/WXSS 页面、自定义组件、SKU 选择 |
| 性能调优 | 首屏速度、setData 优化、包体积、长列表 |
| 提审上架 | 合规自查、驳回规避、提交材料 |

### 使用步骤

1. **加载技能**：说出任务，Agent 会自动加载本 Skill（或手动在技能面板选择）。
2. **读取模板**：需要代码时，Agent 会读取 `references/` 下对应模板（如开发支付就读取 `payment.js`）。
3. **套用规范**：所有产出遵循 SKILL.md 中的平台硬性规则（HTTPS、域名白名单、包体积、授权合规）。
4. **验收标准**：以实际设备测量与功能测试验收；原文性能数字仅为参考目标，不保证过审。

### 模板使用说明

| 文件 | 使用方法 |
|------|----------|
| `references/request.js` | 复制到 `utils/request.js`，替换 `BASE_URL` 为你的正式域名（需在微信后台登记） |
| `references/payment.js` | 复制到 `services/payment.js`，接入后端下单接口 |
| `references/product-page.js` | 复制到 `pages/product/product.js`，替换字段与请求路径 |
| `references/project-structure.md` | 新建项目时对照搭好目录骨架与分包 |

## 🤝 关联技能

| Skill | 用途 |
|-------|------|
| wechat-miniprogram | 微信小程序框架 / 组件 / API / 云开发官方参考 |
| tdesign-miniprogram | TDesign 60+ 组件库与主题定制 |
| fullstack-dev | 小程序后端（REST API/云函数）搭建 |
| skyline | Skyline 渲染引擎（组件 / 动画 / 路由） |
| impeccable | 高质量有设计感的前端界面 |

## 📄 许可

MIT License。本仓库为培训与工具性目的创建，不承担使用后果；请遵守微信小程序平台运营规范及相关法律法规。