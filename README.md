# 微信小程序开发专家 Skill（小程达）

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
| 📦 开箱即用模板 | request.js / payment.js / product-page.js 三份可直接落地的代码模板 + 目录结构规范 |
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
4. **验收标准**：以「关键成功指标」自检（冷启动 < 1.5s、主包 < 1.5MB、一次过审 ≥ 90%）。

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