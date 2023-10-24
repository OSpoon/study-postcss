import { log, table } from 'node:console'
import type { AcceptedPlugin, AtRule, Result } from 'postcss'
import { Declaration, Rule } from 'postcss'

/**
 * 遍历AtRule,根据类型统计
 * @param atRule
 */
function _walk(atRule: AtRule) {
  const selectors: string[] = []
  const properties: string[] = []
  const comments: string[] = []
  const names: string[] = []
  atRule.walk((node) => {
    switch (node.type) {
      case 'comment':
        comments.push(node.text)
        break
      case 'atrule':
        properties.push((node as AtRule).name)
        break
      case 'rule':
        selectors.push(node.selector)
        break
      case 'decl':
        names.push((node as Declaration).prop)
        break
      default:
        break
    }
  })

  table({
    selectors,
    properties,
    comments,
    names,
  })
}

/**
 * 遍历AtRule中的规则
 * @param atRule
 */
function _walkRules(atRule: AtRule) {
  const selectors: string[] = []
  atRule.walkRules((rule) => {
    selectors.push(rule.selector)
  })
  log('atRule.walkRules : ', selectors)
}

/**
 * 遍历AtRule中的样式声明
 * @param atRule
 */
function _walkDecls(atRule: AtRule) {
  const properties: string[] = []
  atRule.walkDecls((decl) => {
    properties.push(decl.prop)
  })
  log('atRule.walkDecls : ', properties)
}

/**
 * 遍历AtRule中的注释
 * @param atRule
 */
function _walkComments(atRule: AtRule) {
  const comments: string[] = []
  atRule.walkComments((comment) => {
    comments.push(comment.text)
  })
  log('atRule.walkComments : ', comments)
}

/**
 * 遍历AtRule中的AtRule
 * @param atRule
 */
function _walkAtRules(atRule: AtRule) {
  const names: string[] = []
  atRule.walkAtRules((atRule) => {
    names.push(atRule.name)
  })
  log('atRule.walkAtRules : ', names)
}

/**
 * AtRule 中是否存在 type 为 rule 的节点
 * @param atRule
 */
function _some(atRule: AtRule) {
  const result = atRule.some(node => node.type === 'rule')
  log('result : ', `AtRule 中${result ? '' : '不'}存在 type 为 rule 的节点`)
}

/**
 * AtRule 中的节点的类型是否全部是 rule
 * @param atRule
 */
function _every(atRule: AtRule) {
  const result = atRule.every(node => node.type === 'rule')
  log('result : ', `AtRule 中的节点的类型${result ? '全部' : '不全'}是 rule`)
}

/**
 * 使用新的节点替换当前的 AtRule
 * @param atRule
 */
function _replaceWith(atRule: AtRule) {
  const rule = new Rule({
    selector: 'main',
  })
  const decl = new Declaration({
    prop: 'color',
    value: 'red',
  })
  rule.append(decl)
  atRule.replaceWith(rule)
}

/**
 * 替换 AtRule 中命名规则的值
 * @param atRule
 */
function _replaceValues(atRule: AtRule) {
  atRule.replaceValues(/lightgreen/, (_) => {
    return 'blue'
  })
}

function _printAtRule(atRule: AtRule) {
  log('atRule basics attribute : ')
  table({
    type: atRule.type,
    name: atRule.name,
    params: atRule.params,
  })

  log('atRule raws attribute : ')
  table({
    before: atRule.raws.before,
    between: atRule.raws.between,
    afterName: atRule.raws.afterName,
    semicolon: atRule.raws.semicolon,
    after: atRule.raws.after,
    params: atRule.raws.params,
  })

  log('atRule get node attribute : ')
  table({
    index: atRule.nodes[0].toString(),
    first: atRule.first?.toString(),
    last: atRule.last?.toString(),
    parent: atRule.parent?.type,
  })

  log('atRule.source attribute : ')
  table({
    start: atRule.source?.start,
    end: atRule.source?.end,
    input: atRule.source?.input.id,
  })
}

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-atrule',
    prepare(_result: Result) {
      return {
        AtRule(atRule, _helper) {
          // 打印@规则属性
          // _printAtRule(atRule)

          // 遍历@规则中的注释
          // _walkComments(atRule)

          // 遍历@规则中的@规则
          // _walkAtRules(atRule)

          // 遍历@规则中的规则
          // _walkRules(atRule)

          // 遍历@规则中的样式声明
          // _walkDecls(atRule)

          // 遍历@规则,根据类型统计
          // _walk(atRule)

          // AtRule 中是否存在 `selector` 为 `body` 的规则
          // _some(atRule)

          // AtRule 中的节点的类型是否全部是 rule
          // _every(atRule)

          // 使用新的节点替换当前的 AtRule
          // _replaceWith(atRule)

          // 替换 AtRule 中命名规则的值
          // _replaceValues(atRule)
        },
      }
    },
  }
}
