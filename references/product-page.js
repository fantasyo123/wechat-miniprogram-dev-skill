// pages/product/product.js —— 性能优化型商品详情页模板
// 要点：setData 只传视图所需、图片懒加载、分享/朋友圈配置
const { request } = require('../../utils/request');

Page({
  data: {
    product: null,
    loading: true,
    skuSelected: {},
  },

  onLoad(options) {
    const { id } = options;
    this.productId = id; // 避免在回调里重复读 options
    this.loadProduct(id);

    // 从列表页进入时，预取相关推荐（数据预加载）
    if (options.from === 'list') {
      this.preloadRelatedProducts(id);
    }
  },

  async loadProduct(id) {
    try {
      const product = await request({ url: `/products/${id}` });

      // 精简 setData payload：只下发视图需要的字段，图片先给前 5 张
      this.setData({
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          images: product.images.slice(0, 5),
          skus: product.skus,
          description: product.description,
        },
        loading: false,
      });

      // 剩余图片延迟加载，避免首屏阻塞
      if (product.images.length > 5) {
        setTimeout(() => {
          this.setData({ 'product.images': product.images });
        }, 500);
      }
    } catch (err) {
      wx.showToast({ title: '加载失败，请重试', icon: 'none' });
      this.setData({ loading: false });
    }
  },

  // 分享给好友/群
  onShareAppMessage() {
    const { product } = this.data;
    return {
      title: product?.title || '看看这个商品',
      path: `/pages/product/product?id=${this.productId}`,
      imageUrl: product?.images?.[0] || '',
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { product } = this.data;
    return {
      title: product?.title || '',
      query: `id=${this.productId}`,
      imageUrl: product?.images?.[0] || '',
    };
  },
});