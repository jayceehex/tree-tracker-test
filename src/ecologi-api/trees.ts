import axios from 'axios'

export interface EcologiResponse {
  config: any
  headers: any
  request: XMLHttpRequest
  status: number
  statusText: string
  data: {
    responseCode: string
    responseText: string
    data: Array<TreePlanting>
  }
}

export interface TreePlanting {
  value: number
  createdAt: string
}

export const getTrees = (): Promise<EcologiResponse> =>
  axios.get('https://public.ecologi.com/trees')
