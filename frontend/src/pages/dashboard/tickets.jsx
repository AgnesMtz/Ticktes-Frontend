import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ModalAgregarTicket from "@/components/tickets/modalAgregarTicket";
import { Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "@/layouts";

export function Tickets() {
  const [modalAgregar, setModalAgregar] = useState(false);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const rol = useContext(MyContext);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/ticket/mostrar-tickets/`
        );
        setTickets(data[0]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTickets();
  }, []);

  const handleModalAgregar = () => {
    setModalAgregar(!modalAgregar);
  };

  return (
    <>
      {modalAgregar && (
        <ModalAgregarTicket
          modalAgregar={modalAgregar}
          handleModalAgregar={handleModalAgregar}
        />
      )}
      <div>
        <Card className="mx-auto my-20 flex  flex-col gap-8">
          {rol !== "0" && (
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="m-0 p-4"
            >
              <Button
                color="white"
                variant="outlined"
                onClick={handleModalAgregar}
                className="bg-teal-400 text-sm"
              >
                Agregar Ticket
              </Button>
            </CardHeader>
          )}
          <CardBody className="w-100 flex flex-row gap-4 overflow-x-scroll p-4">
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader color="white" className=" flex justify-center p-5">
                <Typography variant="h6" color="black" className="text-sm">
                  Registrado
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 8) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader
                color="blue-gray"
                className=" flex justify-center p-5"
              >
                <Typography variant="h6" color="white" className="text-sm">
                  Asignado
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex h-[40rem] flex-col gap-2 overflow-auto p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 9) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-amber-600 p-5">
                <Typography variant="h6" color="white" className="text-sm ">
                  En autorización cliente
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 4) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader color="cyan" className=" flex justify-center p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Proceso
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 6) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader color="lime" className=" flex justify-center p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  En espera de información
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 11) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-teal-100 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Propuesta
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 13) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-yellow-600 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Revisión por diseño
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 3) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader color="orange" className=" flex justify-center p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Pausa por cliente
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 7) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-red-600 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Correcciones
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 2) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-red-700 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Cancelado por GS
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 10) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-red-800 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Cancelado por pago
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 12) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-red-900 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Canceló cliente
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 14) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader className=" flex justify-center bg-teal-400 p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Pausa por GS
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 15) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
            <Card className="mt-4 flex min-w-[15rem] flex-col">
              <CardHeader color="green" className=" flex justify-center p-5">
                <Typography variant="h6" color="white" className="text-sm">
                  Terminado
                </Typography>
              </CardHeader>
              <CardBody className="m-1 flex flex-col gap-2 p-1">
                {tickets.map(
                  (
                    { id, activitie, petition, deadline, priority, state },
                    key
                  ) => {
                    const classname = `min-w-[1rem] rounded text-center ${
                      priority === 1
                        ? "bg-deep-orange-600"
                        : priority === 2
                        ? "bg-orange-400"
                        : priority === 3
                        ? "bg-yellow-600"
                        : "bg-blue-400"
                    }`;
                    if (state === 5) {
                      return (
                        <Card key={id}>
                          <CardBody
                            className="m-1 flex cursor-pointer flex-col bg-gray-50 p-1 hover:shadow-md"
                            onClick={() => navigate(`/dashboard/ticket/${id}`)}
                          >
                            <Typography variant="small" color="black">
                              {activitie}
                            </Typography>
                            <Typography variant="small" color="black">
                              {petition}
                            </Typography>
                            <div className="flex justify-between">
                              <Typography variant="small" color="black">
                                {deadline.substring(0, 10)}
                              </Typography>
                              <Typography
                                variant="small"
                                color="white"
                                className={classname}
                              >
                                {priority}
                              </Typography>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    }
                  }
                )}
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Tickets;
