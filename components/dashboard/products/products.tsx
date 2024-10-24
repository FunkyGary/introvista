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
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useSelection } from "@/hooks/use-selection";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputAdornment from "@mui/material/InputAdornment";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFurnitureModels } from "@/hooks/use-furniture-models";

// Types for mock data structure
interface Model {
    id: string;
    modelName: string;
    number: number;
    singlePrice: number;
    sold: number;
    note: string;
}

interface MockData {
    models: Model[];
}

const mockDataTyped: MockData = mockData as MockData;

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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export function Products({
    count = 5,
    rows = [],
    page = 5,
    rowsPerPage = 5,
}: CustomersTableProps): React.JSX.Element {
    const { loadingFurnitureModels, furnitureModels } = useFurnitureModels();
    //   TODO: Add furnitures to rows

    const rowIds = React.useMemo(() => {
        return rows.map((e) => e.id);
    }, [rows]);

    const { selectAll, deselectAll, selectOne, deselectOne, selected } =
        useSelection(rowIds);

    const selectedSome =
        (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
    const selectedAll = rows.length > 0 && selected?.size === rows.length;

    const [value, setValue] = React.useState<number>(1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [age, setAge] = React.useState<string>("1");

    const handleSelectChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <Card sx={{ maxWidth: "1000px", width: "100%" }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    paddingX: "25px",
                }}
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="全部商品" {...a11yProps(1)} />
                    <Tab label="上架中商品" {...a11yProps(2)} />
                    <Tab label="未上架商品" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CardContent>
                <Box
                    sx={{
                        paddingBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <OutlinedInput
                        defaultValue=""
                        fullWidth
                        placeholder="搜尋 商品標號、商品名稱"
                        startAdornment={
                            <InputAdornment position="start">
                                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                            </InputAdornment>
                        }
                        sx={{ maxWidth: "400px" }}
                        size="small"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            paddingLeft: "20px",
                        }}
                    >
                        <InputLabel
                            sx={{ minWidth: "55px" }}
                            id="main-category"
                        >
                            主分類
                        </InputLabel>
                        <Select
                            labelId="main-category"
                            value={age}
                            onChange={handleSelectChange}
                            size="small"
                            fullWidth
                            sx={{ maxWidth: "200px", marginRight: "10px" }}
                        >
                            <MenuItem value="1">全選</MenuItem>
                            <MenuItem value="2">沙發</MenuItem>
                            <MenuItem value="3">椅子</MenuItem>
                            <MenuItem value="4">桌子</MenuItem>
                        </Select>
                        <InputLabel sx={{ minWidth: "55px" }} id="sub-category">
                            子分類
                        </InputLabel>
                        <Select
                            labelId="sub-category"
                            value={age}
                            onChange={handleSelectChange}
                            size="small"
                            fullWidth
                            sx={{ maxWidth: "200px", marginRight: "10px" }}
                        >
                            <MenuItem value="1">全選</MenuItem>
                            <MenuItem value="2">沙發</MenuItem>
                            <MenuItem value="3">椅子</MenuItem>
                            <MenuItem value="4">桌子</MenuItem>
                        </Select>
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{
                                    width: "80px",
                                    marginRight: "5px",
                                    color: "#9900FF",
                                    borderColor: "#9900FF",
                                }}
                            >
                                搜尋
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ width: "80px" }}
                            >
                                重設
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        paddingY: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body1" gutterBottom>
                        {mockDataTyped.models.length} 件商品
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ color: "#9900FF", borderColor: "#9900FF" }}
                    >
                        匯出報表
                    </Button>
                </Box>
                <Box sx={{ overflowX: "auto" }}>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                selectAll();
                                            } else {
                                                deselectAll();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>商品編號</TableCell>
                                <TableCell>商品名稱</TableCell>
                                <TableCell>已出售</TableCell>
                                <TableCell>價格</TableCell>
                                <TableCell>商品數量</TableCell>
                                <TableCell>備註</TableCell>
                                <TableCell>操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockDataTyped?.models.map((model, index) => {
                                const isSelected = selected?.has(model.id);
                                return (
                                    <TableRow hover key={index}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        selectOne(model.id);
                                                    } else {
                                                        deselectOne(model.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{model.id}</TableCell>
                                        <TableCell>{model.modelName}</TableCell>
                                        <TableCell>{model.number}</TableCell>
                                        <TableCell>
                                            {Math.floor(
                                                model.singlePrice * model.number
                                            )}
                                        </TableCell>
                                        <TableCell>{model.sold}</TableCell>
                                        <TableCell>{model.note}</TableCell>
                                        <TableCell>
                                            <ButtonGroup
                                                variant="text"
                                                size="small"
                                            >
                                                <Button
                                                    sx={{ color: "#9900FF" }}
                                                >
                                                    預覽
                                                </Button>
                                                <Button
                                                    sx={{ color: "#9900FF" }}
                                                >
                                                    編輯
                                                </Button>
                                                <Button
                                                    sx={{ color: "#9900FF" }}
                                                >
                                                    推廣
                                                </Button>
                                            </ButtonGroup>
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
            </CardContent>
        </Card>
    );
}
