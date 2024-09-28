"use client";

import * as React from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SignOut as SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { grey } from "@mui/material/colors";

import type { NavItemConfig } from "@/types/nav";
import { paths } from "@/paths";
import { isNavItemActive } from "@/lib/is-nav-item-active";
import { Logo } from "@/components/core/logo";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { navItems } from "./config";
import { navIcons } from "./nav-icons";

export function SideNav(): React.JSX.Element {
    const pathname = usePathname();
    const [age, setAge] = React.useState("10");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <Box
            sx={{
                "--SideNav-background": "#E3C9FF",
                "--SideNav-color": "var(--mui-palette-common-white)",
                "--NavItem-color": grey[800],
                "--NavItem-hover-background": "rgba(255, 255, 255, 0.04)",
                "--NavItem-active-background": "#9900FF",
                "--NavItem-active-color":
                    "var(--mui-palette-primary-contrastText)",
                "--NavItem-disabled-color": "var(--mui-palette-neutral-500)",
                "--NavItem-icon-color": grey[800],
                "--NavItem-icon-active-color":
                    "var(--mui-palette-primary-contrastText)",
                "--NavItem-icon-disabled-color":
                    "var(--mui-palette-neutral-600)",
                bgcolor: "var(--SideNav-background)",
                color: "var(--SideNav-color)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                left: 0,
                maxWidth: "100%",
                position: "fixed",
                top: 0,
                width: "var(--SideNav-width)",
                zIndex: "var(--SideNav-zIndex)",
            }}
        >
            <Stack sx={{ p: 1.6, background: "white" }}>
                <Box
                    component={RouterLink}
                    href={paths.home}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Logo color="light" height={32} width={62} />
                    <Typography color="#9900FF" variant="h4">
                        IntroVista
                    </Typography>
                </Box>
            </Stack>
            <Box component="nav" sx={{ flex: "1 1 auto", p: "12px" }}>
                {renderNavItems({ pathname, items: navItems })}
            </Box>
            <Stack sx={{ px: "15px", py: "20px" }}>
                <FormControl fullWidth>
                    <InputLabel id="lang-select-label">語言</InputLabel>
                    <Select
                        labelId="lang-select-label"
                        value={age}
                        label="語言"
                        size="small"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>中文</MenuItem>
                        <MenuItem value={20}>English</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Divider sx={{ borderColor: grey[200] }} />
            <Stack spacing={2} sx={{ px: "15px", py: "20px" }}>
                <Button
                    component="a"
                    startIcon={
                        <SignOutIcon fontSize="var(--icon-fontSize-md)" />
                    }
                    fullWidth
                    href="https://material-kit-pro-react.devias.io/"
                    target="_blank"
                    variant="outlined"
                    color="info"
                >
                    登出
                </Button>
            </Stack>
        </Box>
    );
}

function renderNavItems({
    items = [],
    pathname,
}: {
    items?: NavItemConfig[];
    pathname: string;
}): React.JSX.Element {
    const children = items.reduce(
        (
            acc: React.ReactNode[],
            curr: NavItemConfig,
            index: number
        ): React.ReactNode[] => {
            const { key, ...item } = curr;
            if (index === 0 || index === 3 || index === 7) {
                acc.push(
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Typography sx={{ color: grey[700] }} variant="body2">
                            {index === 0 && "購買清單"}
                            {index === 3 && "廠商後台"}
                            {index === 7 && "系統設定"}
                        </Typography>
                    </Box>
                );
            }

            acc.push(<NavItem key={key} pathname={pathname} {...item} />);

            return acc;
        },
        []
    );

    return (
        <Stack
            component="ul"
            spacing={1}
            sx={{ listStyle: "none", m: 0, p: 0 }}
        >
            {children}
        </Stack>
    );
}

interface NavItemProps extends Omit<NavItemConfig, "items"> {
    pathname: string;
}

function NavItem({
    disabled,
    external,
    href,
    icon,
    matcher,
    pathname,
    title,
}: NavItemProps): React.JSX.Element {
    const active = isNavItemActive({
        disabled,
        external,
        href,
        matcher,
        pathname,
    });
    const Icon = icon ? navIcons[icon] : null;
    console.log(href);
    return (
        <li>
            <Box
                {...(href
                    ? {
                          component: external ? "a" : RouterLink,
                          href,
                          target: external ? "_blank" : undefined,
                          rel: external ? "noreferrer" : undefined,
                      }
                    : { role: "button" })}
                sx={{
                    alignItems: "center",
                    borderRadius: 1,
                    color: "var(--NavItem-color)",
                    cursor: "pointer",
                    display: "flex",
                    flex: "0 0 auto",
                    gap: 1,
                    p: "8px 16px",
                    position: "relative",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    ...(disabled && {
                        bgcolor: "var(--NavItem-disabled-background)",
                        color: "var(--NavItem-disabled-color)",
                        cursor: "not-allowed",
                    }),
                    ...(active && {
                        bgcolor: "var(--NavItem-active-background)",
                        color: "var(--NavItem-active-color)",
                    }),
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        flex: "0 0 auto",
                    }}
                >
                    {Icon ? (
                        <Icon
                            fill={
                                active
                                    ? "var(--NavItem-icon-active-color)"
                                    : "var(--NavItem-icon-color)"
                            }
                            fontSize="var(--icon-fontSize-md)"
                            weight={active ? "fill" : undefined}
                        />
                    ) : null}
                </Box>
                <Box sx={{ flex: "1 1 auto" }}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "inherit",
                            fontWeight: 500,
                            lineHeight: "28px",
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </Box>
        </li>
    );
}
