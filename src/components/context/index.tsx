import { createContext } from 'react'

import { DEFAULT_THEME } from '@scripts/constant'

export interface ICtxThemeProps {
  theme: TThemeField
  switchTheme: any
}

export const ThemeContext = createContext<ICtxThemeProps>({
  theme: DEFAULT_THEME,
  switchTheme: () => {},
})

export const CtxRoutes = createContext<{
  routes: TRouteItemGroupProps
}>({
  routes: [],
})
