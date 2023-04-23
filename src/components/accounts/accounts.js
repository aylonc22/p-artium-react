import React,{useEffect, useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import './accounts.css'
import exportExcel from "../../services/exportExcel";
import download from "../../services/generatePDf";
// import download from "../../services/generatePDf";

const Accounts = ({})=>{
    const [searchAccount,setSearchAccount] = useState("");
    const [searchDate,setSearchDate] = useState("");
    const [accountName,setAccountName] = useState("");
    const [accountId,setAccountId] = useState("");
    const [date,setDate] = useState("");
    const [visible, setVisible] = useState(false);
    const [accounts,setAccounts] = useState(require('../../assets/mock-data/accounts.json').accounts);   
    const [toShow,setToShow] = useState(accounts);

    useEffect(()=>{
        console.log(accounts);
        filter();
    },[accounts]);
    
    const filter = ()=>{                      
        if(searchAccount=="" && (searchDate =="" || searchDate== null))
            setToShow(accounts);
            else
                 if(searchDate == "" || searchDate== null)
                    setToShow(accounts.filter((account)=>account.name.includes(searchAccount)));
            else
                    if(searchAccount == "")                                                  
                            setToShow(accounts.filter((account)=>{
                                const dateParts = account.startDate.split('/')
                                return  new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).getTime()==searchDate.getTime()
                            }));                    
            else
                setToShow(accounts.filter((account)=>{                   
                    const dateParts = account.startDate.split('/')
                    return  new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).getTime()==searchDate.getTime() && account.name.includes(searchAccount)
                }))
    }
    
    const footer = <div style={{display:"flex",width:"80rem"}}><Button  style={{display:"flex",justifyContent:"space-between",width:"200px"}} onClick={()=>setVisible(true)} icon="pi pi-plus" label="הוסף" /><Button icon="pi pi-file" onClick={()=>exportExcel(toShow)} style={{display:"flex",justifyContent:"space-between",marginRight:"100px",width:"200px"}}label="יצא" /></div>
    return (<div className="center">
    <div className="specSearch">   
    <InputText  style={{width:"200px",marginRight:"20px",marginBottom:"20px"}}onChange={(e)=>setSearchAccount(e.target.value)} placeholder="שם לקוח"></InputText>    
    <Calendar dateFormat="dd/mm/yy" style={{width:"200px",marginRight:"20px",marginBottom:"20px"}} placeholder="מתאריך" onChange={(e) => setSearchDate(e.value)} />
     <Button style={{width:"200px",marginRight:"20px",marginBottom:"20px"}} label="חפש" onClick={()=>filter()}><i className="pi pi-search"></i></Button>
    </div>
      <DataTable  value={toShow} paginator rows={5} stripedRows showGridlines tableStyle={{color:"white",height:'200px',minWidth: '80rem' }} footer={footer}>
        <Column field="id" className="p-inuttext" sortable  header="מספר לקוח" style={{textAlign:"right", width: '30%' }}></Column>
        <Column  field ="name" sortable  header="שם לקוח" style={{ textAlign:"right",width: '30%' }}></Column>
        <Column field="startDate" sortable  header="תאריך פתיחת לקוח" style={{ textAlign:"right",width: '30%' }}></Column>
        <Column   header="הורדה"  style={{ width: '5%', textAlign:"center"}}  body={(data,props)=><i  onClick={()=>download(toShow[props.rowIndex])} className="pi pi-download"></i>}></Column>
       
    </DataTable>
    <Dialog header="פרטי לקוח" visible={visible}  onHide={() => setVisible(false)}>
        <div className="label">מס' לקוח</div>
        <InputText style={{width:"210px"}} onChange={(e)=>setAccountId(e.target.value)}></InputText>
        <div className="label">שם לקוח</div>
        <InputText style={{width:"210px"}} onChange={(e)=>setAccountName(e.target.value)}></InputText>
        <div className="label">תאריך פתיחת לקוח</div>
        <Calendar  dateFormat="dd/mm/yy" onChange={(e) => setDate(e.value)} />
        <div></div>
        <Button style={{marginTop:"20px",marginLeft:"20px"}} label="שמור" onClick={()=>{
            setAccounts(current=>[...current,{id:Number(accountId),name:accountName,startDate:date.toLocaleDateString("pt-BR")}]);
            setVisible(false);
        }}></Button>      
        <Button style={{marginTop:"20px"}} label="בטל" onClick={()=>{
            setAccountId("");
            setAccountName("");
            setDate("");
            setVisible(false);
        }}></Button>
        
    </Dialog>
    </div>
    )
}

export default Accounts;