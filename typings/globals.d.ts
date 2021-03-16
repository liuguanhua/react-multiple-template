declare interface IRouteItemProps extends IRouteItem<IRouteItemProps> {
  path: string
}
declare interface IRouteItemMinorProps extends IRouteItem<IRouteItemMinor> {
  path?: string
}
declare interface IRouteItem<T = IRouteItem> {
  component?: string
  icon?: string
  title?: string
  isHidden?: boolean
  routes?: T[]
  redirect?: string
  component_from?: string
}

declare type TRouteItemGroupProps = IRouteItemProps[]

declare type IRouteItemMinorGroupProps = IRouteItemMinorProps[]

interface Dictionary<T = any> {
  [index: string]: T
}

declare const TThemeFields: ['light', 'dark', 'purple', 'orange', 'pink']

declare type TThemeField = typeof TThemeFields[number]
