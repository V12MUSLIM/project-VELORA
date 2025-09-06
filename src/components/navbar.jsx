import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
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
import { SearchIcon, ShoppingCartIcon, Logo } from "./icons";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Function to check if a nav item is active
  const isActiveNavItem = (href) => {
    const currentPath = location.pathname;
    const itemPath = `/project-VELORA${href}`;
    
    // Exact match for home page
    if (href === "/") {
      return currentPath === "/project-VELORA/" || currentPath === "/project-VELORA";
    }
    
    // For other pages, check if current path starts with the item path
    return currentPath.startsWith(itemPath);
  };

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

  const avatarComponent = (
    <Avatar
      src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      name="User Avatar"
      size="sm"
      isBordered
      color="primary"
      className="cursor-pointer"
      onClick={() => {
        // Add your avatar click handler here
        console.log("Avatar clicked");
      }}
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
                    isActiveNavItem(item.href)
                      ? "text-primary font-medium"
                      : "text-foreground"
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
          <NavbarItem>
            {avatarComponent}
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
          <DrawerHeader className="flex flex-col items-start gap-4 pb-6">
            <span className="text-lg font-semibold">Menu</span>
            <div className="flex items-center gap-3 w-full">
              {avatarComponent}
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-default-500">john.doe@example.com</span>
              </div>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              {searchInput}

              {/* Nav Links */}
              {siteConfig.navMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={`/project-VELORA${item.href}`}
                  className={clsx(
                    isActiveNavItem(item.href)
                      ? "text-primary font-medium"
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