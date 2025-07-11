"use client"

import { PanelLeft } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface TriggerConfig {
  // Posición vertical - se puede modificar fácilmente
  top?: string;
  bottom?: string;
  // Separación horizontal del sidebar (en píxeles)
  marginHorizontal?: number;
  // Tamaño del botón
  size?: "sm" | "md" | "lg";
  // Personalización del ícono
  iconSize?: string;
}

export function CustomSidebarTrigger(config: TriggerConfig = {}) {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar()
  
  // Configuración por defecto
  const {
    top = "2rem", // 32px - posición vertical por defecto
    bottom,
    marginHorizontal = 16, // separación del sidebar
    size = "sm",
    iconSize = "h-4 w-4"
  } = config

  // Obtener el estado correcto según el modo (móvil o desktop)
  const isExpanded = isMobile ? openMobile : state === "expanded"

  // Obtener anchos del sidebar desde las variables CSS
  const getSidebarWidth = () => {
    if (isMobile) {
      return 288 // 18rem en móvil (SIDEBAR_WIDTH_MOBILE)
    }
    return state === "collapsed" ? 48 : 256 // 3rem collapsed, 16rem expanded
  }

  // Calcular la posición left considerando el estado actual
  const calculateLeftPosition = () => {
    const sidebarWidth = getSidebarWidth()
    
    // Debug temporal
    console.log('Debug CustomSidebarTrigger:', {
      isMobile,
      isExpanded,
      state,
      openMobile,
      sidebarWidth,
      marginHorizontal
    })
    
    if (isMobile) {
      // En móviles el sidebar es overlay (Sheet)
      // Si el sidebar está abierto, el trigger debe estar al lado del sidebar
      // Si está cerrado, el trigger debe estar en el borde izquierdo
      if (isExpanded) {
        // Cuando el sidebar está expandido, posicionar el trigger al lado derecho del sidebar
        const calculatedLeft = sidebarWidth + marginHorizontal
        // Asegurar que no se salga del viewport (dejar espacio para el botón)
        const maxLeft = typeof window !== 'undefined' ? window.innerWidth - 60 : calculatedLeft
        const finalLeft = Math.min(calculatedLeft, maxLeft)
        console.log('Mobile expanded - calculatedLeft:', calculatedLeft, 'maxLeft:', maxLeft, 'finalLeft:', finalLeft)
        return `${finalLeft}px`
      } else {
        // Cuando el sidebar está cerrado, posicionar el trigger cerca del borde izquierdo
        console.log('Mobile collapsed - left:', marginHorizontal)
        return `${marginHorizontal}px`
      }
    }
    
    // En desktop, seguir el ancho del sidebar
    console.log('Desktop - left:', sidebarWidth + marginHorizontal)
    return `${sidebarWidth + marginHorizontal}px`
  }
  
  // Obtener el tamaño del botón según la configuración
  const getButtonSize = () => {
    switch (size) {
      case "lg":
        return "h-12 w-12 p-0"
      case "md":
        return "h-11 w-11 p-0"
      case "sm":
      default:
        return "h-10 w-10 p-0"
    }
  }
  
  return (
    <div 
      className={`fixed transition-all duration-200 ease-linear ${
        isMobile ? 'z-[51]' : 'z-50'
      }`}
      style={{ 
        left: calculateLeftPosition(),
        top: bottom ? undefined : top,
        bottom: bottom || undefined,
        // Asegurar que nunca se salga del viewport
        maxWidth: `calc(100vw - ${getSidebarWidth() + marginHorizontal + 60}px)`
      }}
    >
      <Button
        onClick={toggleSidebar}
        onPointerDown={(e) => e.stopPropagation()}
        variant="outline"
        size="sm"
        className={`${getButtonSize()} bg-[var(--insecap-secondary)] hover:bg-[var(--insecap-secondary-dark)] text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--insecap-primary)] focus:ring-offset-2 active:scale-95`}
        aria-label={isExpanded ? "Colapsar menú lateral" : "Expandir menú lateral"}
        aria-expanded={isExpanded}
        role="button"
        tabIndex={0}
      >
        <PanelLeft className={`${iconSize} transition-transform duration-200 ${
          isExpanded ? "" : "rotate-180"
        }`} />
      </Button>
    </div>
  )
}
