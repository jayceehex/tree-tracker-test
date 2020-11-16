import { Component, Fragment } from 'react'
import { getTrees } from '../src/ecologi-api/trees'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import crossfilter from 'crossfilter2'
// import { formatISO } from 'date-fns/esm'

const squashedDates = (data) => {
  return data.map((obj) => ({
    value: obj.value,
    date: new Date(obj.createdAt.slice(0, 10)),
  }))
}

class TreeChart extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    getTrees()
      .then((res) => res.data.data)
      .then((data) => squashedDates(data))
      .then((data) => {
        const dataByDate = crossfilter(data)
          .dimension((d) => d.date)
          .group()
        return dataByDate.reduceSum((d) => d.value).all()
      })
      .then((data) => this.setState({ loading: false, data }))
      .catch((err) => console.error(err))
  }

  render() {
    const { loading, data } = this.state

    return (
      <Fragment>
        {loading ? (
          'Loading...'
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
