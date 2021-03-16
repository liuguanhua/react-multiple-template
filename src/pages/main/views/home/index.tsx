import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'

import { DisplayContent } from '@components/common'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  const history = useHistory()
  const [isError, setIsError] = useState(false)

  if (isError) {
    throw new Error('捕获错误!')
  }

  return (
    <DisplayContent>
      <Button
        type="primary"
        danger
        onClick={() => {
          setIsError(true)
        }}
        style={{
          marginRight: 10,
        }}
      >
        触发错误
      </Button>
      <Button
        type="primary"
        onClick={() => {
          history.push('/404')
        }}
      >
        跳转404
      </Button>
    </DisplayContent>
  )
}

export default Home
