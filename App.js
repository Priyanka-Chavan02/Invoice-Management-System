import  {  addInvoice, deleteInvoice, getData, updateInvoice } from './dataFetch';
import React, {useState,useEffect} from "react";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@material-ui/core";
import ABC from './Logos/ABC.png';
import highradius from './Logos/highradius.png';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import {makeStyles} from  "@material-ui/core/styles";
import Edit from "./Edit";
import { Checkbox, Pagination } from "@mui/material";
import Add from "./Add";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core";
import ReplayIcon from '@mui/icons-material/Replay';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


//Grid Reloading Button
function refreshPage() {
  window.location.reload(false);
}

//Styling code for TableCell padding
const theme = createMuiTheme({
  overrides: {
      MuiTableCell: {
          root: {  
             padding:"5px 5px",
  
          },
        },
      
  },
});

//Styling for table 
const useStyles = makeStyles((theme) => ({
 
 table: {
      width:"2080px",
      background :'rgb(40,61,74)',
     },
 
  
}));

//Server Side Pagination

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }} >
      <IconButton style={{color:"white"}}
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton style={{color:"white"}}
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton style={{color:"white"}}
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton style={{color:"white"}}
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



//Main function App

function App() {

const classes = useStyles();
const [tableData, setTableData] = useState([]);
const [winter,setWinter]=useState({business_code:'',cust_number:'',clear_date:'',buisness_year:'',doc_id:'',posting_date:'',
document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:''});
const [open,setOpen]=useState(false);
const [openAdd,setOpenAdd]=useState(false);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);


//Object Destructuring
const{sl_no,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id}=winter;


//Pagination Part

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
 

//for Add
const addHandler=()=>{
  setOpenAdd(true);
}

//Adding data on submitting
const submitAddHandler=async(e)=>{
  e.preventDefault();
 let response=await addInvoice(winter);
  if(response){
    setWinter({business_code:'',cust_number:'',clear_date:'',buisness_year:'',doc_id:'',posting_date:'',document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:''})

  }
}

//After adding records when we click on cancel button add interface will close
const handleAddClose=async(add)=>{
  if(add){
    let response=await addInvoice(winter);
  }
  setOpenAdd(false);
}


//Edit Button

//After clicking on edit button edit interface will open
const editHandler=()=>{
  setOpen(true);
}

//After clicking on checkbox of certain sl_no data of that sl_no will be visible and we can update it accordingly
const checkHandler=(e,sl_no)=>{
  if(e.target.checked){
    let updateInvoice=tableData.filter(winter=>winter.sl_no==sl_no)[0];
    setWinter(updateInvoice);
  }
}

//This allows us to change our data.
const changeHandler=(e)=>{
  const{name,value}=e.target;
  setWinter({...winter,[name]:value});
}

/*After clicking on checkbox of certain sl_no data of that sl_no will be visible 
and we can update it accordingly and on submitting our data will update on interface as well as in database.*/

const submitHandler=async(e)=>{
  e.preventDefault();
  let response=await updateInvoice(winter);
  if(response){
    setWinter({business_code:'',cust_number:'',clear_date:'',buisness_year:'',doc_id:'',posting_date:'',document_create_date:'',due_in_date:'',invoice_currency:'',document_type:'',posting_id:'',total_open_amount:'',baseline_create_date:'',cust_payment_terms:'',invoice_id:''})

  }
}

//closing the edit tabe after updating the values
const handleClose=async(update)=>{
  if(update){
    let response=await updateInvoice(winter);
  }
  setOpen(false);
};


//Delete Button

//deleting records
const deleteHandler=async()=>{
  if(window.confirm('Are you sure you want to delete these record[s]?')){
  let response=await deleteInvoice(winter.sl_no);
  }
}

useEffect(async function () {
 setTableData(await getData());

},[]); 



const buttons1 = [
  <Button key="one" style={{ color: "white",width:"200px"}}>Predict</Button>,
  <Button key="two" style={{ color: "white" ,width:"200px"}}>Analytics View</Button>,
  <Button key="three" style={{ color: "white" ,width:"200px"}}>Advance Search</Button>,
  <Button onClick={refreshPage}><ReplayIcon /></Button>
];

const buttons2 = [
  <Button key="four" style={{ color: "white" ,width:"200px"}} onClick={addHandler} >Add</Button>,
  <Button key="five" style={{ color: "white" ,width:"200px",borderTopColor:"black",borderBottomColor:"black"}} onClick={editHandler}>Edit</Button>,
  <Button key="six"style={{ color: "white",width:"200px" }} onClick={()=>deleteHandler()}  >Delete</Button>, 
];


