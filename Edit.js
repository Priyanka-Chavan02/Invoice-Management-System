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
     },
     textField:{
         border:"1px solid white",
     }
   }));


export default function Edit({open,sl_no,invoice_currency,cust_payment_terms,changeHandler,submitHandler,handleClose})

{
    const classes = useStyles();

    return(
        <div component={Paper} className={classes.div} >
            <Dialog open={open} onClose={handleClose} className={classes.form}>
                <DialogTitle className={classes.form}>Edit</DialogTitle>
                <DialogContent className={classes.form}>
                <form>
                        
                        <input name="invoice_currency" value={invoice_currency}  autoFocus required onChange={changeHandler} placeholder="invoice_currency" className={classes.input}/>
                        
                        <input name="cust_payment_terms" value={cust_payment_terms}  autofocus id="cust_payment_terms" required onChange={changeHandler} placeholder="cust_payment_terms" className={classes.input} />
                </form>
                </DialogContent>
                <DialogActions className={classes.form}>
                
                    <Button onclick={submitHandler} style={{width:"50%",border:"1px solid white"}} className={classes.form}>Edit</Button>
                    <Button onClick={()=>handleClose(false)} style={{width:"50%",border:"1px solid white"}} className={classes.form}>Cancel</Button>
                   
                </DialogActions>
            </Dialog>
        </div>
    );
}
