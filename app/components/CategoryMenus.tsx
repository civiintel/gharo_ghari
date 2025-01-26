import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function CategoryMenus() {
  return (
    <Menubar className="bg-background">
      <MenubarMenu>
        <MenubarTrigger className="bg-background">Categories</MenubarTrigger>
        <MenubarContent className="bg-background">
          <MenubarItem>Groceries</MenubarItem>
          <MenubarItem>Fresh Produce</MenubarItem>
          <MenubarItem>Dairy & Eggs</MenubarItem>
          <MenubarItem>Snacks & Beverages</MenubarItem>
          <MenubarItem>Organic Products</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Homemade Foods</MenubarSubTrigger>
            <MenubarSubContent className="bg-background">
              <MenubarItem>Jams & Preserves</MenubarItem>
              <MenubarItem>Pickles</MenubarItem>
              <MenubarItem>Spices & Condiments</MenubarItem>
              <MenubarItem>Baked Goods</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="bg-background">
              Best Sellers
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-background">
              <MenubarItem>Top-rated Products</MenubarItem>
              <MenubarItem>Most Purchased</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="bg-background">
              New Arrivals
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-background">
              <MenubarItem>Recently Added</MenubarItem>
              <MenubarItem>Seasonal Picks</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      {/* Add other MenubarMenus if needed */}
    </Menubar>
  );
}
