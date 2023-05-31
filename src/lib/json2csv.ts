import { parse } from 'json2csv'
import { type } from 'os'

type User = {
  email: string
  password: string
  name: string
  _id: string
}[]

export default function json2csv(json: User) {
    const headers = Object.keys(json[0]).join(',') + '\n';
    const values = json.map(item => Object.values(item).join(',')).join('\n');
    return headers + values;
}
