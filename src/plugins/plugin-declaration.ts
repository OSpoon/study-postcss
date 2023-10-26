import { log, table } from 'node:console'
import type { AcceptedPlugin, Declaration, Result, Rule } from 'postcss'

function _printDeclAttribute(decl: Declaration) {
  log('decl basic attribute: ')
  table({
    parent: (decl.parent as Rule).selector,
    type: decl.type,
    prop: decl.prop,
    value: decl.value,
    important: decl.important,
    variable: decl.variable,
  })

  log('decl source attribute: ')
  table({
    'input.from': decl.source?.input.from,
    'start': decl.source?.start,
    'end': decl.source?.end,
  })

  log('decl raws attribute: ')
  table(decl.raws)
}

/**
 * 插入新的节点
 * @param decl
 */
function _insert(decl: Declaration) {
  if (decl.prop === 'width') {
    // 在 width 声明前增加 display 声明
    decl.before('\n    display: flex')
    // 在 width 声明后增加 color 声明
    decl.after('\n    color: black')
  }
}

/**
 * 分配节点
 * @param decl
 */
function _assign(decl: Declaration) {
  if (decl.prop === 'padding')
    // 使用 margin: 10px 替换当前的 padding 声明
    decl.assign({ prop: 'margin', value: '10px' })
}

/**
 * 清理额外字符
 * @param decl
 */
function _cleanRaws(decl: Declaration) {
  if (decl.prop === 'background-color') {
    log('clean before : ', decl.raws)
    decl.cleanRaws()
    log('clean after : ', decl.raws)
  }
}

/**
 * 克隆声明
 * @param decl
 */
function _clone(decl: Declaration) {
  if (decl.prop === 'background-color') {
    const clone = decl.clone()
    log('clone : ', clone.prop, clone.value)
  }
}

/**
 * 克隆声明并插入
 * @param decl
 */
function _cloneInsert(decl: Declaration) {
  if (decl.prop === 'padding' && !Reflect.has(decl, 'isCloned')) {
    Reflect.set(decl, 'isCloned', true)
    decl.cloneAfter({ value: '10px' })
    // 克隆并插入后, 删除原有的节点
    decl.remove()
  }

  if (decl.prop === 'width' && !Reflect.has(decl, 'isCloned')) {
    Reflect.set(decl, 'isCloned', true)
    decl.cloneBefore({ value: '100px' })
    // 克隆并插入后, 删除原有的节点
    decl.remove()
  }
}

/**
 * 获取当前声明的上一个节点(同父节点)
 * @param decl
 */
function _prev(decl: Declaration) {
  if (decl.prop === 'margin') {
    const node = decl.prev()
    log('decl prev : ', node && (node as Declaration).prop)
  }
}

/**
 * 获取当前声明的下一个节点(同父节点)
 * @param decl
 */
function _next(decl: Declaration) {
  if (decl.prop === 'padding') {
    const node = decl.next()
    log('decl next : ', node && (node as Declaration).prop)
  }
}

/**
 * 替换当前声明的属性为 height
 * @param decl
 */
function _replaceWith(decl: Declaration) {
  if (decl.prop === 'width') {
    const node = decl.clone({ prop: 'height' })
    decl.replaceWith(node)
  }
}
/**
 * 获取当前声明前的额外字符
 * @param decl
 */
function _raw(decl: Declaration) {
  if (decl.prop === 'background-color') {
    const before = decl.raw('before')
    log('decl raw before : ', before)
  }
}

/**
 * 获取当前声明的根实例
 * @param decl
 */
function _root(decl: Declaration) {
  if (decl.prop === 'width')
    log('decl root : ', decl.root().toString())
}

/**
 * 打印当前声明: JSON 风格
 * @param decl
 */
function _toJSON(decl: Declaration) {
  if (decl.prop === 'width') {
    const json = decl.toJSON()
    log('decl toJson : ', json)
  }
}

/**
 * 打印当前声明: 字符串风格
 * @param decl
 */
function _toString(decl: Declaration) {
  if (decl.prop === 'width') {
    const string = decl.toString()
    log('decl toString : ', string)
  }
}

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-declaration',
    prepare(_result: Result) {
      return {
        Declaration(decl, _helper) {
          // 打印 decl 的属性
          // _printDeclAttribute(decl)

          // 插入新的节点
          // _insert(decl)

          // 分配节点
          // _assign(decl)

          // 清理额外字符
          // _cleanRaws(decl)

          // 克隆声明
          // _clone(decl)

          // 克隆声明并插入
          // _cloneInsert(decl)

          // 获取当前声明的上一个节点(同父节点)
          // _prev(decl)

          // 获取当前声明的下一个节点(同父节点)
          // _next(decl)

          // if (decl.prop === 'width') {
          //   // 获取当前声明中 width 的位置
          //   const pos = decl.positionBy({
          //     word: 'width',
          //   })
          //   log('pos', pos)
          // }

          // 替换当前声明的属性为 height
          // _replaceWith(decl)

          // 获取当前声明前的额外字符
          // _raw(decl)

          // 获取当前声明的根实例
          // _root(decl)

          // 打印当前声明: JSON 风格
          _toJSON(decl)

          // 打印当前声明: 字符串风格
          _toString(decl)
        },
      }
    },
  }
}
