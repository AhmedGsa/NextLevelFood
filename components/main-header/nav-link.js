'use client';
import { usePathname } from "next/navigation"
import Link from "next/link";
import classes from './nav-link.module.css';

export default function NavLink({ href, children }) {
    const path = usePathname();
    return (
        <Link href={href} className={
            path.startsWith(href) ? `${classes.active} ${classes.link}` : classes.link
        }>{children}</Link>
    )
}