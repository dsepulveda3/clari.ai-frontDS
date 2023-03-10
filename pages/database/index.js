import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { database, count } from '../../API/questions';

// function createData(question, answer, like, dislike, feedback, prompt) {
//     return {
//         question,
//         answer,
//         like,
//         dislike,
//         feedback,
//         prompt
//     };
// }

const null_feedback = "No feedback"
const null_valuation = "No valuation"
const null_useful = "No useful insight"
const prompt = "If this is a math or physics exercise explain how to solve it theoretically, give me an example and then solve the example and the question step by step. Otherwise, if it is a conceptual question explain in simple terms, detailed, first defining difficult concepts that will be used in the explanation."

// const rows = [
//     createData('Question 1', 'Answer 1', 'Like 1', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 2', 'Answer 2', 'Like 2', 'Dislike 2', 'Feedback 1', 'Propmt 1'),
//     createData('Question 3', 'Answer 3', 'Like 3', 'Dislike 3', 'Feedback 1', 'Propmt 1'),
//     createData('Question 4', 'Answer 4', 'Like 4', 'Dislike 4', 'Feedback 1', 'Propmt 1'),
//     createData('Question 5', 'Answer 5', 'Like 5', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 6', 'Answer 6', 'Like 6', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 7', 'Answer 7', 'Like 7', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 8', 'Answer 8', 'Like 8', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 9', 'Answer 9', 'Like 9', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 10', 'Answer 10', 'Like 10', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 11', 'Answer 11', 'Like 11', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 12', 'Answer 12', 'Like 12', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 13', 'Answer 13', 'Like 13', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
//     createData('Question 14', 'Answer 14', 'Like 14', 'Dislike 1', 'Feedback 1', 'Propmt 1'),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'question',
        numeric: false,
        disablePadding: true,
        label: 'Question',
    },
    {
        id: 'answer',
        numeric: true,
        disablePadding: false,
        label: 'Answer',
    },
    {
        id: 'like',
        numeric: true,
        disablePadding: false,
        label: 'Like',
    },
    {
        id: 'dislike',
        numeric: true,
        disablePadding: false,
        label: 'Dislike',
    },
    {
        id: 'feedback',
        numeric: true,
        disablePadding: false,
        label: 'Feedback',
    },
    {
        id: 'prompt',
        numeric: true,
        disablePadding: false,
        label: 'Prompt',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Creation Date',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Database
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [total, setTotal] = React.useState(0);

    const fetchRows = async (page, entries) => {
        const data = await database(page, entries);
        data.data.map((row) => {
            if (row.feedback != null) {
                const feedback_use = row.feedback.feedback;
                row.feedback = feedback_use;
            } else {
                row.feedback = null_feedback;
            }
            if (row.valuation != null) {
                if (row.valuation.is_positive) {
                    row.like = "True";
                    row.dislike = "False";
                } else {
                    row.like = "False";
                    row.dislike = "True";
                }
            } else {
                row.like = null_valuation;
                row.dislike = null_valuation;
            }
        })
        setRows(data.data);
    }

    const totalCount = async () => {
        const total = await count();
        setTotal(total.data.count);
    }


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.question);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, question) => {
        const selectedIndex = selected.indexOf(question);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, question);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
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

    React.useEffect(() => {
        totalCount()
    }, []);

    React.useEffect(() => {
        fetchRows(page + 1, rowsPerPage)
    }, [page, rowsPerPage]);

    const isSelected = (question) => selected.indexOf(question) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={total}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.content);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.content)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.question}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.content}
                                            </TableCell>
                                            <TableCell align="right">{row.answer}</TableCell>
                                            <TableCell align="right">{row.like}</TableCell>
                                            <TableCell align="right">{row.dislike}</TableCell>
                                            <TableCell align="right">{row.feedback}</TableCell>
                                            <TableCell align="right">{prompt}</TableCell>
                                            <TableCell align="right">{row.created_at}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}