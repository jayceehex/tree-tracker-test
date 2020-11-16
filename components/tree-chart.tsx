import { Fragment } from 'react'
import React from 'react'
import {
  EcologiResponse,
  getTrees,
  TreePlanting,
} from '../src/ecologi-api/trees'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory'
import crossfilter from 'crossfilter2'
import squashedDates from '../src/utils/squashed-dates'

class TreeChart extends React.Component<
  {},
  { loading: boolean; error: boolean; data: Array<TreePlanting> }
> {
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
        .map((item) => ({
          ...item,
          label: `${item.value} on ${item.key.toString()}`,
        }))
      this.setState({ data: valueSumByDate as [] })
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
      <div className="chart">
        {loading ? (
          'Loading...'
        ) : error ? (
          'There was an error. Please try again later.'
        ) : (
          <Fragment>
            <h2>How many trees does Ecologi plant per day?</h2>
            <VictoryChart
              domainPadding={10}
              width={1000}
              theme={VictoryTheme.grayscale}
            >
              <VictoryBar
                data={data}
                y="value"
                x="key"
                barWidth={5}
                labelComponent={<VictoryTooltip />}
                style={{
                  data: { fill: '#009f75' },
                  labels: { color: '#222222' },
                  parent: { border: '1px solid #222222' },
                }}
              />
            </VictoryChart>
          </Fragment>
        )}
        <style jsx>{`
          .chart {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}

export default TreeChart
