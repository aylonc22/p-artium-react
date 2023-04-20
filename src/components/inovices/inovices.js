import React,{useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import { Calendar } from 'primereact/calendar';
        
        
import exportExcel from "../../services/exportExcel";

const Inovices = ({})=>{
    const [accountName,setAccountName] = useState("");
    const [inoviceId,setInoviceId] = useState("");
    const [money,setMoney] = useState("");
    const [date,setDate] = useState("");
    const [visible, setVisible] = useState(false);
    const [inovices,setAccounts] = useState([{id:1,name:"ברק",date:"08/08/2020",money:200}]);   
    const footer = <div style={{display:"flex",width:"80rem"}}><Button  style={{display:"flex",justifyContent:"space-between",width:"200px"}} onClick={()=>setVisible(true)} icon="pi pi-plus" label="הוסף" /><Button icon="pi pi-file" onClick={()=>exportExcel(inovices)} style={{display:"flex",justifyContent:"space-between",marginRight:"100px",width:"200px"}}label="יצא" /></div>
    return (<div className="center">
      <DataTable value={inovices} paginator rows={10} stripedRows  tableStyle={{color:"white",height:'200px',minWidth: '80rem' }} footer={footer}>
        <Column field="id" className="p-inuttext" sortable  header="מספר חשבונית" style={{textAlign:"right", width: '30%' }}></Column>
        <Column  field ="name" sortable  header="שם לקוח" style={{ textAlign:"right",width: '30%' }}></Column>
        <Column field="date" sortable  header="תאריך חשבונית" style={{ textAlign:"right",width: '30%' }}></Column>
        <Column  field="money" header="סכום"  style={{ textAlign:"right", width: '10%' }}></Column>
       
    </DataTable>
    <Dialog  header="פרטי חשבונית" visible={visible}  onHide={() => setVisible(false)}>
        <div className="label">מס' חשבונית</div>
        <InputText style={{width:"210px"}} onChange={(e)=>setInoviceId(e.target.value)}></InputText>
        <div className="label">שם לקוח</div>
        <InputText style={{width:"210px"}} onChange={(e)=>setAccountName(e.target.value)}></InputText>
        <div className="label">תאריך חשבונית</div>
        <Calendar dateFormat="dd/mm/yy" onChange={(e) => setDate(e.value)} />
        <div className="label"> סכום</div>
        <InputNumber style={{width:"210px"}} showButtons value={0} onValueChange={(e) => setMoney(e.value)} />
        <div></div>
        <Button style={{marginTop:"20px",marginLeft:"20px"}} label="שמור" onClick={()=>{
            setAccounts(current=>[...current,{id:inoviceId,name:accountName,date:date,money:money}]);
            setVisible(false);
        }}></Button>      
        <Button style={{marginTop:"20px"}} label="בטל" onClick={()=>{
            setInoviceId("");
            setAccountName("");
            setDate("");
            setVisible(false);
        }}></Button>
        
    </Dialog>
    </div>
    )
}

export default Inovices;