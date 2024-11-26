'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import type { SxProps } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import mockData from './PriceTable.json'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Logo } from '@/components/core/logo'
import Divider from '@mui/material/Divider'

export interface CartProps {
  sx?: SxProps
}

interface CartData {
  models: Array<{
    singlePrice: number
    number: number
  }>
  materails: Array<{
    singlePrice: number
    materialAreaSize: number
  }>
}

function calculateTotalSum(data: CartData): number {
  let totalSum = 0

  // Calculate the sum for models
  data.models.forEach((model) => {
    totalSum += model.singlePrice * model.number
  })

  // Calculate the sum for materials
  data.materails.forEach((material) => {
    totalSum += material.singlePrice * material.materialAreaSize
  })

  return totalSum
}

export function Cart({ sx }: CartProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo color="light" height={32} width={62} />
          <Typography color="var(--mui-palette-neutral-950)" variant="h4">
            IntroVista 傢俱建材訂購單
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            paddingTop: '30px',
          }}
        >
          <Stack sx={{ alignItems: 'start' }} direction="column" spacing={1}>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              客戶/收件人：Amy.lin 林程美
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              統一編號：54656406
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              公司名稱：大砌誠石室內裝修有限公司
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              收件地址：新北市樹林區中山路一段306巷35號7樓
            </Typography>
          </Stack>
          <Stack sx={{ alignItems: 'end' }} direction="column" spacing={1}>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              編號：T15164165
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              電話：0915741587
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              日期：24/03/29
            </Typography>
            <Typography color="var(--mui-palette-neutral-950)" variant="body1">
              時間：19:26:30
            </Typography>
          </Stack>
        </Stack>
        <Box sx={{ overflowX: 'auto', paddingTop: '30px' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>材質名稱</TableCell>
                <TableCell>單價</TableCell>
                <TableCell>鋪設這個材質的面積(平方米)</TableCell>
                <TableCell>總價</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData?.materails.map((materail, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>{materail.materialName}</TableCell>
                    <TableCell>{materail.singlePrice}</TableCell>
                    <TableCell>{materail.materialAreaSize}</TableCell>
                    <TableCell>
                      {Math.floor(
                        materail.singlePrice * materail.materialAreaSize
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ overflowX: 'auto', paddingTop: '20px' }}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
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
                    <TableCell>{model.modelName}</TableCell>
                    <TableCell>{model.singlePrice}</TableCell>
                    <TableCell>{model.number}</TableCell>
                    <TableCell>
                      {Math.floor(model.singlePrice * model.number)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider
          sx={{
            borderColor: 'var(--mui-palette-neutral-300)',
            paddingTop: '20px',
          }}
        />
        <Stack
          direction="row"
          sx={{
            justifyContent: 'end',
            paddingTop: '10px',
          }}
        >
          <Typography color="var(--mui-palette-neutral-950)" variant="h6">
            總價： {Math.floor(calculateTotalSum(mockData))} NTD
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
