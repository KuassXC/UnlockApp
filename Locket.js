const mapping = {
  Locket: ["Gold"],
};

const ua =
  $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
let obj = JSON.parse($response.body);

obj.Attention = "Bản cấu hình cá nhân của KunSoCay. Vui lòng không chia sẻ!";

var kunsocay_sub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store",
};

var kunsocay_entitlement = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.kunsocay.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z",
};

obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};

const match = Object.keys(mapping).find((e) => ua.includes(e));

if (match) {
  let [entitlementKey, subKey] = mapping[match];

  if (subKey) {
    kunsocay_entitlement.product_identifier = subKey;
    obj.subscriber.subscriptions[subKey] = kunsocay_sub;
  } else {
    obj.subscriber.subscriptions["com.kunsocay.premium.yearly"] = kunsocay_sub;
  }

  obj.subscriber.entitlements[entitlementKey] = kunsocay_entitlement;
} else {
  obj.subscriber.subscriptions["com.kunsocay.premium.yearly"] = kunsocay_sub;
  obj.subscriber.entitlements.pro = kunsocay_entitlement;
}

$done({ body: JSON.stringify(obj) });
