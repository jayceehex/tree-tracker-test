import { Component, Fragment } from 'react'
import { getTrees } from '../src/ecologi-api/trees'

class TreeChart extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    getTrees()
      .then((res) => res.data.data)
      .then((data) => this.setState({ loading: false, data }))
      .catch((err) => console.error(err))
  }

  render() {
    const { loading, data } = this.state

    return (
      <Fragment>
        {loading ? 'Loading...' : `Chart goes here: ${data[0].toString()}`}
      </Fragment>
    )
  }
}

export default TreeChart
