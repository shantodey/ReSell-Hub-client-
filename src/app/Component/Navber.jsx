"use client"
import { useState } from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { CiMenuFries } from "react-icons/ci";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

const Navber = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button className="md:hidden"   onClick={() => setIsMenuOpen(!isMenuOpen)}   aria-label="Toggle menu" >
                        <span className="sr-only">Menu</span>
                       
                            {isMenuOpen ? (<IoMdClose />) : ( <CiMenuFries /> )}
                       
                    </button>
                    <div>ReSell Hub</div>
                </div>
                <ul className="hidden items-center gap-4 md:flex">
                    <li><Link href="#">Home</Link></li>
                    <li><Link href="#">Prodect</Link></li>
                    <li><Link href="#">Categories</Link></li>
                    <li><Link href="#">Dashboard</Link></li>
                    <li className="bg-blue-500 text-white px-2">
                        <Link href="#">Login</Link>
                        /
                        <Link href="#">Register</Link>
                    </li>

                </ul>
                <Dropdown>
                    <Dropdown.Trigger className="rounded-full">
                        <Avatar>
                            <Avatar.Image
                                alt="Junior Garcia"
                                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                            />
                            <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                        </Avatar>
                    </Dropdown.Trigger>
                    <Dropdown.Popover>
                        <div className="px-3 pt-3 pb-1">
                            <div className="flex items-center gap-2">
                                <Avatar size="sm">
                                    <Avatar.Image
                                        alt="Jane"
                                        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                                    />
                                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                                </Avatar>
                                <div className="flex flex-col gap-0">
                                    <p className="text-sm leading-5 font-medium">Jane Doe</p>
                                    <p className="text-xs leading-none text-muted">jane@example.com</p>
                                </div>
                            </div>
                        </div>
                        <Dropdown.Menu>
                            <Dropdown.Item id="profile" textValue="Profile">
                                <FiUser className="size-3.5 text-muted" />
                                <Label>Profile</Label>
                            </Dropdown.Item>
                            <Dropdown.Item id="settings" textValue="Settings">
                                <IoSettingsOutline className="size-3.5 text-muted" />
                                <Label>Settings</Label>

                            </Dropdown.Item>
                            <Dropdown.Item id="new-project" textValue="New project">
                                <FiShoppingCart className="size-3.5 text-muted" />
                                <Label>Create Team</Label>

                            </Dropdown.Item>
                            <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                <IoIosLogOut className="size-3.5 text-muted" />
                                <Label>Log Out</Label>

                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>  <Link href="#" className="block py-2"> Features</Link> </li>
                        <li> <Link href="#" className="block py-2"> Pricing</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navber;