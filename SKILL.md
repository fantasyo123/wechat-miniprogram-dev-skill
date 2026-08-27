---
name: wechat-miniprogram-dev
description: 微信小程序全栈开发专家技能。当用户需要开发、修改或评审微信小程序（原生 WXML/WXSS/WXS、组件开发、微信支付、登录授权、订阅消息、分包优化、性能调优、提审上架）时使用；也适用于 Taro / uni-app 跨端项目中的微信端适配、公众号与小程序联动、企业微信集成等微信生态开发场景。触发词：小程序、微信小程序、做个小程序、WXML、WXSS、wx.request、微信支付、小程序提审、小程序分包。
agent_created: true
---

# 微信小程序开发（wechat-miniprogram-dev）

## Overview

本技能将「小程达」（微信小程序开发专家）的能力沉淀为可复用的开发方法论：从项目架构、核心开发、性能优化到提审上架的全流程规范，并内置请求封装、微信支付、订阅消息、性能优化页面等可直接落地的代码模板（见 `references/`）。

## 触发场景（WHEN to use）

当用户提出以下任一需求时，加载并遵循本技能：

- 从零搭建微信小程序项目（架构设计、目录规划、app.json 配置、分包规划）
- 实现微信核心能力：登录（wx.login）、微信支付（wx.requestPayment）、订阅消息（wx.requestSubscribeMessage）、分享（onShareAppMessage / onShareTimeline）、用户信息与隐私授权
- 编写 / 评审业务页面与自定义组件（WXML/WXSS/JS/JSON 四件套）
- 性能优化（setData 优化、分包、启动速度、图片与网络优化）
- 准备提审上架（合规检查、常见驳回原因规避）
- Taro / uni-app 跨端项目中的微信端适配
- 公众号 / 视频号 / 企业微信与小程序联动

## 平台硬性规则（必须遵守）

### 微信平台要求
- **域名白名单**：所有 API / WebSocket / uploadFile / downloadFile 域名必须先在 mp.weixin.qq.com 后台「开发管理-服务器域名」登记，开发调试可用「不校验合法域名」临时绕过（仅限开发者工具）。
- **HTTPS 强制**：所有网络请求必须使用 HTTPS 且证书有效；WSS 用于 WebSocket。
- **包体积红线**：主包 ≤ 2MB，全小程序 ≤ 20MB（含分包）。超限优先拆分包，再做代码瘦身（工具链压缩、去除冗余库、图片放 CDN）。
- **隐私合规**：访问用户信息（头像昵称、位置、相册、麦克风等）前必须弹窗授权并说明用途；需在「用户隐私保护指引」中声明；不得静默采集。
- **内容安全**：用户生成内容（UGC）必须接入 `security.msgSecCheck` / `security.imgSecCheck` 进行内容安全检测。

### 开发硬性约束
- **无 DOM**：小程序是双线程架构（逻辑层 + 渲染层），禁止任何 DOM 操作；视图更新只能通过 `setData`。
- **API Promise 化**：将 wx.* 回调式 API 封装为 Promise，避免回调地狱（`wx.login` / `wx.request` 均可）。
- **生命周期意识**：正确使用 App / Page / Component 三套生命周期（onLaunch、onLoad、onShow、attached、ready 等），不要在未就绪时调用组件方法。
- **setData 纪律**：
  - setData 会跨越 JS 与原生桥，**高频调用是性能杀手**；把多次小修改合并为一次 setData。
  - 只传视图需要的字段，减小 payload；大列表用分页加载而非全量渲染。
  - 纯展示不参与渲染的数据用 `pureDataPattern` 声明为纯数据字段，避免进入视图层。

## 标准工作流程

### Step 1：架构与配置
1. 定义页面路由、tabBar、window 配置（含权限声明）写入 `app.json`。
2. 按用户路径优先级拆分主包与分包；低频页面（营销页、用户中心）移入分包。
3. 向用户索要并登记全部业务域名单（request / upload / download / socket 四类）。
4. 配置环境切换：开发 / 测试 / 生产环境 BASE_URL 通过 `extend` + 编译宏或环境判断切换。
5. 规划全局状态：小项目用 `app.globalData`；中大型项目用 mobx-miniprogram 或轻量 store。

### Step 2：核心开发

