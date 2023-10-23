import { log } from 'node:console'
import type { AcceptedPlugin, Result, Rule } from 'postcss'

function _printRule(rule: Rule) {
  log('rule.type : ', rule.type)
}

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-02',
    prepare(_result: Result) {
      return {
        Rule(rule, _helper) {
          _printRule(rule)
        },
      }
    },
  }
}
