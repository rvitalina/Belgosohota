import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Select,
    MenuItem,
    Button,
    Paper,
    Box,
} from '@mui/material';

export default function PermissionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  return (
    <>
      <Paper sx={{ marginTop: 10, marginLeft: 5, padding: 2, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <TextField label="Наменование организации" variant="outlined" size="small" />
                <Select variant="outlined" size="small" defaultValue="">
                    <MenuItem value="">Ведомство</MenuItem>
                    <MenuItem value="1">Ведомство 1</MenuItem>
                    <MenuItem value="2">Ведомство 2</MenuItem>
                </Select>
                <Select variant="outlined" size="small" defaultValue="">
                    <MenuItem value="">Область</MenuItem>
                    <MenuItem value="1">Область 1</MenuItem>
                    <MenuItem value="2">Область 2</MenuItem>
                </Select>
                <Select variant="outlined" size="small" defaultValue="">
                    <MenuItem value="">Сессия Разовая</MenuItem>
                    <MenuItem value="1">Сессия 1</MenuItem>
                    <MenuItem value="2">Сессия 2</MenuItem>
                </Select>
                <TextField label="с" type="date" variant="outlined" size="small" />
                <TextField label="по" type="date" variant="outlined" size="small" />
                <Button variant="contained" sx={{backgroundColor: "#BDB76B"}}>Поиск</Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название туров</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Сессия</TableCell>
                            <TableCell>Сезон</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={0} // Общее количество записей
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
  )
}
