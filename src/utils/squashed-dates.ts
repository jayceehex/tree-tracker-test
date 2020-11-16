import { TreePlanting } from '../ecologi-api/trees'

const squashedDates = (data: Array<TreePlanting>): Array<any> =>
  data.map((obj) => ({
    value: obj.value,
    createdAt: new Date(obj.createdAt.substring(0, 10)),
  }))

export default squashedDates
