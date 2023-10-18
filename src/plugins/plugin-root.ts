import { log } from 'node:console'
import type { AcceptedPlugin, Result } from 'postcss'

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-01',
    prepare(_result: Result) {
      return {
        // 在整个 css 文档加载中调用一次
        Once(root, _helper) {
          // 遍历 rules, 统计所有的 selector
          const selectors: string[] = []
          root.walkRules((rule) => {
            selectors.push(rule.selector)
          })
          log('selectors : ', selectors)

          // 遍历 rules, 打印已 .xxx 格式的 selector
          root.walkRules(/\./, (rule) => {
            log('.xxx : ', rule.selector)
          })
        },
      }
    },
  }
}