1. **组件化**：把重复 UI（商品卡、价格展示、空态、加载态）抽成自定义 component，定义好 properties / events / slots，保持组件间低耦合。
2. **统一请求层**：优先使用 `references/request-template.md` 中的封装，统一处理 token 注入、401 自动刷新重试、错误码提示。
3. **登录流程**：wx.login 取 code → 后端换 session → 本地存 token（见 `references/request.md` 登录示例）；优先采用静默登录 + 按需授权（账号体系逐步演进，新版本用 wx.getUserProfile 或快捷授权）。
4. **业务功能集成**：微信支付（见 `references/payment-template.md`）、订阅消息（下单后、用户有明确预期时请求授权，转化率最高）、分享与群聊卡片。

### Step 3：性能优化

1. **启动优化**：主包瘦身（分包/异步子包）、首屏 data 最小化、不阻塞 onLoad、合理使用 preloadRule 预加载下一个页面分包。
2. **渲染性能**：合并 setData、降低频率、使用纯数据字段、长列表用虚拟列表或分页、`WXS` 处理需高频计算的展示逻辑（如价格格式化）。
3. **图片优化**：CDN + WebP、懒加载（lazy-load）、尺寸分级（列表用小图、详情用大图）、占位图先行。
4. **网络优化**：缓存 GET 请求（wx.setStorage 或请求层内置）、数据预取、失败重试与离线兜底（骨架屏）。

### Step 4：测试与提审

1. **双端测试**：iOS + Android 微信真机各机型、弱网（2G/3G 网络限速）、冷启动/热启动。
2. **真机调试**：微信开发者工具「真机调试」/「预览」扫码验证，关注内存与帧率（工具 Audit 面板画出性能分 ≥ 90）。
3. **合规检查**：隐私协议、授权弹窗时机（不可拒绝弹窗）、诱导分享/关注（违规词）、支付类目与资质是否匹配。
4. **提审上架**：常见驳回原因——类目不符（需前置）、无真实服务内容、诱导分享、隐私收集未声明、虚拟支付违规（iOS 未用虚拟支付）。提交材料齐全后走后台提审。

## 提审常见驳回自查表

| 驳回类型 | 规避方式 |
|---|---|
| 类目与资质不符 | 提审前确认服务类目与《营业执照》经营范围一致，特殊类目（支付、社交、直播）需前置资质 |
| 仅借用小程序做广告页 | 首页必须提供真实可用的核心服务 |
| 强制授权后才能用 | 支持游客浏览，授权改为按需触发 |
| 诱导分享 / 诱导关注 | 删除"转发才能解锁"类机制，分享按钮不做条件强制 |
| 个人主体做企业性质服务 | 确认主体类型与服务类目匹配 |
| 隐私未声明 / 超范围采集 | 更新《用户隐私保护指引》，最小化收集，逐项声明用途 |

## 代码模板（直接复用）

本技能在 `references/` 提供可直接落地的模板，按需读取使用：

| 模板文件 | 用途 |
|---|---|
| `references/request.js` | 统一请求封装（token 注入 + 401 刷新重试）+ 微信登录闭环 |
| `references/payment.js` | 微信支付下单与唤起 + 订阅消息授权封装 |
| `references/product-page.js` | 性能优化型商品详情页（懒加载图片、setData 精简、分享/朋友圈配置） |
| `references/project-structure.md` | 推荐项目目录结构与模块划分 |

模板使用方式：复制 `references/` 内代码到对应业务路径，替换 `BASE_URL` 与字段名后即可运行。模板内的异步逻辑恒为 Promise 风格，与原生 wx.login / wx.getUserProfile 等 API 对接时留意版本差异。

## 关键成功指标（开发自我验收）

- 中端 Android 冷启动 < 1.5s
- 主包 < 1.5MB（含分包管理意识）
- 微信审核一次通过率 ≥ 90%
- 崩溃率 < 0.1%（各基础库版本）
- 开发者工具 Audit 性能分 ≥ 90
- 分享到打开转化率 > 15%（有分享场景时）

## 关联技能（Companion skills）

- **wechat-miniprogram**：小程序框架 / 组件 / API / 云开发标准参考，遇到具体 API 用法不确定时配合查阅。
- **tdesign-miniprogram**：使用 TDesign 60+ 组件库与主题定制时加载。
- **fullstack-dev**：需要搭建小程序后端（REST API / 云函数）时协同使用。
- **skyline**：开发 Skyline 渲染页面（组件、动画、路由、scroll-view 等）时加载。
- **impeccable**：页面 UI 需要高质量设计感、避免通用感时使用。