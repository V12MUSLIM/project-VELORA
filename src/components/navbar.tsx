import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, SearchIcon, ShoppingCartIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left Section */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-white">
              VELORA
            </p>
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation Links (visible on desktop) */}
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                aria-current={
                  typeof window !== "undefined" &&
                  window.location.pathname === item.href
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Desktop Right Section (visible on desktop) */}
      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-4 items-center">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Badge content="3" color="primary" size="md" placement="top-right">
            <Button
              isIconOnly
              aria-label="Shopping Cart"
              className="text-default-500"
              size="sm"
              variant="light"
            >
              <ShoppingCartIcon size={18} />
            </Button>
          </Badge>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Mobile & Tablet Right Section (visible on mobile and tablet) */}
      <NavbarContent className="flex lg:hidden basis-1 pl-4" justify="end">
        <Badge content="3" color="primary" size="md" placement="top-right">
          <Button
            isIconOnly
            aria-label="Shopping Cart"
            className="text-default-500"
            size="sm"
            variant="light"
          >
            <ShoppingCartIcon size={18} />
          </Button>
        </Badge>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu (for mobile and tablet) */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href || "#"}
                size="lg"
                aria-current={
                  typeof window !== "undefined" &&
                  window.location.pathname === item.href
                    ? "page"
                    : undefined
                }
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};