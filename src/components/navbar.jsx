import { useNavigate, Link } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import { TwitterIcon, SearchIcon, ShoppingCartIcon, Logo } from "./icons";

export const Navbar = () => {
  const navigate = useNavigate();

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

  const mobileSearchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search products..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      size="sm"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left Section */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" to="/">
            <Logo />
            <p className="font-bold">VELORA</p>
          </Link>
        </NavbarBrand>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                to={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Desktop Right Section */}
      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="flex gap-4 items-center">
          <Link to={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Badge content="3" color="primary" size="md" placement="top-right">
            <Button
              isIconOnly
              aria-label="Shopping Cart"
              className="text-default-500"
              size="sm"
              variant="light"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon size={18} />
            </Button>
          </Badge>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex">{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Mobile Right Section */}
      <NavbarContent className="flex lg:hidden basis-1 pl-4" justify="end">
        <Badge content="3" color="primary" size="md" placement="top-right">
          <Button
            isIconOnly
            aria-label="Shopping Cart"
            className="text-default-500"
            size="sm"
            variant="light"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon size={18} />
          </Button>
        </Badge>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">{mobileSearchInput}</div>

          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                to={item.href}
                className={clsx(
                  index === 2
                    ? "text-primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "text-danger"
                    : "text-foreground"
                )}
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
