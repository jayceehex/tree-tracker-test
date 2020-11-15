import axios from 'axios'

export const getTrees = (): Promise<any> =>
  axios.get('https://public.ecologi.com/trees')
