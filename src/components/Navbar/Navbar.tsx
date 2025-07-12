import { Home, Users, BarChart3, Settings } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/customer",
    icon: Users,
  },
  {
    title: "Histórico",
    url: "/historical",
    icon: BarChart3,
  },
]


export function Navbar() {
  return (

    <Sidebar 
      collapsible="icon" 
      className="transition-transform border-r-0 data-[collapsible=icon]:w-20 md:data-[collapsible=icon]:w-20 data-[state=collapsed]:w-20" 
      style={{ background: 'linear-gradient(to bottom, var(--insecap-primary), var(--insecap-secondary))' }}
    >
      {/* HEADER: LOGO Y TITULO */}
      <SidebarHeader style={{ backgroundColor: 'var(--insecap-primary)' }}>
        <div className="flex items-center gap-2 py-2">
            
          {/* LOGO */}
          <div className="group-data-[collapsible=icon]:none flex h-8 w-8 items-center justify-center rounded-lg">
            <img src="Insecap_Logo-09.png" alt="Logo" className="h-10 w-10" />
          </div>
          {/* TÍTULO */}
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-white ">INSECAP GPS</p>
            <p className="text-xs" style={{ color: 'var(--insecap-secondary)' }}>Predictor Financiero</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent style={{ background: 'linear-gradient(to bottom, var(--insecap-primary), var(--insecap-secondary))' }}>
        <SidebarGroup>
          {/*TÍTULO*/}
          <SidebarGroupLabel style={{ color: 'var(--insecap-secondary)' }}>Menú</SidebarGroupLabel>

          <SidebarGroupContent>
            {/* ITEMS DEL MENU */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    
                  {/* BOTON DE ITEM */}
                  <SidebarMenuButton asChild tooltip={item.title} className="text-white hover:bg-white/10 data-[state=open]:bg-white/10">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}