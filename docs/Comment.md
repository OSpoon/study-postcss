# Comment

## 概念

> 表示一个处理 `CSS` 注释的类

## 属性 

#### parent, 当前注释的父节点

```js
comment.parent?.toString()
```

#### raws, 当前注释中不必要的空白字符

```js
comment.raws
```

#### source, 当前注释源信息, 生成映射必备

```js
comment.source?.start?.line
comment.source?.end?.line
```

#### text, 当前注释的文本

```js
comment.text
```

#### type, 当前节点的类型

```js
comment.type
```

## 函数

### insert, 插入

#### after, 插入到当前节点之后

```js
/**
 * 在当前注释之后插入新节点
 * @param comment
 */
function _after(comment: Comment) {
  comment.after('\n.wapper-after { \n color: black\n }')
}
```

#### before, 插入到当前节点之前

```js
/**
 * 在当前注释之后插入新节点
 * @param comment
 */
function _before(comment: Comment) {
  comment.before('\n.wapper-befor { \n color: black\n }')
}
```

#### replaceWith, 替换当前节点

```js
/**
 * 在当前注释前增加节点,并移除此注释
 * @param comment
 */
function _replaceWith(comment: Comment) {
  const rule = new Rule({ selector: 'a' })
  const decl = new Declaration({
    prop: 'color',
    value: 'black'
  })
  rule.append(decl)
  comment.replaceWith(rule)
}
```

### remove, 移除

#### cleanRaws, 移除当前节点的样式

```js
/**
 * 清除注释中的样式
 * @param comment
 */
function _cleanRaws(comment: Comment) {
  log('clear before : ', comment.raws)
  comment.cleanRaws()
  log('clear after : ', comment.raws)
}
```

#### remove, 移除当前节点

```js
/**
 * 清除当前注释
 * @param comment
 */
function _remove(comment: Comment) {
  comment.remove()
}
```

### toXXX, 输出

#### toJSON, 输出JSON

```js
/**
 * 输出注释的 JSON 风格
 * @param comment
 */
function _toJSON(comment: Comment) {
  log('comment.toJSON', comment.toJSON())
}
```

#### toString, 输出字符串

```js
/**
 * 输出注释的字符串风格
 * @param comment
 */
function _toString(comment: Comment) {
  log('comment.toString', comment.toString())
}
```

### get, 获取

#### next, 获取当前节点的下一个节点

```js
const node = comment.next()
log('comment.next : ', node?.toString())
```

#### pre, 获取当前节点的上一个节点

```js
const node = comment.prev()
log('comment.prev : ', node?.toString())
```

#### positionBy, 获取节点内单词或索引的位置

```js
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
```

#### positionInside, 将字符串索引转换为行/列

```js
/**
 * 将字符串索引转换为行/列
 * @param comment
 */
function _positionInside(comment: Comment) {
  const pos2 = comment.positionInside(0)
  log('comment.positionInside : ', pos2)
}
```