
import React from 'react';

const SidebarMenuButton = React.forwardRef(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={className}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <div className="tooltip-container">
        {button}
        <div className="tooltip-content" hidden={state !== "collapsed" || isMobile}>
          {tooltip.children}
        </div>
      </div>
    );
  }
);

SidebarMenuButton.displayName = "SidebarMenuButton";

export default SidebarMenuButton;
