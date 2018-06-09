/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: xank <xank@qq.com>  Blog：https://www.xank.cn
+-----------------------------------------------------------------------------------------------------------------------
| Init Locale
|
*/

import VueI18n from 'vue-i18n'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocaleDs from 'package/17disney-language/en'
import zhLocaleDs from 'package/17disney-language/zh-hans'

export default function init(Vue) {
  Vue.use(VueI18n)
  Vue.locale('en', Object.assign(enLocale, enLocaleDs))
  Vue.locale('zh-hans', Object.assign(zhLocale, zhLocaleDs))
}
