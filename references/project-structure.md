# 微信小程序推荐项目结构

基础库版本选择：建议最低支持 2.13.0+（含 Skyline 兼容考虑），登录、分享等能力注意对应基础库要求。

```
├── app.js                 # App 生命周期与全局数据（globalData）
├── app.json                # 全局配置：pages、window、tabBar、permission、subPackages、preloadRule
├── app.wxss                # 全局样式
├── project.config.json     # 项目/IDE 设置（appid、编译配置）
├── sitemap.json            # 微信搜索索引配置
├── pages/
│   ├── index/              # 首页
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── product/            # 商品/详情页
│   └── order/              # 订单流程（下单 -> 支付 -> 结果）
├── components/             # 可复用自定义组件
│   ├── product-card/
│   └── price-display/
├── utils/
│   ├── request.js          # 统一网络请求封装（token 注入 + 401 重试）
│   ├── auth.js             # 登录与 token 管理
│   └── analytics.js        # 埋点统计
├── services/               # 业务逻辑与 API 调用（按业务域拆分）
└── subpackages/            # 分包：按用户路径优先级拆分
    ├── user-center/        # 用户中心（低频）
    └── marketing-pages/    # 营销页（低频、大图多）
```

## 分包策略要点

- 主包保留核心路径（首页 / 支付 / 订单），目标 ≤ 2MB。
- 低频与营销页面下沉到 `subpackages/`；营销页可设为「独立分包」，配合 `preloadRule` 预加载。
- `app.json` 的 `preloadRule` 示例：

```json
{
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["subpackages/user-center"]
    }
  }
}
```

## 全局状态选型

| 项目规模 | 方案 |
|---|---|
| 小型 | `app.globalData` 足够 |
| 中大型 | mobx-miniprogram（推荐）或轻量自建 store |
| 跨端项目 | Taro / uni-app 侧优先使用其内置状态方案（redux / pinia） |