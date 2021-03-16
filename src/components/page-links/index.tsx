import * as React from 'react'
import { Menu } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import routers from '@scripts/routers'

import { BegetMenu } from '@components/common'
interface IPageLinksProps {
  basename?: string
}

const PageLinks: React.FC<IPageLinksProps & RouteComponentProps> = ({
  basename,
}) => {
  return (
    <BegetMenu
      defaultSelectedKeys={basename ? [basename] : []}
      mode="horizontal"
    >
      {routers.map(({ path, title }) => {
        return (
          <Menu.Item key={path}>
            <a href={path} rel="noopener noreferrer">
              {title}
            </a>
          </Menu.Item>
        )
      })}
    </BegetMenu>
  )
}

export default withRouter(PageLinks)
