import { log } from 'node:console'
import type { AcceptedPlugin, ChildNode, Comment, Result, Root } from 'postcss'

/**
 * 遍历 rules
 * @param root
 */
function _walkRules(root: Root) {
  // 统计所有的 selector
  const selectors: string[] = []
  root.walkRules((rule) => {
    selectors.push(rule.selector)
  })
  log('selectors : ', selectors)

  // 打印指定规则的 selector
  root.walkRules(/^.container/, (rule) => {
    log('.container : ', rule.selector)
  })
}

/**
 * 遍历 decls
 * @param root
 */
function _walkDecls(root: Root) {
  // 统计所有的 decl
  const decls: string[] = []
  root.walkDecls((decl) => {
    decls.push(decl.prop)
  })
  log('decls : ', decls)

  // 打印指定规则的 decl
  root.walkDecls(/^background-color/, (decl) => {
    log('background-color : ', decl.prop)
  })
}

/**
 * 遍历 comments
 * @param root
 */
function _walkComments(root: Root) {
  root.walkComments((comment: Comment, _indexed: number) => {
    log('comment : ', comment.toString())
  })
}

/**
 * 遍历 @rules
 * @param root
 */
function _walkAtRules(root: Root) {
  // 无过滤条件遍历 @rules
  root.walkAtRules((atRule) => {
    log('AtRule : ', atRule.name)
  })

  // 带过滤条件遍历 @rules
  root.walkAtRules(/^@media/, (atRule) => {
    log('AtRule : ', atRule.name)
  })
}

/**
 * 遍历所有 Node
 * @param root
 */
function _walk(root: Root) {
  root.walk((node: ChildNode) => {
    log('node.type : ', node.type)
  })
}

/**
 * 打印 root 属性 | 函数
 * @param root
 */
function _printRoot(root: Root) {
  // 输出 root 的 type 类型
  log('root.type : ', root.type)

  // 输出 root 的原始文本
  log('root.toString : ', root.toString())

  // 输出 root 的 Result 实例
  log('root.toResult : ', root.toResult())

  // 输出 root 的 json 风格
  log('root.toJSON : ', root.toJSON())

  // source
  log('root.source : ', root.source)

  // root
  log('root.root : ', root.root)

  // replaceWith
  log('root.replaceWith : ', root.replaceWith)

  // replaceValues
  log('root.replaceValues : ', root.replaceValues)

  // removeChild
  log('root.removeChild : ', root.removeChild)

  // removeAll
  log('root.removeAll : ', root.removeAll)

  // remove
  log('root.remove : ', root.remove)

  // raws
  log('root.raws : ', root.raws)

  // raw
  log('root.raw : ', root.raw)

  // rangeBy
  log('root.rangeBy : ', root.rangeBy)

  // push
  log('root.replaceWith : ', root.replaceWith)

  // prev
  log('root.prev : ', root.prev)

  // prepend
  log('root.prepend : ', root.prepend)

  // positionInside
  log('root.positionInside : ', root.positionInside)

  // positionBy
  log('root.positionBy : ', root.positionBy)

  // parent
  log('❌ root.parent : ', root.parent)

  // nodes
  log('root.nodes : ', root.nodes)

  // next
  log('✅ root.next : ', root.next)

  // insertBefore
  log('✅ root.insertBefore : ', root.insertBefore)

  // insertAfter
  log('✅ root.insertAfter : ', root.insertAfter)

  // index
  log('✅ root.index : ', root.index)

  // some
  log('✅ root.some : ', root.some)

  // every
  log('✅ root.every : ', root.every)

  // error
  log('✅ root.error : ', root.error)

  // each
  log('✅ root.each : ', root.each)

  // cloneBefore
  log('✅ root.cloneBefore : ', root.cloneBefore)

  // cloneAfter
  log('✅ root.cloneAfter : ', root.cloneAfter)

  // clone
  log('✅ root.clone : ', root.clone)

  // cloneRaws
  // log('root.cloneRaws : ', root.cloneRaws)

  // before
  log('✅ root.before : ', root.before)

  // assign
  log('✅ root.assign : ', root.assign)

  // append
  log('✅ root.append : ', root.append)

  // after
  log('✅ root.after : ', root.after)
}

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-01',
    prepare(_result: Result) {
      return {
        // 在整个 css 文档加载中调用一次
        Once(root, _helper) {
          // 遍历 rules
          // _walkRules(root)

          // 遍历 decls
          // _walkDecls(root)

          // 遍历 comments
          // _walkComments(root)

          // 遍历 @rules
          // _walkAtRules(root)

          // 遍历所有 Node
          // _walk(root)

          // 打印 root 属性 | 函数
          _printRoot(root)
        },
      }
    },
  }
}
