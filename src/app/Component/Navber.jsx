"use client"
import { useEffect, useState } from "react";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { CiMenuFries } from "react-icons/ci";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import logo from '../../assets/logo.png'
import { RiShoppingCartLine } from "react-icons/ri";
import { cheackOutProdectData } from "@/lib/api/prodectData";
import { usePathname } from "next/navigation";
const Navber = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();
    const { name, email, image, role } = session?.user || {};
    const logOut = async () => {
        await authClient.signOut();
    }
    const pathname = usePathname();
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        if (isPending || !session?.user?.email) {
            return;
        }
        const fetchCartData = async () => {
            try {
                const data = await cheackOutProdectData(session);
                const unpaidCount = (data.orders || []).filter(o => o.paymentStatus === "unpaid").length;
                setCartCount(unpaidCount);
            } catch (error) {
                console.error("Cart fetch failed:", error);
            }
        };

        fetchCartData();
    }, [session, isPending]);
    const displayCount = (isPending || !session?.user?.email) ? 0 : cartCount;

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" >
                        <span className="sr-only">Menu</span>
                        {isMenuOpen ? (<IoMdClose />) : (<CiMenuFries />)}
                    </button>
                    <Link href={'/'}>
                    <Image src={logo} alt='logo' height={40} width={70} />
                    </Link>
                </div>
                <ul className="hidden items-center gap-4 md:flex">
                    <li><Link href="/" className={pathname === "/" ? "text-blue-600 font-bold" : "text-gray-600"}>  Home</Link></li>
                    <li> <Link href="/prodect" className={pathname === "/prodect" ? "text-blue-600 font-bold" : "text-gray-600"}> Prodect</Link></li>
                    <li>{isPending ? (<span>Dashboard</span>) : (<Link href={`/dashboard/${role}`}>Dashboard</Link>)}</li>
                </ul>
                {session?.user ? (
                    <div className=" flex gap-5 items-center">
                        {role === "buyer" && (
                            <li className="list-none relative">
                                <Link href={'/cheackOut'} className="relative inline-block">
                                    <RiShoppingCartLine className="size-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        )}
                        <Dropdown>
                            <Dropdown.Trigger className="rounded-full">
                                <Avatar>
                                    <Image src={image} alt={name} fill sizes="40px" className="rounded-full object-cover" />
                                    <Avatar.Fallback delayMs={600}>{name}</Avatar.Fallback>
                                </Avatar>
                            </Dropdown.Trigger>
                            <Dropdown.Popover>
                                <div className="px-3 pt-3 pb-1">
                                    <div className="flex items-center gap-2">
                                        <Avatar size="sm">
                                            <Avatar.Image alt={name} src={image} />
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
                                        <Link className="flex items-center gap-2" href={`/dashboard/${role}/profile`}>
                                            <FiUser className="size-3.5 text-muted" />
                                            <Label>Profile</Label>
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={logOut} id="logout" textValue="Logout" variant="danger">
                                        <IoIosLogOut className="size-3.5 text-muted" />
                                        <Label>Log Out</Label>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    </div>
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
                        <li> <Link href="/prodect" className={pathname === "/prodect" ? "text-blue-600 font-bold" : "text-gray-600"}> Prodect</Link></li>
                        <li>{isPending ? (<span>Dashboard</span>) : (<Link href={`/dashboard/${role}`}>Dashboard</Link>)}</li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navber;