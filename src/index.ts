import { log } from 'node:console'
import postcss from 'postcss'

import pluginRoot from './plugins/plugin-root'

async function startup() {
  const text = `
/**
* Paste or drop some CSS here and explore
* the syntax tree created by chosen parser.
* Enjoy!
*/
 
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
}

.container {
    width: 100%;
}
`
  const plugins = [pluginRoot()]
  const result = await postcss(plugins).process(text, { from: undefined, to: undefined })
  log('Result : \n', result.root.toString())
}

startup()
