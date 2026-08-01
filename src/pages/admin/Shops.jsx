import DataTable from '../../components/common/DataTable'
import { shops } from '../../data/appData'
export default function Shops({globalSearch=''}){const rows=shops.filter(s=>`${s.name} ${s.area}`.toLowerCase().includes(globalSearch.toLowerCase()));return <DataTable rows={rows} columns={[{key:'name',label:'Partner Shop',className:'tname'},{key:'area',label:'Location'},{key:'rating',label:'Rating',render:v=>`${v} ★`},{key:'status',label:'Status',render:()=> <span className="badge badge-green">Active</span>}]}/>}
