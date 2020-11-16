import { TreePlanting } from '../ecologi-api/trees'

const squashedDates = (
  data: Array<TreePlanting>
): Array<{ value: number; createdAt: Date }> =>
  data.map((obj) => ({
    value: obj.value,
    createdAt: new Date(obj.createdAt.substring(0, 10)),
  }))

export default squashedDates