return(
      <>

 <Add   open={openAdd} business_code={business_code} cust_number={cust_number} clear_date={clear_date} buisness_year={buisness_year} doc_id={doc_id} posting_date={posting_date} document_create_date={document_create_date} due_in_date={due_in_date} invoice_currency={invoice_currency}
    document_type={document_type} posting_id={posting_id} total_open_amount={total_open_amount} baseline_create_date={baseline_create_date} cust_payment_terms={cust_payment_terms} invoice_id={invoice_id} changeHandler={changeHandler}  submitAddHandler={submitAddHandler}  handleAddClose={handleAddClose}/>
      
 <Edit  open={open} invoice_currency={invoice_currency} cust_payment_terms={cust_payment_terms}  changeHandler={changeHandler} submitHandler={submitHandler} handleClose={handleClose}/>
      
     <br />
     <img src={ABC} />
     <img src={highradius} style={{height:"50px",marginLeft:"250px"}}/>
     <br/>
 
 <Box
     sx={{
     display: 'flex',flexDirection: 'column',alignItems: 'center', '& > *': { m: 1, }, }} >
 </Box>

<div style={{ background :'rgb(40,61,74)',marginTop:"40px"}}>
        
<ButtonGroup  aria-label="medium secondary button group" style={{marginTop:"25px"}}>
        {buttons1}
 <div>
  <form style={{marginLeft:"40px"}}>
      <input type="search" style={{height:"40px",borderRadius:"10px",width:"200px"}} placeholder=" Search Customer Id"></input>
  </form>
 </div>

</ButtonGroup>
<ButtonGroup style={{float:'right',marginTop:'25px'}} aria-label="medium secondary button group">
        {buttons2}
</ButtonGroup>


<ThemeProvider theme={theme}>
   <TableContainer style={{ color: "white" }}>
      <Table className={classes.table} >
        <TableHead>
           <TableRow 
                key={winter.sl_no}
                sx={{'&:last-child td,&:last-child th':{border:0}}}
                  >
                    <TableCell ><Checkbox style={{ color: "white"}} /> </TableCell> 
                    <TableCell style={{ color: "white"}}>Sl no</TableCell>
                    <TableCell style={{ color: "white" }} >Bussiness Code</TableCell>
                    <TableCell style={{ color: "white" }}>Customer Number</TableCell>
                    <TableCell style={{ color: "white" }}>Clear Date</TableCell>
                    <TableCell style={{ color: "white" }}>Bussiness Year</TableCell>
                    <TableCell style={{ color: "white" }}>Document Id</TableCell>
                    <TableCell style={{ color: "white" }}>Posting Date</TableCell>
                    <TableCell style={{ color: "white" }}>Document Create Date</TableCell>
                    <TableCell style={{ color: "white" }}>Due Date</TableCell>
                    <TableCell style={{ color: "white" }}>Invoice Currency</TableCell>
                    <TableCell style={{ color: "white" }}>Document Type</TableCell>
                    <TableCell style={{ color: "white" }}>Posting Id</TableCell>
                    <TableCell style={{ color: "white" }}>Total Open Amount</TableCell>
                    <TableCell style={{ color: "white" }}>Baseline Create Date</TableCell>
                    <TableCell style={{ color: "white" }}>Customer Payment Terms</TableCell>
                    <TableCell style={{ color: "white" }}>Invoice Id</TableCell>
            </TableRow>
        </TableHead>
        <TableBody >
                    {(rowsPerPage > 0
                          ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : tableData
                        ).map((winter) => (
             <TableRow 
                         
                         key={winter.sl_no}
                         sx={{'&:last-child td,&:last-child th':{border:0}}}

                         >
                     <TableCell component="th" scope="sl_no" style={{alignContent:"center"}}>
                           <Checkbox onClick={(e)=>checkHandler(e,winter.sl_no)} style={{ color: "white" ,padding:"0px",margin:"0px"}}/>
                     </TableCell>
                           
                     <TableCell style={{ color: "white"}} component="th" scope="winter" >
                           {winter.sl_no}
                     </TableCell>
                       
                      <TableCell style={{ color: "white"}} component="th" scope="winter"  >
                           {winter.business_code}
                      </TableCell>
                      <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.cust_number}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.clear_date}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.buisness_year}
                       </TableCell>
                       <TableCell style={{ color: "white"}}  component="th" scope="winter">
                           {winter.doc_id}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.posting_date}
                       </TableCell>
                       <TableCell style={{ color: "white" }} component="th" scope="winter">
                           {winter.document_create_date}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.due_in_date}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.invoice_currency}
                       </TableCell>
                       <TableCell  style={{ color: "white"}}  component="th" scope="winter">
                           {winter.document_type}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.posting_id}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.total_open_amount}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.baseline_create_date}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.cust_payment_terms}
                       </TableCell>
                       <TableCell style={{ color: "white"}} component="th" scope="winter">
                           {winter.invoice_id}
                       </TableCell>

            </TableRow>
               ))}
               {
                 emptyRows>0 &&(
                   <TableRow style={{height:53*emptyRows}}>
                     <TableCell colSpan={6}/>
                   </TableRow>
                 )
               }
       </TableBody>
     </Table>
  </TableContainer>
   
  <TableFooter>
  <TableRow>
  <TablePagination  style={{color:"white"}}

  rowsPerPageOptions={[10, 20, 30]} 
  colSpan={3}
  count={tableData.length}
  rowsPerPage={rowsPerPage}
  page={page}
  SelectProps={{
    inputProps: {
      'aria-label': 'rows per page',
    },
    native: true,
  }}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  ActionsComponent={TablePaginationActions}
  />
  </TableRow>
  </TableFooter>

</ThemeProvider>
</div>   


   <div style={{
     marginLeft:"600px",
     color:"white",
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',}}>
 <a href="#" style={{color:"blue"}} >Privacy Policy</a>|&nbsp;<CopyrightIcon  /> &nbsp;2022 HighRadius Corporation.All rights are reserved.
 </div>
 </>

   );  
}



export default App;