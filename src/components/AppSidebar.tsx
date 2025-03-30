
import { Home, PlusCircle, PieChart, Bell, Settings, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      onClick: () => navigate("/"),
    },
    {
      title: "Add Subscription",
      icon: PlusCircle,
      onClick: () => navigate("/add-subscription"),
    },
    {
      title: "Insights",
      icon: PieChart,
      onClick: () => navigate("/insights"),
    },
    {
      title: "Reminders",
      icon: Bell,
      onClick: () => navigate("/reminders"),
    },
    {
      title: "Settings",
      icon: Settings,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <Sidebar>
      <div className="p-4 flex items-center">
        <h1 className="text-xl font-bold text-primary">SubTracker</h1>
        <div className="ml-auto md:hidden">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SidebarTrigger>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
