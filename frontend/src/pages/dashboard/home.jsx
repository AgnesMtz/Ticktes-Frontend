import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Chip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext  } from "react";

import { MyContext } from "@/layouts/dashboard";

export function Home() {
  const rol = useContext(MyContext);
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const { data } = await axios.get(
          //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
          `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/obtener-clientes/`
        );
        setClients(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    buscarClientes();
    console.log(rol)
  }, []);

  return (
    <div className="mt-12">
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div> */}
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className="max-w">
          <CardHeader
            variant="filled"
            color="white"
            className="mb-8 bg-teal-400 p-6"
          >
            <Typography variant="h6" color="white">
              Resumen de Empresas
            </Typography>
          </CardHeader>

          <div className="mb-4 flex max-h-[400px] flex-wrap justify-around gap-x-4 gap-y-10 overflow-y-scroll">
            {clients.map(
              ({
                id,
                userId,
                companyName,
                name,
                firstLastName,
                priority,
                susbcription,
                active,
                secondLastName,
                gender,
              }) => {
                return (
                  <Card
                    className="shadow-true mt-6 w-60 border border-gray-400 hover:shadow-2xl"
                    key={id}
                  >
                    <CardHeader variant="filled" color="white" className="">
                      <div
                        color="white"
                        className="flex flex-nowrap gap-x-5 bg-teal-400 p-4"
                      >
                        <BuildingOffice2Icon className="w-8 text-white" />
                        <Typography
                          variant="h6"
                          color="white"
                          className="pt-1 text-center"
                        >
                          {companyName}
                        </Typography>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Typography
                        variant="h6"
                        color="gray"
                        className="m-0 font-normal"
                      >
                        Prioridad: {priority} <br />
                        Suscripción: {susbcription} <br />
                        <Chip
                          variant="gradient"
                          color={active == 1 ? "green" : "red"}
                          value={active == 1 ? "Activo" : "Inactivo"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </Typography>
                      {/* <div className="flex flex-wrap gap-x-12">

                        <Typography
                          variant="h6"
                          color="gray"
                          className="mt-2 font-normal underline cursor-pointer"
                          onClick={() => navigate(`/dashboard/profileC/${userId}`)}
                        >
                          Ver perfil
                        </Typography>
                        <Typography variant="h6" color="gray" className="mt-2 font-normal cursor-pointer underline" onClick={() => navigate(`/dashboard/guidelines/${id}`)}>
                          Ver pauta
                        </Typography>
                      </div> */}
                    </CardBody>
                    <CardFooter
                      className="mb-0 mt-0 ml-0 mr-0 flex items-center justify-center p-3"
                      divider
                    >
                      {/* <Typography variant="h6" className="font-normal">Encargado: </Typography>
                      <div className="flex items-center -space-x-3">
                        <Tooltip content={name + " " + firstLastName + " " + secondLastName}>
                          <Avatar
                            size="sm"
                            variant="circular"
                            alt="candice wu"
                            src={gender == 'M' ? "/img/profile/man.svg" : "/img/profile/woman.svg"}
                            className="border-2 border-white hover:z-10"
                          />
                        </Tooltip>
                      </div> */}
                      <div className="flex flex-wrap gap-x-8">
                        <Typography
                          variant="h6"
                          color="gray"
                          className="mt-2 cursor-pointer font-normal underline"
                          onClick={() =>
                            navigate(`/dashboard/profileC/${userId}`)
                          }
                        >
                          Ver perfil
                        </Typography>
                        <Typography
                          variant="h6"
                          color="gray"
                          className="mt-2 cursor-pointer font-normal underline"
                          onClick={() =>
                            navigate(`/dashboard/guidelines/${id}`)
                          }
                        >
                          Ver pauta
                        </Typography>
                      </div>
                    </CardFooter>
                  </Card>
                );
              }
            )}
          </div>
        </Card>

        <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
          {statisticsChartsData.map((props) => (
            <StatisticsChart
              key={props.title}
              {...props}
              footer={
                <Typography
                  variant="small"
                  className="flex items-center font-normal text-blue-gray-600"
                >
                  <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                  &nbsp;{props.footer}
                </Typography>
              }
            />
          ))}
        </div>
        {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="overflow-hidden xl:col-span-2">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                  Projects
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                  <strong>30 done</strong> this month
                </Typography>
              </div>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem>Action</MenuItem>
                  <MenuItem>Another Action</MenuItem>
                  <MenuItem>Something else here</MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["companies", "members", "budget", "completion"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {projectsTableData.map(
                    ({ img, name, members, budget, completion }, key) => {
                      const className = `py-3 px-5 ${key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                        }`;

                      return (
                        <tr key={name}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar src={img} alt={name} size="sm" />
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {name}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            {members.map(({ img, name }, key) => (
                              <Tooltip key={name} content={name}>
                                <Avatar
                                  src={img}
                                  alt={name}
                                  size="xs"
                                  variant="circular"
                                  className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                    }`}
                                />
                              </Tooltip>
                            ))}
                          </td>
                          <td className={className}>
                            <Typography
                              variant="small"
                              className="text-xs font-medium text-blue-gray-600"
                            >
                              {budget}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div className="w-10/12">
                              <Typography
                                variant="small"
                                className="mb-1 block text-xs font-medium text-blue-gray-600"
                              >
                                {completion}%
                              </Typography>
                              <Progress
                                value={completion}
                                variant="gradient"
                                color={completion === 100 ? "green" : "blue"}
                                className="h-1"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
          </Card>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Orders Overview
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <ArrowUpIcon
                  strokeWidth={3}
                  className="h-3.5 w-3.5 text-green-500"
                />
                <strong>24%</strong> this month
              </Typography>
            </CardHeader>
            <CardBody className="pt-0">
              {ordersOverviewData.map(
                ({ icon, color, title, description }, key) => (
                  <div key={title} className="flex items-start gap-4 py-3">
                    <div
                      className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                        }`}
                    >
                      {React.createElement(icon, {
                        className: `!w-5 !h-5 ${color}`,
                      })}
                    </div>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium"
                      >
                        {title}
                      </Typography>
                      <Typography
                        as="span"
                        variant="small"
                        className="text-xs font-medium text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </div>
                  </div>
                )
              )}
            </CardBody>
          </Card>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
