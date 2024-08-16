"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Bell as BellIcon } from "@phosphor-icons/react/dist/ssr/Bell";
import { CrownSimple as CrownSimpleIcon } from "@phosphor-icons/react/dist/ssr/CrownSimple";
import { MagnifyingGlass as MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr/MagnifyingGlass";
import Typography from "@mui/material/Typography";

export function MainNav(): React.JSX.Element {
    return (
        <React.Fragment>
            <Box
                component="header"
                sx={{
                    borderBottom: "1px solid var(--mui-palette-divider)",
                    backgroundColor: "var(--mui-palette-background-paper)",
                    position: "sticky",
                    top: 0,
                    zIndex: "var(--mui-zIndex-appBar)",
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        justifyContent: "end",
                        minHeight: "64px",
                        px: 2,
                    }}
                >
                    <Stack
                        sx={{ alignItems: "center" }}
                        direction="row"
                        spacing={1}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #9900FF",
                                borderRadius: "30px",
                                paddingRight: "10px",
                            }}
                        >
                            <IconButton>
                                <CrownSimpleIcon color="#9900FF" />
                            </IconButton>
                            <Typography color="#9900FF" variant="h6">
                                Premiere
                            </Typography>
                        </Box>
                        <Typography
                            color="var(--mui-palette-neutral-950)"
                            variant="h6"
                        >
                            54656406_Penny
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </React.Fragment>
    );
}
