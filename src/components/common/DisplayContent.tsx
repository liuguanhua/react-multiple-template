import React, { useContext } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import logo from '@assets/images/logo.svg'

import { findItem } from '@scripts/utils'

import { CtxRoutes } from '@components/context'
import { BegetThemeContainer } from './GlobalWidget'

interface IDisplayContentProps {}

const DisplayContent: React.FC<IDisplayContentProps & RouteComponentProps> = (
  props
) => {
  const {
    location: { pathname },
    children,
  } = props
  const { routes } = useContext(CtxRoutes)
  const info = findItem(routes, pathname, 'path')

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <BegetThemeContainer showThemeColor>
        <h1
          style={{
            fontSize: 30,
          }}
        >
          当前路由信息：{JSON.stringify(info)}
        </h1>
      </BegetThemeContainer>
      {children}
    </div>
  )
}

export default withRouter(DisplayContent)
