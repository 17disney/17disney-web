/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 17disney <616@17disney.com>  Website：http://www.17disney.com
+-----------------------------------------------------------------------------------------------------------------------
| Init Locale
| 多语言初始化
*/

import VueI18n from 'vue-i18n'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocaleDs from 'pkg/17disney-language/en'
import zhLocaleDs from 'pkg/17disney-language/zh-hans'

export default function init(Vue) {
  Vue.use(VueI18n)
  Vue.locale('en', Object.assign(enLocale, enLocaleDs))
  Vue.locale('zh-hans', Object.assign(zhLocale, zhLocaleDs))
}
