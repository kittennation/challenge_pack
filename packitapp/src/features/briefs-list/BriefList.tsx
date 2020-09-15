import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, IconButton } from '@material-ui/core'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import './BriefList.scss'

import { Brief } from '../../redux/modules/brief'
import { Props } from './BriefListContainer'
import { Product } from '../../redux/modules/product'

interface PaginationProps {
    count: number,
    page: number,
    rowsPerPage: number,
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newpage: number) => void
}

const TablePaginationActions = (props : PaginationProps) => {
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, 0)
    };

    const handleBackButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, page-1)
    };

    const handleNextButtonClick = (event : React.MouseEvent<HTMLButtonElement>)=> {
        onChangePage(event, page+1)
    };

    const handleLastPageButtonClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        onChangePage(event, Math.max(0, Math.ceil(count/rowsPerPage) - 1))
    }

    return <div>
        <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
        ><FirstPage/></IconButton>
        <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
        ><KeyboardArrowLeft/></IconButton>
        <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
        ><KeyboardArrowRight/></IconButton>
        <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
        ><LastPage/></IconButton>
    </div>
}

interface FiltersProps {
    products: Product[],
    filter: number,
    setFilter: Function
}

const Filters = (props: FiltersProps) => {
    return <FormControl style={{width: '100%'}}>
        <InputLabel id="filter_select_label">Filter by</InputLabel>
        <Select
            labelId="filter_select_label"
            id="filter_select"
            value={props.filter}
            onChange={(e)=>{props.setFilter(e.target.value)}}
        >
            <MenuItem value={-1}>All</MenuItem>
            {props.products.map(product => (
                <MenuItem value={product.id}>{product.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
}


const BriefList = (props:Props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.briefs.length - page * rowsPerPage);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    useEffect(()=>{
        Axios.get('http://localhost:3001/briefs?_expand=product')
        .then((res)=>{
            props.hydrateBrief(res.data)
        })
        .catch((err)=>{
            console.log("ERROR", err)
        })
    }, []);

    return <div id="brief_list">
        <div id="brief_filters">&nbsp;</div>
        <div id="brief_content_list">
            <TableContainer>
                <Table aria-label="Briefs List" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" style={{width: '150px'}}>
                                <Filters 
                                    products={props.products} 
                                    filter={props.filter}
                                    setFilter={props.setFilter}    
                                />
                            </TableCell>
                            <TablePagination
                                rowsPerPageOptions={[5,10,50, {label: 'All', value: props.briefs.length}]}
                                colSpan={6}
                                count={props.briefs.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {'aria-label': 'rows per page'},
                                    native: true
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0 
                            ? props.briefs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.briefs
                        ).map((brief) => (
                            <TableRow key={brief.id} style={{ height: 53 }}>
                                <TableCell component="th" scope="row">
                                    {brief.title}
                                </TableCell>
                                <TableCell align="right">
                                    {brief.comment}
                                </TableCell>
                                <TableCell align="right">
                                    {brief.product ? brief.product.name : ""}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height : 53*emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
}

export default BriefList