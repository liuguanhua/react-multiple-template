import Layout from '@components/layout'

import menuData from '../routes'

function App() {
  return <Layout menuData={menuData} viewPath="page1" basename="/page1" />
}

export default App
