// services/payment.js —— 微信支付 + 订阅消息授权封装
const { request } = require('../utils/request');

// 第一步：后端下单，换取预支付参数（timeStamp/nonceStr/package/paySign）
// 第二步：wx.requestPayment 唤起支付
const createOrder = async (orderData) => {
  const prepayResult = await request({
    url: '/orders/create',
    method: 'POST',
    data: {
      items: orderData.items,
      address_id: orderData.addressId,
      coupon_id: orderData.couponId,
    },
  });

  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: prepayResult.timeStamp,
      nonceStr: prepayResult.nonceStr,
      package: prepayResult.package,   // "prepay_id=xxx" 格式
      signType: prepayResult.signType, // RSA 或 MD5（新版默认 RSA）
      paySign: prepayResult.paySign,
      success: (res) => {
        resolve({ success: true, orderId: prepayResult.orderId });
      },
      fail: (err) => {
        if (err.errMsg.includes('cancel')) {
          resolve({ success: false, reason: 'cancelled' }); // 用户主动取消，按正常流程处理
        } else {
          reject({ success: false, reason: 'payment_failed', detail: err });
        }
      },
    });
  });
};

// 订阅消息授权 —— 替代已废弃的模板消息
// 最佳时机：用户下单成功后立即请求（此时订阅意愿最高）
const requestSubscription = async (templateIds) => {
  return new Promise((resolve) => {
    wx.requestSubscribeMessage({
      tmplIds: templateIds,
      success: (res) => {
        const accepted = templateIds.filter((id) => res[id] === 'accept');
        resolve({ accepted, result: res });
      },
      fail: () => {
        resolve({ accepted: [], result: {} });
      },
    });
  });
};

module.exports = { createOrder, requestSubscription };