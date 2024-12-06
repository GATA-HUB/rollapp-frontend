import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  icon: string;
  href: string;
  width?: string;
}

const page = ({ children, icon, href, width }: Props) => {
  const pathname = usePathname();
  return (
    <Link className={width ? "w-full" : "w-fit"} href={href}>
      <div
        className={`group flex items-center justify-center px-4 py-2 rounded-lg gap-2 bg-primary ${
          pathname === href
            ? "bg-opacity-10"
            : "bg-opacity-0 hover:bg-opacity-10"
        } cursor-pointer transition-all duration-300 ease-in-out`}
      >
        <div
          className={`${
            pathname === href ? "w-6" : "w-0"
          } h-6 flex items-center justify-center group-hover:w-6 transition-all duration-300 ease-in-out`}
        >
          <Image width={126} height={32} alt="" src={icon} />
        </div>
        <span
          className={`accent ${
            pathname === href
              ? "text-primary"
              : "text-white group-hover:text-primary"
          } transition-all duration-300 ease-in-out`}
        >
          {children}
        </span>
      </div>
    </Link>
  );
};

export default page;