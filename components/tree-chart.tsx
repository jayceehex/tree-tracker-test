import { Component, Fragment } from 'react'
import { getTrees } from '../src/ecologi-api/trees'
import { Line, LineChart } from 'recharts';

class TreeChart extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    getTrees()
      .then(res => res.data.data)
      .then(data => {
        console.log('Loaded!', data[0])
        return data
      })
      .then(data => this.setState({ loading: false, data }))
      .catch(err => console.error(err))
  }

  render() {
    const { loading, data } = this.state

    return (
      <Fragment>
        { loading ? 'Loading...' :
          <LineChart width={400} height={400} data={[data[0], data[1], data[2]]}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        }
      </Fragment>
    )
  }
}

export default TreeChart