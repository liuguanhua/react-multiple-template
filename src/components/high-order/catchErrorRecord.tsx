import errorHandlerHoc from 'error-handler-hoc'

const FallBackComponent = () => {
  return <h2 className="highlight">操作期间发生了错误!</h2>
}

export default errorHandlerHoc(console.log, FallBackComponent)
