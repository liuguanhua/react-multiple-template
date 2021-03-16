import React from 'react'
import { Menu } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

import routers from '@scripts/routers'
import { findItem } from '@scripts/utils'

import { BegetMenu, BegetSider } from '@components/common'

const { SubMenu } = Menu

const SiderBar: React.FC<
  {
    menuData?: TRouteItemGroupProps
    basename?: string
  } & RouteComponentProps
> = ({ menuData = [], location: { pathname }, basename }) => {
  const { title = '' } = findItem(routers, basename, 'path')

  return (
    <BegetSider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      style={{
        marginTop: 16,
        height: 'calc(100vh - 62px)',
      }}
      width={256}
    >
      <BegetMenu
        defaultOpenKeys={['menu']}
        defaultSelectedKeys={pathname ? [pathname] : []}
        mode="inline"
        style={{ width: 256 }}
      >
        <SubMenu key="menu" title={title}>
          {menuData
            .filter((item) => !item.isHidden)
            .map(({ path, title }) => {
              return (
                <Menu.Item key={path}>
                  <Link to={path}>{title}</Link>
                </Menu.Item>
              )
            })}
        </SubMenu>
      </BegetMenu>
    </BegetSider>
  )
}

export default withRouter(SiderBar)
