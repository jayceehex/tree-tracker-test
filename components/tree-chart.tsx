import { Fragment } from 'react'
import React from 'react'
import { EcologiResponse, getTrees } from '../src/ecologi-api/trees'
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory'
import crossfilter from 'crossfilter2'
import squashedDates from '../src/utils/squashed-dates'

class TreeChart extends React.Component {
  state = { loading: true, error: false, data: [] }

  componentDidMount() {
    this.transformTreeData(getTrees())
  }

  async transformTreeData(res: Promise<EcologiResponse>) {
    try {
      const valueSumByDate = crossfilter(squashedDates((await res).data.data))
        .dimension((d) => d.createdAt)
        .group()
        .reduceSum((d) => d.value)
        .all()
      this.setState({ data: valueSumByDate })
    } catch (e) {
      console.error(e)
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
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
