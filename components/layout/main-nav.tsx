"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { CrownSimple as CrownSimpleIcon } from "@phosphor-icons/react/dist/ssr/CrownSimple";
import Typography from "@mui/material/Typography";
import { useUser } from "@/hooks/use-user";

export function MainNav(): React.JSX.Element {
  const session = useUser();

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
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
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
              <Typography color="#9900FF" variant="body1">
                Premiere
              </Typography>
            </Box>

            {session.user && (
              <Typography
                color="var(--mui-palette-neutral-950)"
                variant="body1"
              >
                {session.user.name}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
