
import axios from "axios";
export  const getData=async()=>{
   let response = await axios.get("http://localhost:8081/WinterProject/DataLoading");
   let data=response.data.winter;
   data.map((winter,index)=>({...winter,"id":index}));
    return data;
}


export const addInvoice =async({business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,
    document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id})=>{
        let data="business_code="+business_code+"&cust_number="+cust_number+"&clear_date="+clear_date+"&buisness_year="+buisness_year+"&doc_id="+doc_id+
        "&posting_date="+posting_date+"&document_create_date="+document_create_date+"&due_in_date="+due_in_date+"&invoice_currency="+invoice_currency+"&document_type="+document_type+
        "&posting_id="+posting_id+"&total_open_amount="+total_open_amount+"&baseline_create_date="+baseline_create_date+"&cust_payment_terms="+cust_payment_terms+"&invoice_id="+invoice_id;
       let response=await axios.get("http://localhost:8081/WinterProject/Add?"+data);
       return response.data;
}

export const updateInvoice =async({sl_no,invoice_currency,cust_payment_terms})=>{
         let data= "&invoice_currency="+invoice_currency+"&cust_payment_terms="+cust_payment_terms;
         let response=await axios.get("http://localhost:8081/WinterProject/Update?"+data);
         return response.data;
 }

export const deleteInvoice=async(sl_no)=>{
    let data="sl_no="+sl_no;
    let response=await axios.get("http://localhost:8081/WinterProject/Delete?"+data);
    return response.data;
} 