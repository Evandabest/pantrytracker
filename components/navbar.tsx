"use client";
import React, { useState, useEffect, ReactComponentElement, ReactElement, ReactNode } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { logout } from "./actions";
import 'boxicons/css/boxicons.min.css'; 


export function SidebarDemo({children}: {children: ReactNode}) {
    const [name, setName] = useState<string>("")
    const supabase = createClient()
    const [image, setImage] = useState<string>("")

    const logoutUser = async() => {
        await logout()
    }
    
  
    useEffect(()=> {
        const fetchUserName = async() => {
            const {data: {user}} = await supabase.auth.getUser()
            const {data, error} = await supabase.from("profiles").select("*").eq("id", user?.id)
            if (error) {
                console.log(error)
            }
            if (!data) {
                return;
            }
            setName(data[0].name)
            setImage(data[0].pfp)
        }
        fetchUserName()

    },[])

  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <i className='bx bx-sm bxs-home-alt-2'></i>
      ),
    },
    {
      label: "Add",
      href: "/add",
      icon: (
        <i className='bx bx-sm bx-plus' ></i>
      ),
    },
    {
      label: "Vault",
      href: "/vault",
      icon: (
        <i className='bx bx-sm bxs-bank' ></i>
      ),
    },
    {
      label: "Account",
      href: "/account",
      icon: (
        <i className='bx bx-sm bxs-user-account' ></i>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md bg-gray-100 flex flex-col md:flex-row dark:bg-neutral-800 w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
      
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-slate-200">
          <div className="flex flex-col">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          <div onClick={logoutUser} className="mt-1 flex flex-col gap-2">
            <SidebarLink
              link={{
                label: "Logout",
                href: "/login",
                icon: (
                  <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                ),
              }}
              />
          </div>
          </div>
          <div>
          {name ? (
            <SidebarLink
              link={{
                label: `${name}`,
                href: "/account",
                icon: (
                  <>
                    <div className="w-10 h-10 relative rounded-full overflow-hidden">
                      <Image
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        alt="Profile Picture"
                      />
                    </div>
                  </>
                ),
              }}
            />
          ) : null}
        </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-col h-screen w-screen items-center">
      {children}
      </div>
      {//<Dashboard />
}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Pantry Tracker
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <>
    </>
  );
};
