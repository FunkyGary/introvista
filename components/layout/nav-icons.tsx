import type { Icon } from "@phosphor-icons/react/dist/lib/types";
import { ChartPie as ChartPieIcon } from "@phosphor-icons/react/dist/ssr/ChartPie";
import { GearSix as GearSixIcon } from "@phosphor-icons/react/dist/ssr/GearSix";
import { PlugsConnected as PlugsConnectedIcon } from "@phosphor-icons/react/dist/ssr/PlugsConnected";
import { User as UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { Users as UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import { XSquare } from "@phosphor-icons/react/dist/ssr/XSquare";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr/ShoppingCart";
import { BagSimple } from "@phosphor-icons/react/dist/ssr/BagSimple";
import { Files } from "@phosphor-icons/react/dist/ssr/Files";
import { Star } from "@phosphor-icons/react/dist/ssr/Star";
import { BoxArrowUp } from "@phosphor-icons/react/dist/ssr/BoxArrowUp";

export const navIcons = {
    "chart-pie": ChartPieIcon,
    "gear-six": GearSixIcon,
    "plugs-connected": PlugsConnectedIcon,
    "x-square": XSquare,
    user: UserIcon,
    users: UsersIcon,
    shoppingCart: ShoppingCart,
    bagSimple: BagSimple,
    fileText: Files,
    star: Star,
    boxArrowUp: BoxArrowUp,
} as Record<string, Icon>;
