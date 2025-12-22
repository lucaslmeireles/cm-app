"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/repo/ui/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/repo/ui/components/ui/button";
import useSWRImmutable from 'swr/immutable'
import { fetchAllOrgs } from "@/fetch/org/fetchAllOrgs";
import { useMemo } from "react";

export const OrganizationDropdown = () => {
    const {
        data: orgs,
        error,
        isLoading
    } = useSWRImmutable("orgs", fetchAllOrgs)
    
    if (error) return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white text-main hover:bg-gray-100">
                Error <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
    )
    
    if (isLoading) return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white text-main hover:bg-gray-100">
                Carregando <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
    )

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="bg-white text-main hover:bg-gray-100" >
            {orgs[0].name} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {orgs.length > 1 && 
        (<DropdownMenuContent>
          {orgs.map((org) => (
            <DropdownMenuItem key={org.id}>
              {org.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>)}
      </DropdownMenu>
    )
  }