import React, { useEffect } from 'react'
import { Layout, Button } from 'antd'
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'

import 'antd/dist/antd.css'
import '@assets/styles/global.scss'

import routers from '@scripts/routers'
import { findItem } from '@scripts/utils'
import Loadable from '@scripts/loadable'

import { useTheme } from '@components/hooks'
import { CtxRoutes } from '@components/context'
import PageLinks from '@components/page-links'
import { BegetThemeContainer, ThemeProvider } from '@components/common'
import SiderBar from './SiderBar'
import catchErrorRecord from '@components/high-order/catchErrorRecord'

const { Content, Footer } = Layout

interface IRouteItemCmptProps {
  viewPath?: string
}

function Loading(props) {
  if (props.error) {
    return (
      <div>
        <span className="highlight">错误:{props.error.toString()}</span>{' '}
        <Button type="primary" onClick={props.retry}>
          重试
        </Button>
      </div>
    )
  } else if (props.timedOut) {
    return (
      <div>
        超时...{' '}
        <Button type="primary" onClick={props.retry}>
          重试
        </Button>
      </div>
    )
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

@catchErrorRecord
class RouteItemCmpt extends React.Component<
  IRouteItemCmptProps &
    RouteProps & {
      routesInfo?: IRouteItemProps
    }
> {
  render() {
    const { viewPath, path, exact, routesInfo = {} } = this.props
    const { component_from, component } = routesInfo as Dictionary
    const LazyComponent = Loadable({
      loader: () => {
        const src = component_from || `${viewPath ? `${viewPath}/` : ''}views`
        return import(
          /* webpackChunkName: "p_[request]" */
          `@pages/${src}/${component}`
        )
      },
      loading: Loading,
    })
    return (
      <Route exact={exact} path={path}>
        <LazyComponent />
      </Route>
    )
  }
}

interface IBasicLayoutProps extends IRouteItemCmptProps {
  menuData?: TRouteItemGroupProps
  basename?: string
}

const BasicLayout: React.FC<IBasicLayoutProps & RouteComponentProps> = ({
  menuData = [],
  basename = '/',
  viewPath = '',
  children,
}) => {
  const { switchTheme } = useTheme()
  useEffect(() => {
    const { themeKey } = findItem(routers, basename, 'path')
    themeKey && switchTheme(themeKey)
  }, [])

  return (
    <div className="App">
      <PageLinks basename={basename} />
      <Layout>
        <SiderBar menuData={menuData} basename={basename} />
        <Layout>
          <BegetThemeContainer showThemeBgColor>
            <Content style={{ margin: '16px' }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Switch>
                  {menuData.map((item) => {
                    const { path } = item
                    return (
                      <RouteItemCmpt
                        key={path}
                        {...{
                          viewPath,
                          path,
                        }}
                        {...(Object.is(path, '/') && {
                          exact: true,
                        })}
                        routesInfo={item}
                      />
                    )
                  })}
                </Switch>
                {children}
              </div>
            </Content>
          </BegetThemeContainer>
          <BegetThemeContainer showThemeColor showThemeBgColor>
            <Footer
              style={{
                textAlign: 'center',
                margin: '0 16px',
                fontSize: 20,
              }}
            >
              Footer
            </Footer>
          </BegetThemeContainer>
        </Layout>
      </Layout>
    </div>
  )
}

const WithBasicLayout = withRouter(BasicLayout)

const WrapBasicLayout: React.FC<IBasicLayoutProps> = (props) => {
  const { menuData = [] } = props
  return (
    <ThemeProvider>
      <CtxRoutes.Provider
        value={{
          routes: menuData,
        }}
      >
        <HashRouter>
          <WithBasicLayout {...props} />
        </HashRouter>
      </CtxRoutes.Provider>
    </ThemeProvider>
  )
}

export default WrapBasicLayout
