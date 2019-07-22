本文将讲述说明一下js文件内各字段的用途。

js文件用来对vue-tt进行全局配置，指定后台错误返回码、微信公众号appId、是否启用微信的JSSDK能力 等。

以下是一个包含了部分配置选项的 tConfig.js：

```js
const config = {
    //公众号appId
    appId: "wx54e7a8c23bb2f22f",
    //openId如果有值则不会进行重定向
    openId: "",
    //是否使用微信能力
    isUseWxSdk: true,
    //是否调用打印log功能
    isDebugMode: false,
    //是否静默授权（静默授权：需关注公众号获取用户信息，弹窗授权：无需关注既可以获取用户信息）
    isSilence:false,
    //重定向后台域名
    riderectUrl:"https://h5-test.by-health.com",
    //接口域名  测试下为本地域名，webpack配置了转发域名
    baseURL: "http://localhost:8080",
    //重定向地址
    publicPath: "http://localhost:8080/index.html",
    //获取微信签名接口
    wxSignatureApi: "/eCommerceDigitizationApi/getJsSdkSignature",
    //微信重定向接口
    wxAuthorizedApi: "/eCommerceDigitizationApi/webDevAuthorized",
    //是否开启微信调式模式
    wxDebug: false,
    //需要使用的微信能力列表
    wxJsApiList: [
        "closeWindow",
        "hideOptionMenu",
        "scanQRCode"
    ],
    //默认后台返回错误码
    errorCodeValue: "00",
    //是否检查错误码不是00的时候不自动弹错误信息框
    isCheckErrorCode: true,
    //是否自己手动处理接口网关等异常错误，false则会自动弹框weUi样式报错,true可手动修改样式
    isErrorHandle:false
};

export default config
```

以下是tConfig.js 的配置项说明

### appId

###### string

指定了微信公众号appId，在获取openId 和 调用JSSDK能力时需要用到

### openId

###### string

默认为空。我们一般会在开发阶段指定一个默认的openId来调试

### baseURL

###### string

必填。服务器接口的域名地址

### isUseWxSdk

###### boolean

默认为 false。

是否调用JSSDK能力

### publicPath

###### string

静态文件发布后的路径，重定向地址

### wxSignatureApi

###### string

调用微信JSSDK的签名接口地址

### wxAuthorizedApi

###### string

获取openId的微信重定向接口

需要以 / 开头

### wxDebug

###### boolean

是否启用微信调试功能

### wxJsApiList

###### array

调用微信接口的列表

### errorCodeValue

###### string

默认为 00

指定后台错误返回码

### isCheckErrorCode

###### boolean

是否检测errorCode并进行拦截

### isErrorHandle

###### boolean

是否自己手动处理接口错误，false则会自动弹框weUi样式报错,true可手动修改报错样式