export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PAULA",
  description: "Para pau.",
  navItems: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "Ekodev Company",
      href: "/docs",
    },
    {
      label: "Nuestros servcios",
      href: "/pricing",
    },
    {
      label: "Proyectos",
      href: "/blog",
    },
    {
      label: "Colaboremos",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Aplicaciones",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
