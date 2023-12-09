function LoadingIndicator(props) {
  return (
    <progress max="100" value={props.progress}>
      {props.progress}
    </progress>
  )
}

export default LoadingIndicator