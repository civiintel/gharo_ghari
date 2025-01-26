import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import Link from "next/link";

export const AdminMenuBar = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/">Products</Link>
        </MenubarTrigger>
        <MenubarTrigger>
          <Link href="/category">Create Category</Link>
        </MenubarTrigger>
        <MenubarTrigger>
          <Link href="/userManage">Manage user</Link>
        </MenubarTrigger>
        <MenubarTrigger>
          <Link href="/recivedOrders">Manage Orders</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
};
