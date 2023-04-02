const fs = require('fs')
const path = require('path')

module.exports = (file = '.env.json') => ((filtered) => Object.assign(process.env, filtered))(
  ((obj) => Object.keys(obj).reduce((acc, v) => {
    !Object.prototype.hasOwnProperty.call(process.env, v) &&
          (acc[v] = JSON.stringify(obj[v]))
    return acc
  }, {}))(
    ((toString) => {
      try {
        return JSON.parse(toString)
      } catch (e) {
        console.error(`Unable to parse ${file}`)
        return {}
      }
    })(
      ((path) => fs.readFileSync(path, 'utf-8'))(
        ((name) => path.resolve(process.cwd(), name))(file)
      )
    )
  )
)
