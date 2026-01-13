import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Button
} from "flowbite-react";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "@tanstack/react-router";

import Logo from "../assets/mergemind-logo.png";


export default function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Navbar fluid rounded>
            <NavbarBrand href="/">
                <img src={Logo} className="mr-3 h-6 sm:h-12" alt="MergeMind Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MergeMind</span>
            </NavbarBrand>
            {user && (
                <div className="flex md:order-2">
                    <Dropdown
                        
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User avatar"
                                img={user?.photo_url || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                                rounded
                            />
                        }
                    >
                        <DropdownHeader>
                            <span className="block text-sm">{user?.name}</span>
                            <span className="block truncate text-sm font-medium">{user?.email}</span>
                        </DropdownHeader>
                        <DropdownItem>My Profile</DropdownItem>
                        <DropdownItem>My Projects</DropdownItem>
                        <DropdownItem>My Applications</DropdownItem>
                        <DropdownDivider />
                        <DropdownItem onClick={logout}>Sign out</DropdownItem>
                    </Dropdown>
                    <NavbarToggle />
                </div>
            )}
            {!user && (
                <div className="flex md:order-2 gap-4 mr-4">
                    <Button outline onClick={() => navigate({ to: "/login" })}>Sign in</Button>
                    <Button color="dark" outline onClick={() => navigate({ to: "/signup" })}>Sign up</Button>
                </div>
            )}
            <NavbarCollapse>
                <NavbarLink href="" onClick={() => navigate({ to: '/' })}>
                    Home
                </NavbarLink>
                {user && (
                    <NavbarCollapse>
                        <NavbarLink href="" onClick={() => navigate({ to: '/explore' })}>Explore</NavbarLink>
                        <NavbarLink href="" onClick={() => navigate({ to: '/projects' })}>Projects</NavbarLink>
                    </NavbarCollapse>
                )}
            </NavbarCollapse>
        </Navbar>
    );
}