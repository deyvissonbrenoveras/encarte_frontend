// import React from 'react';
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Avatar,
//   Typography,
// } from '@material-ui/core';

// function CustomTable() {
//   return <div />;
// }

// export default CustomTable;
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search } from '@material-ui/icons';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { useStyles, useToolbarStyles } from './styles';

import slugify from '../../util/slugify';

function descendingComparator(a, b, orderBy) {
  const bValue = b[orderBy] && b[orderBy].label ? b[orderBy].label : b[orderBy];
  const aValue = a[orderBy] && a[orderBy].label ? a[orderBy].label : a[orderBy];

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
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

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    dense,
    selectionEnabled,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {selectionEnabled && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
        )}

        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {dense && headCell.type === 'image' ? '' : headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.instanceOf(Object),
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.instanceOf(Array).isRequired,
  dense: PropTypes.bool.isRequired,
  selectionEnabled: PropTypes.bool.isRequired,
};

EnhancedTableHead.defaultProps = {
  classes: {},
};

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, label, actionLabel, actionCallback } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionado(s)
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {label}
        </Typography>
      )}

      {numSelected > 0 && (
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={() => {
            actionCallback();
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  actionLabel: PropTypes.string.isRequired,
  actionCallback: PropTypes.func.isRequired,
};

export default function EnhancedTable({
  label,
  headCells,
  rows,
  actionLabel,
  actionCallback,
  selectionEnabled,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchResult, setSearchResult] = React.useState(null);

  function handleSearch(e) {
    if (e.target.value.length === 0) {
      setSearchResult(null);
    } else {
      const searchValue = slugify(e.target.value).toUpperCase();
      const items = rows.filter((row) => {
        const result = Object.entries(row).filter((prop) => {
          if (typeof prop[1] === 'object') {
            const objectArray = Object.entries(prop[1])[1];
            const match = objectArray.filter((obj) => {
              return slugify(obj).toUpperCase().includes(searchValue);
            });
            if (match.length > 0) {
              return true;
            }
          } else if (typeof prop[1] === 'string') {
            return slugify(prop[1]).toUpperCase().includes(searchValue);
          } else if (typeof prop[1] === 'number') {
            return prop[1] === Number(searchValue);
          }
          return false;
        });
        return result.length > 0;
      });
      setSearchResult(items);
    }
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          label={label}
          actionLabel={actionLabel}
          actionCallback={() => {
            actionCallback(selected);
          }}
        />
        <TextField
          onChange={handleSearch}
          className={classes.searchInput}
          label="Buscar"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              dense={dense}
              selectionEnabled={selectionEnabled}
            />
            <TableBody>
              {stableSort(
                searchResult !== null ? searchResult : rows,
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        selectionEnabled && handleClick(event, row.id)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {selectionEnabled && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      )}

                      {/* <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell> */}
                      {headCells.map((headCell) => {
                        if (headCell.type === 'image') {
                          return (
                            <TableCell align="left" key={headCell.id}>
                              {!dense && (
                                <Avatar
                                  src={row[headCell.id].src}
                                  alt={row[headCell.id].alt}
                                />
                              )}
                            </TableCell>
                          );
                        }
                        if (headCell.type === 'bool') {
                          return (
                            <TableCell align="left" key={headCell.id}>
                              {row[headCell.id] ? (
                                <FaCheckSquare color="#4d88ff" />
                              ) : (
                                <FaSquare color="#dbdbdb" />
                              )}
                            </TableCell>
                          );
                        }
                        if (headCell.type === 'link') {
                          return (
                            <TableCell align="left" key={headCell.id}>
                              <Link to={row[headCell.id].href}>
                                {row[headCell.id].label}
                              </Link>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell align="left" key={headCell.id}>
                            {row[headCell.id]}
                          </TableCell>
                        );
                      })}
                      {/* <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Diminuir espaçamento"
      />
    </div>
  );
}

EnhancedTable.propTypes = {
  label: PropTypes.string.isRequired,
  headCells: PropTypes.instanceOf(Array).isRequired,
  rows: PropTypes.instanceOf(Array),
  actionLabel: PropTypes.string,
  actionCallback: PropTypes.func,
  selectionEnabled: PropTypes.bool,
};

EnhancedTable.defaultProps = {
  actionLabel: '',
  actionCallback: () => {},
  rows: [],
  selectionEnabled: false,
};
