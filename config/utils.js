const fs = require('fs')
const path = require('path')
const glob = require('glob')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const ENTRY_PATH = resolveApp('src/pages')

// 多入口配置 getEntries
const getEntries = function () {
  const entryFiles = glob.sync(ENTRY_PATH + '/*/*.*(js|tsx)')
  const map = []
  entryFiles.forEach((filePath) => {
    const filename = filePath.replace(
      /.*\/(\w+)\/\w+(\.html|\.js|\.tsx)$/,
      (rs, $1) => $1
    )
    if (filename !== 'common') {
      map.push({
        entry: filePath,
        outPath: `${filename}/index.html`,
        name: filename,
      })
    }
  })
  return map
}

module.exports = {
  resolveApp,
  getEntries,
}
