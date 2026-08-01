import WorkspaceLayout from './WorkspaceLayout'
import { readRoute } from '../routes/routes'
const items=[{id:'dashboard',label:'Dashboard',icon:'home'},{id:'shops',label:'Nearby Shops',icon:'pin'},{id:'marketplace',label:'Marketplace',icon:'bag'},{id:'installments',label:'My Installments',icon:'calendar'},{id:'c2c',label:'C2C Listings',icon:'swap'},{id:'settings',label:'Account Settings',icon:'settings'}]
export default function CustomerLayout({children}){const active=readRoute().view||'dashboard';const title=items.find(i=>i.id===active)?.label||'Dashboard';const area=localStorage.getItem('midas-customer-area')||'Dhanmondi, Dhaka';return <WorkspaceLayout role="customer" label="Customer Workspace" items={items} active={active} title={title} subtitle={area}>{children}</WorkspaceLayout>}
