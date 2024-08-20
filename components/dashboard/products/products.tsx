"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import mockData from "./PriceTable.json";

import { useSelection } from "@/hooks/use-selection";

function noop(): void {
    // do nothing
}

export interface Customer {
    id: string;
    avatar: string;
    name: string;
    email: string;
    address: { city: string; state: string; country: string; street: string };
    phone: string;
    createdAt: Date;
}

interface CustomersTableProps {
    count?: number;
    page?: number;
    rows?: Customer[];
    rowsPerPage?: number;
}

export function Products({
    count = 0,
    rows = [],
    page = 0,
    rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
    // const rowIds = React.useMemo(() => {
    //     return rows.map((customer) => customer.id);
    // }, [rows]);

    // const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    //     useSelection(rowIds);

    // const selectedSome =
    //     (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
    // const selectedAll = rows.length > 0 && selected?.size === rows.length;

    return (
        <Card>
            <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                // checked={selectedAll}
                                // indeterminate={selectedSome}
                                // onChange={(event) => {
                                //     if (event.target.checked) {
                                //         selectAll();
                                //     } else {
                                //         deselectAll();
                                //     }
                                // }}
                                />
                            </TableCell>
                            <TableCell>傢俱名稱</TableCell>
                            <TableCell>單價</TableCell>
                            <TableCell>該品項家具的數量</TableCell>
                            <TableCell>總價</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockData?.models.map((model, index) => {
                            return (
                                <TableRow hover key={index}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        // checked={isSelected}
                                        // onChange={(event) => {
                                        //     if (event.target.checked) {
                                        //         selectOne(model.modelName);
                                        //     } else {
                                        //         deselectOne(
                                        //             model.modelName
                                        //         );
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>{model.modelName}</TableCell>
                                    <TableCell>{model.singlePrice}</TableCell>
                                    <TableCell>{model.number}</TableCell>
                                    <TableCell>
                                        {Math.floor(
                                            model.singlePrice * model.number
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            <TablePagination
                component="div"
                count={count}
                onPageChange={noop}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}
