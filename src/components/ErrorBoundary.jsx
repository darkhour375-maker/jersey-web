import { Component } from 'react'
import { ErrorBoundaryFallback } from './Misc.jsx'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) return <ErrorBoundaryFallback error={this.state.error} />
    return this.props.children
  }
}
