import { TabView, TabPanel } from 'primereact/tabview';
import React from "react";
import Accounts from '../accounts/accounts';
import Inovices from '../inovices/inovices';
const Dashboard = ({}) =>{
    return (
       
            <TabView style={{marginTop:"80px"}} >
                <TabPanel  header="חשבונות"><Accounts/></TabPanel >
                <TabPanel  header="חשבוניות"><Inovices/></TabPanel >
            </TabView>
       
    );
}

export default Dashboard;