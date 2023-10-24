import { log } from 'node:console'
import { Declaration, Rule } from 'postcss'
import type { AcceptedPlugin, Comment, Result } from 'postcss'

/**
 * 打印 Comment 的相关属性
 * @param comment
 */
function _printProperty(comment: Comment) {
  // 打印当前注释的父节点
  log('comment.parent : ', comment.parent?.toString())

  // 打印当前注释的空白字符
  log('comment.raws : ', comment.raws)

  // 打印当前注释的起止行
  log('comment.source start line : ', comment.source?.start?.line)
  log('comment.source end line : ', comment.source?.end?.line)

  // 打印当前注释的文本内容
  log('comment.text : ', comment.text)

  // 打印当前节点的类型, 此时的类型是 `comment`
  log('comment.type : ', comment.type)
}

/**
 * 在当前注释之后插入新节点
 * @param comment
 */
function _after(comment: Comment) {
  comment.after('\n.wapper-after { \n color: black\n }')
}

/**
 * 在当前注释之后插入新节点
 * @param comment
 */
function _before(comment: Comment) {
  comment.before('\n.wapper-befor { \n color: black\n }')
}

/**
 * 清除注释中的样式
 * @param comment
 */
function _cleanRaws(comment: Comment) {
  log('clear before : ', comment.raws)
  comment.cleanRaws()
  log('clear after : ', comment.raws)
}

/**
 * 清除当前注释
 * @param comment
 */
function _remove(comment: Comment) {
  comment.remove()
}

/**
 * 输出注释的 JSON 风格
 * @param comment
 */
function _toJSON(comment: Comment) {
  log('comment.toJSON', comment.toJSON())
}

/**
 * 输出注释的字符串风格
 * @param comment
 */
function _toString(comment: Comment) {
  log('comment.toString', comment.toString())
}

/**
 * 在当前注释前增加节点,并移除此注释
 * @param comment
 */
function _replaceWith(comment: Comment) {
  const rule = new Rule({ selector: 'a' })
  const decl = new Declaration({ prop: 'color', value: 'black' })
  rule.append(decl)
  comment.replaceWith(rule)
}

/**
 * 获取当前节点的下一个节点
 * @param comment
 */
function _next(comment: Comment) {
  const node = comment.next()
  log('comment.next : ', node?.toString())
}

/**
 * 获取当前节点的上一个节点
 * @param comment
 */
function _prev(comment: Comment) {
  const node = comment.prev()
  log('comment.prev : ', node?.toString())
}

/**
 * 获取节点内单词或索引的位置
 * @param comment
 */
function _positionBy(comment: Comment) {
  const pos1 = comment.positionBy({
    word: 'Paste',
  })
  log('comment.positionBy : ', pos1)
}

/**
 * 将字符串索引转换为行/列
 * @param comment
 */
function _positionInside(comment: Comment) {
  const pos2 = comment.positionInside(0)
  log('comment.positionInside : ', pos2)
}

/**
 * 克隆节点
 * @param comment
 */
function _clone(comment: Comment) {
  const node = comment.clone()
  log('comment.clone : ', node?.toString())
}

/**
 * 克隆节点,并将节点插入当前节点之后
 * @param comment
 */
function _cloneAfter(comment: Comment) {
  if (!Reflect.has(comment, 'cloned')) {
    Reflect.set(comment, 'cloned', true)
    comment.cloneAfter({
      text: `CloneAfter: ${comment.text}`,
    })
  }
}

/**
 * 克隆节点,并将节点插入当前节点之前
 * @param comment
 */
function _cloneBefore(comment: Comment) {
  if (!Reflect.has(comment, 'cloned')) {
    Reflect.set(comment, 'cloned', true)
    comment.cloneBefore({
      text: `CloneBefore: ${comment.text}`,
    })
  }
}

function _printComment(comment: Comment) {
  log('comment.raw : ', comment.raw)
  log('comment.root : ', comment.root)
}

export default function (opts = {}): AcceptedPlugin {
  log('opts : \n', opts)
  return {
    postcssPlugin: 'plugin-03',
    prepare(_result: Result) {
      return {
        Comment(comment, _helper) {
          // _printComment(comment)

          // 打印 Comment 的相关属性
          // _printProperty(comment)

          // 在当前注释之后插入新节点
          // _after(comment)

          // 在当前注释之后插入新节点
          // _before(comment)

          // 清除注释中的样式
          // _cleanRaws(comment)

          // 清除当前注释
          // _remove(comment)

          // 输出注释的 JSON 风格
          // _toJSON(comment)

          // 输出注释的字符串风格
          // _toString(comment)

          // 在当前注释前增加节点,并移除此注释
          // _replaceWith(comment)

          // 获取当前节点的下一个节点
          // _next(comment)

          // 获取当前节点的上一个节点
          // _prev(comment)

          // 获取节点内单词或索引的位置
          // _positionBy(comment)

          // 将字符串索引转换为行/列
          // _positionInside(comment)

          // 克隆节点,并将节点插入当前节点之后
          // _cloneAfter(comment)

          // 克隆节点,并将节点插入当前节点之前
          // _cloneBefore(comment)

          // 克隆节点
          // _clone(comment)
        },
      }
    },
  }
}
