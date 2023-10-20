# Root

## 概念

> 表示一个经过解析的 `CSS` 文档的实例对象

## 属性 

## 函数 

### walk, 遍历 

#### 1. walk, 遍历所有 Node

```js
/**
 * 遍历所有 Node
 * @param root
 */
function _walk(root: Root) {
  root.walk((node: ChildNode) => {
    log('node.type : ', node.type)
  })
}
```

#### 2. walkAtRules, 遍历 @rules

```js
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
```

#### 3. walkComments, 遍历 comments

```js
/**
 * 遍历 comments
 * @param root
 */
function _walkComments(root: Root) {
  root.walkComments((comment: Comment, _indexed: number) => {
    log('comment : ', comment.toString())
  })
}
```

#### 4. walkDecls, 遍历 decls

```js
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
```

#### 5. walkRules, 遍历 rules

```js
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
```


### insert, 插入

#### 1. insertBefore, 插入到当前规则的前面

```js
/**
 * 在 root 中的第一个 Node 前插入新的 Node
 * @param index
 * @param root
 */
function _insertBefore(index: number, root: Root) {
  root.insertBefore(index, `
.red {
  color: red
}`)
}
```

#### 2. insertAfter, 插入到当前规则的后面

```js
/**
 * 在 root 中的第一个 Node 后插入新的 Node
 * @param index
 * @param root
 */
function _insertAfter(index: number, root: Root) {
  root.insertAfter(index, `
.black { 
  color: black 
}`)
}
```

#### 3. append, 追加到所有规则的后面

```js
/**
 * 追加 两个 Node
 * @param root
 */
function _append(root: Root) {
  root.append(
    '.black { color: black}',
    '.red { color: red }',
  )
}
```

### remove, 移除

#### 1. 移除所有的规则

```js
/**
 * 移除所有的 Node
 * @param root
 */
function _removeAll(root: Root) {
  root.removeAll()
}
```

#### 2. 移除指定的规则

```js
/**
 * 移除指定的 Node
 * @param root
 */
function _removeChild(root: Root) {
  root.removeChild(root.nodes[1])
}
```

