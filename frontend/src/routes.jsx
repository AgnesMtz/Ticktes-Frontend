import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Registro, Tickets} from "@/pages/dashboard";
import {PerfilCliente, PerfilEmpleado} from "@/pages/profile"
import { RegistroPauta } from "@/pages/guidelines";
import { Ticket } from "@/pages/tickets";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [ //Aqui se definen las rutas
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Inicio",
        path: "/home",
        element: <Home />,
        permission: ['0','1','2','3']
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "Registro",
        path: "/registro-trabajador",
        element: <Registro />,
        permission: ['1','2']
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Trabajadores",
        path: "/tables",
        element: <Tables />,
        permission: ['1','2']
      },
      // {
      //   icon: <TicketIcon {...icon} />,
      //   name: "Tickets",
      //   path: "/ver-tickets/",
      //   element: <Tickets />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "Notificaciones",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
      {
        icon: <TicketIcon {...icon} />,
        name: "Tickets",
        path: "/tickets",
        element: <Tickets />,
        permission: ['0','1','2','3']
      },
    ],
  },{
    layout: "profile",
    pages: [
      {                
        path: "/profileW/:id",
        element: <PerfilEmpleado />,
      },
      {                
        path: "/profileC/:id",
        element: <PerfilCliente />,
      },
    ]
  },{
    layout: "guidelines",
    pages: [
      {
        path: "/guidelines/:id",
        element: <RegistroPauta />,
      },

    ]
  },{
    layout: "tickets",
    pages: [
      {
        path: "/ticket/:id",
        element: <Ticket />,
      },

    ]
  }
];

export default routes;
