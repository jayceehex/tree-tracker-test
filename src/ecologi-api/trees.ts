import axios from 'axios'

export const getTrees = (): Promise<any> =>
  axios.get('https://public.ecologi.com/trees')
// Promise.resolve(
//   {
//     "responseCode":"OK",
//     "responseText":"Success",
//     "data":[
//       {"value":30,"createdAt":"2020-11-15T16:08:12.932Z"},
//       {"value":5,"createdAt":"2020-11-15T16:08:12.932Z"},
//       {"value":1,"createdAt":"2020-11-13T14:51:38.852Z"},
//       {"value":1,"createdAt":"2020-11-14T14:47:31.514Z"},
//       {"value":3,"createdAt":"2020-11-12T14:47:31.514Z"},
//       {"value":1,"createdAt":"2020-11-11T14:47:31.514Z"},
//       {"value":1,"createdAt":"2020-11-10T14:47:31.514Z"},
//     ]
//   }
//   )
