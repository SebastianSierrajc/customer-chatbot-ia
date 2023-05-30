'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

const Menu = () => {
    const pathname = usePathname();
    const tabSelectedClass = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
    const tabNormalClas = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"

    return (
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
                <Link
                    href="/"
                    className={pathname === "/" ? tabSelectedClass : tabNormalClas}
                    aria-current="page"
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href="/products"
                    className={pathname === "/products" ? tabSelectedClass : tabNormalClas}
                >
                    Productos
                </Link>
            </li>
            <li>
                <Link
                    href="/orders"
                    className={pathname === "/orders" ? tabSelectedClass : tabNormalClas}
                >
                    Ordenes
                </Link>
            </li>
            <li>
                <Link
                    href="/chat"
                    className={pathname === "/chat" ? tabSelectedClass : tabNormalClas}
                >
                    Chat
                </Link>
            </li>
        </ul>
    )
}

export default Menu
