import React from 'react';
import PropTypes from 'prop-types';
import {  makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Button } from '@material-ui/core';
import Chip from '@mui/material/Chip';
import {convertDate} from '../../misc/helpers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FF9800',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  


function descendingComparator(a, b, orderBy) {
if (b[orderBy]

< a[orderBy]) { return -1; } if (b[orderBy]> a[orderBy]) {
  return 1;
  }
  return 0;
  }

  function getComparator(order, orderBy) {
  return order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
  const order = comparator(a[0], b[0]);
  if (order !== 0) return order;
  return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
  { id: 'period', numeric: false, disablePadding: false, label: 'Period' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'aptnum', numeric: false, disablePadding: false, label: 'Apartment' },
  { id: 'amt', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'dueat', numeric: false, disablePadding: false, label: 'Due At' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' },

  ];

  function EnhancedTableHead(props) {
  const { classes,  order, orderBy,   onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
  onRequestSort(event, property);
  };

  return (
  <TableHead>
    <TableRow>

      {headCells.map((headCell) => (
      <StyledTableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left' } padding={headCell.disablePadding ? 'none' : 'normal' } sortDirection={orderBy===headCell.id ? order : false}>
        <TableSortLabel active={orderBy===headCell.id} direction={orderBy===headCell.id ? order : 'asc' } onClick={createSortHandler(headCell.id)}>
          {headCell.label}
          {orderBy === headCell.id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
          ) : null}
        </TableSortLabel>
      </StyledTableCell>
      ))}
    </TableRow>
  </TableHead>
  );
  }

  EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  };

  

  const useStyles = makeStyles((theme) => ({
  root: {
  width: '100%',
  },
  paper: {
  width: '100%',
  marginBottom: theme.spacing(2),
  },
  table: {
  minWidth: 750,
  },
  visuallyHidden: {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
  },
  }));

  export default function PendingPayments({...props}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows =props.payments;
  const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
  };

  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
  };




  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {

            return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>

              <TableCell align="left">{row.period}</TableCell>
              <TableCell align="left">{row.category.capitalize()}</TableCell>
              <TableCell align="left">{row.aptnum}</TableCell>              
              <TableCell align="left"> &#8377; {row.amt.toLocaleString('en-IN')}</TableCell>
              <TableCell align="left">{convertDate(row.dueat)}</TableCell>
              <TableCell align="left">
                <Chip label={row.status.capitalize()} color={row.status==='due'?'primary':'secondary'} />
</TableCell>
              <TableCell align="left">
                 <Button href="#text-buttons" onClick={()=>console.log(row._id)} color="primary">send reminder</Button> 
              </TableCell> 

              

            </TableRow>
            );
            })}
            {emptyRows > 0 && (
            <TableRow style={{ height:33 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>

  </div>
  );
  }