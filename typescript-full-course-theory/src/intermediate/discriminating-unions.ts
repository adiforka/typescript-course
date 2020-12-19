// use literal type state and give it to all members of a union type (from TS handbook)
type NetworkLoadingState = {
  state: 'loading'
}

type NetworkFailedState = {
  state: 'failed'
  code: number
}

type NetworkSuccessState = {
  state: 'success'
  response: {
    title: string
    duration: number
    summary: string
  }
}

type NetworkState =
  | NetworkLoadingState
  | NetworkFailedState
  | NetworkSuccessState

// help the compiler work out that we've used all the possible cases (add default branch with never)
function logger(networkState: NetworkState) {
  switch (networkState.state) {
    case 'loading':
      return 'downloading...'
    case 'failed':
      return `Error ${networkState.code} downloading`
    case 'success':
      return `Downloaded ${networkState.response.title} -- ${networkState.response.summary}`
    default:
      assertNever(networkState)
  }
}

function assertNever(x: never): never {
  throw new Error('unexpected value ' + x)
}
