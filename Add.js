import * as React from "react";
import { Button } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import {makeStyles} from  "@material-ui/core/styles";
import { Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    
    paper: {
    
      marginBottom: theme.spacing(2),
      background :'rgb(40,61,74)',

      
    },
    div:{
        marginLeft:"400px",
        
    
    },
    DialogTitle:{
        color:"white"
    },
   form: {
        
        background :'rgb(40,61,74)',
        color:"white"
       },
    input:{
    padding:"20px",
    marginLeft:"20px",
    marginTop:"20px"
    },
    length:{
        width:"50%"
    }
  }));

export default function Add({open,business_code,cust_number,clear_date,buisness_year, doc_id, posting_date, document_create_date,due_in_date,invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms,invoice_id,submitAddHandler,changeHandler,handleAddClose})

{
    const classes = useStyles();
    return(
        <div component={Paper} className={classes.div}>
            <Dialog open={open} onClose={handleAddClose} className={classes.form}  fullWidth maxWidth="md" >             
               <DialogTitle className={classes.form} >Add </DialogTitle>

                
                 <DialogContent className={classes.form} >
                    <form>
                        
                        <input name="business_code" value={business_code} required onChange={changeHandler} placeholder="Business_code" className={classes.input}/>
                        
                        <input name="cust_number" value={cust_number} required onChange={changeHandler} placeholder="Cust_number" className={classes.input} />
                        
                        <input name="clear_date" value={clear_date} required onChange={changeHandler} placeholder="Clear_date" className={classes.input}/>
                    
                        <input name="buisness_year" value={buisness_year} required onChange={changeHandler} placeholder="Buisness_year" className={classes.input} />
                
                        <input name="doc_id" value={doc_id} onChange={changeHandler} required placeholder="Doc_id" className={classes.input}/>
                
                        <input name="posting_date" value={posting_date} onChange={changeHandler} required  placeholder="Posting_date" className={classes.input} />
                        
                        <input name="document_create_date" value={document_create_date} onChange={changeHandler} required placeholder="Document_create_date" className={classes.input} />
                        
                        <input name="due_in_date" value={due_in_date} onChange={changeHandler} required placeholder="Due_in_date" className={classes.input}/>
                        
                        <input name="invoice_currency" value={invoice_currency} onChange={changeHandler} required placeholder="Invoice_currency" className={classes.input} />
                    
                        <input name="document_type" value={document_type} onChange={changeHandler} required placeholder="Document_type" className={classes.input}/>
                        
                        <input name="posting_id" value={posting_id} onChange={changeHandler} required placeholder="Posting_id" className={classes.input}/>
                
                        <input name="total_open_amount" value={total_open_amount} onChange={changeHandler} required placeholder="Total_open_amount" className={classes.input}/>
                    
                        <input name="baseline_create_date" value={baseline_create_date} onChange={changeHandler} required placeholder="Baseline_create_date" className={classes.input}/>
                        
                        
                        <input name="cust_payment_terms" value={cust_payment_terms} onChange={changeHandler} required placeholder="Cust_payment_terms" className={classes.input}/>
                
                        <input name="invoice_id" value={invoice_id}  onChange={changeHandler} required placeholder="Invoice_id" className={classes.input}/>
        
                        
                    </form>
                </DialogContent>

                <DialogActions className={classes.form} >
                    <Button onClick={submitAddHandler} className={classes.form} style={{width:"50%",border:"1px solid white"}}>Add</Button>
                    <Button onClick={()=>handleAddClose(false)} className={classes.form} style={{width:"50%",border:"1px solid white"}}>Cancel</Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}

