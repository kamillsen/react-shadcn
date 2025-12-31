import {
  IconDashboard,
  IconFileDescription,
  IconFileAi,
  IconCamera,
  IconChartBar,
  IconInnerShadowTop,
} from "@tabler/icons-react"

export const navigationData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
      isActive: false,
    },
    {
      title: "Learn",
      url: "#",
      icon: IconInnerShadowTop,
      isActive: false,
      items: [
        {
          title: "Components",
          url: "/learn/components",
        },
      ],
    },
    {
      title: "Props",
      url: "#",
      icon: IconFileDescription,
      isActive: false,
      items: [
        { title: "Basic", url: "/learn/props/basic" },
        { title: "Children", url: "/learn/props/children" },
        { title: "Callback", url: "/learn/props/callback" },
      ],
    },
    {
      title: "State",
      url: "#",
      icon: IconChartBar,
      isActive: false,
      items: [
        { title: "Basic", url: "/learn/state/basic" },
        { title: "Lifting", url: "/learn/state/lifting" },
        { title: "Objects & Arrays", url: "/learn/state/objects-arrays" },
      ],
    },
    {
      title: "Hooks",
      url: "#",
      icon: IconFileAi,
      isActive: false,
      items: [
        { title: "Hooks Ana Sayfa", url: "/learn/hooks/" },
        { title: "useEffect", url: "/learn/hooks/effect" },
        { title: "useContext", url: "/learn/hooks/context" },
        { title: "Performance", url: "/learn/hooks/performance" },
      ],
    },
    {
      title: "Todo App",
      url: "/todo-app",
      icon: IconFileAi,
      isActive: false,
      // items dizisi buradan kaldırıldı, böylece açılır menü olmayacak
    },
  ],
}