import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

import { BegetThemeContainer } from '@components/common'

interface INotFoundProps {}

const NotFound: React.FC<INotFoundProps> = () => {
  const history = useHistory()

  return (
    <BegetThemeContainer showThemeColor>
      <div>
        <h1>404</h1>
        <Button
          type="primary"
          onClick={() => {
            history.push('/')
          }}
        >
          回首页
        </Button>
      </div>
    </BegetThemeContainer>
  )
}

export default NotFound
