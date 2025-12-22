"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/repo/ui/components/ui/table"
import { Button } from "@/repo/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/repo/ui/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/repo/ui/components/ui/card"
import { Badge } from "@/repo/ui/components/ui/badge"
import { MoreHorizontal, RefreshCw, FileText, Trash, UserPlus } from "lucide-react"
import useSWR from "swr"
import { fetchAllUsers } from "@/fetch/user/fetchAllUsers"
import ResetPassword from "./resetPassword"
import { Dialog, DialogContent, DialogTrigger } from "@/repo/ui/components/ui/dialog"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"



export default function UsersAdmin() {
  const {
    data: users,
    isLoading,
    error
  } = useSWR("user", fetchAllUsers)

  if (isLoading) return <p>Loading</p>
  if (!isLoading) console.log(users[0])
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.session && format(user.session.entry_time, "PPP", {locale: ptBR})}</TableCell>
                <TableCell>
                  <Badge variant={user.role.name === "GERENTE" ? "default" : "secondary"}>
                    {user.role.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <ResetPassword id={user.id} />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Logs
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Promote to Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}