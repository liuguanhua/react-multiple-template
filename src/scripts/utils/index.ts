import { isString, isObject } from 'util'
import styTheme from '@styles/sass/theme.module.scss'

/**
 * 去掉引号
 * @param {string} [str='']
 */
export const replaceDoubleQuotes = (str: string = '') => str.replace(/"/g, '')

export const themesSkin: Dictionary = (() => {
  if (isString(styTheme.themeType)) {
    const themeList = styTheme.themeType.split(',')
    return themeList.reduce((skin, item) => {
      if (isString(item)) {
        const [type, color] = item.split(' ').filter(Boolean)
        skin = {
          ...skin,
          [replaceDoubleQuotes(type)]: color,
        }
      }
      return skin
    }, {})
  }
  return {}
})()

export const findItem = <T = {}, K = string>(
  data: T[] = [],
  value?: K,
  key: string = 'id'
): Dictionary =>
  data.find((v) =>
    isObject(v) ? Object.is(v[key], value) : Object.is(v, value)
  ) || {}
