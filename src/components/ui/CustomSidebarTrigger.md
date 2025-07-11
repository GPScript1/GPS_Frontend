# CustomSidebarTrigger - Documentación

## Descripción
El `CustomSidebarTrigger` es un componente altamente personalizable que permite controlar el sidebar de manera responsiva y accesible. Se adapta automáticamente a diferentes tamaños de pantalla y proporciona una experiencia de usuario óptima tanto en desktop como en móvil.

## Características principales

### ✅ **Responsive Design**
- Detecta automáticamente el tamaño de pantalla
- Se posiciona dinámicamente según el ancho del sidebar
- Comportamiento adaptativo en móviles y tablets

### ✅ **Accesibilidad**
- Soporte completo para navegación por teclado
- Atributos ARIA apropiados
- Indicadores visuales de foco
- Etiquetas descriptivas que cambian según el estado

### ✅ **Personalización Fácil**
- Configuración mediante props
- Múltiples opciones de posición y tamaño
- Colores corporativos integrados

### ✅ **Buenas Prácticas**
- Usa ResizeObserver para detección eficiente de cambios
- Transiciones suaves y naturales
- Prevención de overflow horizontal
- Optimizado para rendimiento

## Configuración

### Parámetros disponibles

```typescript
interface TriggerConfig {
  // Posición vertical
  top?: string;           // Ejemplo: "2rem", "32px", "10%"
  bottom?: string;        // Alternativa a top
  
  // Separación horizontal del sidebar
  marginHorizontal?: number;  // En píxeles, default: 16
  
  // Tamaño del botón
  size?: "sm" | "md" | "lg";  // default: "sm"
  
  // Tamaño del ícono
  iconSize?: string;      // Ejemplo: "h-4 w-4", "h-6 w-6"
}
```

### Ejemplos de uso

#### Configuración básica (recomendada)
```tsx
<CustomSidebarTrigger />
```

#### Configuración personalizada
```tsx
<CustomSidebarTrigger 
  top="2rem"              // Posición desde arriba
  marginHorizontal={24}   // 24px de separación del sidebar
  size="md"               // Botón mediano
  iconSize="h-5 w-5"      // Ícono más grande
/>
```

#### Posición en la parte inferior
```tsx
<CustomSidebarTrigger 
  bottom="2rem"           // Posición desde abajo
  marginHorizontal={16}   // 16px de separación
  size="lg"               // Botón grande
/>
```

## Comportamiento Responsivo

### Desktop (≥1024px)
- Posición fija relativa al sidebar
- Separación configurable
- Transiciones suaves

### Tablet (768px - 1023px)
- Comportamiento similar a desktop
- Ajustes menores en espaciado

### Mobile (<768px)
- Posición adaptativa
- Sidebar se comporta como overlay
- Trigger se reposiciona automáticamente

## Personalización Avanzada

### Modificar posición vertical
```tsx
// Desde arriba
<CustomSidebarTrigger top="3rem" />

// Desde abajo
<CustomSidebarTrigger bottom="3rem" />

// Centrado verticalmente
<CustomSidebarTrigger top="50%" />
```

### Modificar separación horizontal
```tsx
// Más cerca del sidebar
<CustomSidebarTrigger marginHorizontal={8} />

// Más lejos del sidebar
<CustomSidebarTrigger marginHorizontal={32} />
```

### Diferentes tamaños
```tsx
// Pequeño (32x32px)
<CustomSidebarTrigger size="sm" />

// Mediano (44x44px)
<CustomSidebarTrigger size="md" />

// Grande (48x48px)
<CustomSidebarTrigger size="lg" />
```

## Accesibilidad

### Navegación por teclado
- **Tab**: Navegar al botón
- **Enter/Space**: Activar toggle
- **Escape**: Cerrar sidebar (si está abierto)

### Lectores de pantalla
- Etiquetas descriptivas automáticas
- Estado del sidebar comunicado
- Roles ARIA apropiados

## Colores Corporativos

El componente usa automáticamente los colores corporativos INSECAP:
- **Primario**: `--insecap-primary` (#485CC7)
- **Secundario**: `--insecap-secondary` (#00B8DE)
- **Variantes oscuras**: Para estados hover y focus

## Consideraciones de Rendimiento

### Optimizaciones implementadas
- `ResizeObserver` para detección eficiente de cambios
- Debouncing automático en eventos de resize
- Cleanup apropiado de event listeners
- Transiciones CSS optimizadas

### Mejores prácticas
- Un solo componente por página
- Configuración estática preferida
- Evitar cambios frecuentes de configuración

## Solución de Problemas

### El trigger se superpone con contenido
```tsx
// Aumentar la separación
<CustomSidebarTrigger marginHorizontal={32} />
```

### El trigger desaparece en móvil
```tsx
// Verificar que no haya CSS conflictivo
// El componente maneja automáticamente la visibilidad
```

### Transiciones lentas
```tsx
// Las transiciones están optimizadas por defecto
// Verificar que no haya CSS custom conflictivo
```

## Compatibilidad

### Navegadores soportados
- Chrome 88+
- Firefox 84+
- Safari 14+
- Edge 88+

### Frameworks
- Next.js 13+
- React 18+
- TypeScript 4.5+

## Futuras Mejoras

### Roadmap
- [ ] Soporte para múltiples temas
- [ ] Animaciones de entrada/salida
- [ ] Shortcuts de teclado personalizables
- [ ] Soporte para drag & drop
- [ ] Indicadores de notificación

### Contribuciones
Para sugerir mejoras o reportar bugs, contactar al equipo de desarrollo.
