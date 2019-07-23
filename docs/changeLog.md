## v1.1.4(2019-07-22)
- 优化

## v1.1.2(2019-07-22)
### 新增tConfig配置字段
- isSilence 是否静默授权（静默授权：需关注公众号获取用户信息，弹窗授权：无需关注既可以获取用户信息）

## v1.1.1(2019-04-28)
### 新增tConfig配置字段
- isErrorHandle【boolean】是否自己手动处理接口错误，false则会自动弹框weUi样式报错,true可手动修改报错样式
### 修改方法
- getOpenIdFromWx 不直接返回openId
- getOpenId 直接返回openId，首次调用需要先调用getOpenIdFromWx()

## v1.0.20 (2018-11-06)

### 新增方法

- t.isWeChatPlatform() 判断当前环境是否为微信端

## v1.0.19 (2018-10-24)

### 优化

- t.getOpenId() 当tconfig设置openId为空值的时候直接返回真实用户openId

## v1.0.18 (2018-09-05)

### 优化

- 减少部分安装依赖

## v1.0.17 (2018-06-06)

### 优化

- t.showAlert() 返回一个promise对象


## v1.0.16 (2018-05-15)

### 优化

- 增加 t.getPublicPath()
- t.getOpenIdFromWx()增加一个参数 params



## v1.0.12 (2018-05-11)

### 优化

- t.ajax()增加post方式，传入的数据统一都是params
- t.ajax()增加errorCode拦截开关。在tConfig里配置 isCheckErrorCode即可


## v1.0.8 (2018-05-07)

### 优化

- 可以在tConfig里禁用微信分享了，记得在 wxJsApiList 里面添加上正确的接口名：hideOptionMenu
- 默认加上 closeWindow 接口，开发者不需要在 wxJsApiList 显式添加
- 扫码等接口可直接在业务逻辑里编写。必须包含在wx.ready()里面。

### 重构

- config文件由原来的json格式转为js。这样更加灵活。


## v1.0.7 (2018-05-04)

### 重构

- 用we-vue的UI替换了旧的loader和message模块

### 新增

- showAlert、showConfirm方法
