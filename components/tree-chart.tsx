import { Component, Fragment } from 'react'
import { getTrees } from '../src/ecologi-api/trees'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import crossfilter from 'crossfilter2'
import squashedDates from '../src/utils/squashed-dates'

class TreeChart extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true, error: false }
  }

  componentDidMount() {
    getTrees()
      .then((res) => res.data.data)
      .then((data) => squashedDates(data))
      .then((data) => {
        const dataByDate = crossfilter(data)
          .dimension((d) => d.createdAt)
          .group()
        return dataByDate.reduceSum((d) => d.value).all()
      })
      .then((data) => this.setState({ loading: false, data }))
      .catch((err) => {
        console.error(err)
        return this.setState({ loading: false, error: true })
      })
  }

  render() {
    const { loading, error, data } = this.state

    return (
      <Fragment>
        {loading ? (
          'Loading...'
        ) : error ? (
          'There was an error. Please try again later.'
        ) : (
          <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
            <VictoryBar
              data={data}
              y="value"
              x="key"
              style={{
                data: { fill: '#009f75' },
                labels: { color: '#222222' },
                parent: { border: '1px solid #222222' },
              }}
            />
          </VictoryChart>
        )}
      </Fragment>
    )
  }
}

export default TreeChart
