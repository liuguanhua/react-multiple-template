import React, { ReactElement, useState } from 'react'
import { Menu, Layout } from 'antd'

import styTheme from '@styles/sass/theme.module.scss'

import { SiderProps } from 'antd/lib/layout'
import { MenuProps } from 'antd/lib/menu'

import { DARK_THEME, DEFAULT_THEME } from '@scripts/constant'

import { ThemeContext } from '@components/context'
import { useTheme } from '@components/hooks'

const { Sider } = Layout

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, switchTheme] = useState<TThemeField>(DEFAULT_THEME)
  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const BegetThemeContainer: React.FC<{
  children: ReactElement | null
  showThemeColor?: boolean
  showThemeBgColor?: boolean
}> = ({ children, showThemeColor, showThemeBgColor }) => {
  const { theme } = useTheme()
  const themeColor = styTheme[`theme_color_${theme}`]
  const themeBgColor = styTheme[`theme_bgcolor_${theme}`]
  if (
    React.isValidElement<{
      className: string
      style: React.CSSProperties
    }>(children)
  ) {
    const { className } = children.props
    return React.cloneElement(children, {
      className: `${className ? `${className}` : ''}${
        showThemeColor ? ` ${themeColor} ` : ''
      }${showThemeBgColor ? ` ${themeBgColor}` : ''}`,
    })
  }
  return children
}

export const BegetMenu: React.FC<MenuProps> = ({ children, ...reset }) => {
  const { theme } = useTheme()
  return (
    <div className={styTheme[`theme_menu_${theme}`]}>
      <Menu
        {...reset}
        {...(Object.is(DARK_THEME, theme) && { theme: DARK_THEME })}
      >
        {children}
      </Menu>
    </div>
  )
}

export const BegetSider: React.FC<SiderProps> = ({
  children,
  className = '',
  ...reset
}) => {
  const { theme } = useTheme()
  return (
    <Sider
      className={`${styTheme[`theme_sider_${theme}`]} ${className}`}
      {...reset}
    >
      {children}
    </Sider>
  )
}
