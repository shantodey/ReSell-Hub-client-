"use client"
import { useState } from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { CiMenuFries } from "react-icons/ci";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

const Navber = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const { name, email, image, role } = session?.user || {};
    const logOut = async () => {
        await authClient.signOut();
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" >
                        <span className="sr-only">Menu</span>
                        {isMenuOpen ? (<IoMdClose />) : (<CiMenuFries />)}
                    </button>
                    <div>ReSell Hub</div>
                </div>
                <ul className="hidden items-center gap-4 md:flex">
                    <li><Link href={'/'}>Home</Link></li>
                    <li><Link href={'/prodect'}>Prodect</Link></li>
                    <li><Link href="#">Categories</Link></li>
                    <li>{isPending ? (<span>Dashboard</span>) : (<Link href={`/dashboard/${role}`}>Dashboard</Link>)}</li>
                </ul>
                {session?.user ? (
                    <Dropdown>
                        <Dropdown.Trigger className="rounded-full">
                            <Avatar>
                                    <Image src={image} alt={name}  fill  sizes="40px"  className="rounded-full object-cover"/>
                                <Avatar.Fallback delayMs={600}>{name}</Avatar.Fallback>
                            </Avatar>
                        </Dropdown.Trigger>
                        <Dropdown.Popover>
                            <div className="px-3 pt-3 pb-1">
                                <div className="flex items-center gap-2">
                                    <Avatar size="sm">
                                        <Avatar.Image
                                            alt={name}
                                            src={image}
                                        />
                                        <Avatar.Fallback delayMs={600}>{name}</Avatar.Fallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-0">
                                        <p className="text-sm leading-5 font-medium">{name}</p>
                                        <p className="text-xs leading-none text-muted">{email}</p>
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
                                <Dropdown.Item onClick={logOut} id="logout" textValue="Logout" variant="danger">
                                    <IoIosLogOut className="size-3.5 text-muted" />
                                    <Label>Log Out</Label>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                ) : <ul>
                    <li className="bg-blue-500 text-white px-2">
                        <Link href={'/login'}>Login</Link>
                        /
                        <Link href={'/signup'}>Register</Link>
                    </li>
                </ul>
                }
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