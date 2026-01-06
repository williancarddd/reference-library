"use client"

import * as React from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import ImportPpcModal from "./ImportPpcModal"

const TopBar = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-16 mx-36">
          <div className="text-white font-bold text-lg mr-8">
            Análise de Referências
          </div>

          {/* MENU + BOTÃO */}
          <div className="flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-8">
                <NavigationMenuItem>
                  <Link className="text-white hover:underline" href="/courses">
                    Courses
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link className="text-white hover:underline" href="/reports">
                    Reports
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* BOTÃO FORA DO NavigationMenu */}
            <button
              onClick={() => setOpen(true)}
              className="text-white font-semibold hover:underline"
            >
              IMPORTAR PPC
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mx-36">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {open && <ImportPpcModal onClose={() => setOpen(false)} />}
    </>
  )
}

export default TopBar