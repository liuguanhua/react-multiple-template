import Layout from '@components/layout'

import menuData from '../routes'

function App() {
  return <Layout menuData={menuData} viewPath="main" />
}

export default App
