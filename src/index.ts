import { log } from 'node:console'
import postcss from 'postcss'

import pluginRoot from './plugins/plugin-root'
import pluginRule from './plugins/plugin-rule'
import pluginComment from './plugins/plugin-comment'
import pluginAtRule from './plugins/plugin-atrule'
import pluginDeclaration from './plugins/plugin-declaration'

async function startup() {
  const text = `/**
* Paste or drop some CSS here and explore
* the syntax tree created by chosen parser.
* Enjoy!
*/

:root { --one: 1 }

@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
 
#main {
    border: 1px solid black;
}
 
ul li {
    padding: 5px;
    margin: 15px;
}

.container {
    width: 100% !important;
}
`
  const plugins = [
    // pluginRoot(),
    // pluginRule(),
    // pluginComment(),
    // pluginAtRule(),
    pluginDeclaration(),
  ]
  const result = await postcss(plugins).process(text, { from: undefined, to: undefined })
  log('Result : \n', result.root.toString())
}

startup()
