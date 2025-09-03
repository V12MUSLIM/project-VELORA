import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Menu } from "lucide-react";
import clsx from "clsx";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import { TwitterIcon, SearchIcon, ShoppingCartIcon, Logo } from "./icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <>
      <HeroUINavbar maxWidth="xl" position="sticky">
        {/* Left Section */}
        <NavbarContent justify="start" className="gap-6">
          <NavbarBrand className="gap-3 max-w-fit">
            <Link
              className="flex justify-start items-center gap-1"
              to="/project-VELORA/"
            >
              <Logo />
              <p className="font-bold text-foreground">VELORA</p>
            </Link>
          </NavbarBrand>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-4">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className={clsx(
                    "hover:text-primary transition-colors",
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  to={`/project-VELORA${item.href}`}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        {/* Right Section */}
        <NavbarContent justify="end" className="gap-4">
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <NavbarItem>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon className="text-default-500" />
            </a>
          </NavbarItem>
          <NavbarItem>
            <Badge content="3" color="primary" size="md" placement="top-right">
              <Button
                isIconOnly
                aria-label="Shopping Cart"
                className="text-default-500"
                size="sm"
                variant="light"
                onClick={() => navigate("/project-VELORA/cart")}
              >
                <ShoppingCartIcon size={18} />
              </Button>
            </Badge>
          </NavbarItem>
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          {/* Drawer Toggle (Always visible, even on Desktop) */}
          <NavbarItem>
            <Button
              isIconOnly
              variant="light"
              onClick={() => setIsOpen(true)}
              aria-label="Menu"
            >
              <Menu />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </HeroUINavbar>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        size="sm"
        backdrop="opaque"
      >
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              {searchInput}

              {/* Twitter Link */}
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-default-500"
              >
                <TwitterIcon /> Twitter
              </a>

              {/* Nav Links */}
              {siteConfig.navMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={`/project-VELORA${item.href}`}
                  className={clsx(
                    index === 2
                      ? "text-primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "text-danger"
                      : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button fullWidth onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
