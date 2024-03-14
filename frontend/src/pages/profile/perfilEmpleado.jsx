import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  PencilIcon,
  CalendarDaysIcon,
  TicketIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormEditarEmpleado from "@/components/formEditarEmpleado";

export function PerfilEmpleado() {
  
  const [usuario, setUsuario] = useState({})  
  const [active, setActive] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const params = useParams();
  
  // console.log(params.id)
  //Entra solo una vez para comprobar que el usuario exista
  
  //Activar o desactivar al empleado
  const handleActive = async () =>{
    try {
      const {data} = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${params.id}`,
        {active}
        );
        setActive(!active)
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    
    // console.log([usuario])
    useEffect(() => {
      // console.log('hola')
        const buscarUsuario = async () => {
        try {
            const { data } = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/user/${params.id}`
              );
            setUsuario(data[0]) 
            // console.log(usuario)
            setActive(usuario.active)         
            // console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
        buscarUsuario();  
    }, []);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={
                  usuario.gender === 'M' ? "/img/profile/man.svg" : "/img/profile/woman.svg"
                }
                alt="worker"
                size="xl"
                variant="circular"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {usuario.name} {usuario.firstLastName} {usuario.secondLastName}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {usuario.position ?? ''}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Opciones
              </Typography>
              <div className="flex flex-col gap-12">
                <div key="cuenta">
                  <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                    Cuenta
                  </Typography>
                  <div className="flex flex-col gap-6">
                    <Switch
                      key="activo"
                      id="activo"
                      label="Activo"
                      defaultChecked={active}
                      onChange={handleActive}
                      labelProps={{
                        className: "text-sm font-normal text-blue-gray-500",
                      }}
                    />                    
                  </div>
                </div>
                <div key="reportes">
                  <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                    Reportes
                  </Typography>
                  <div className="flex flex-col gap-6">
                    <Button
                      name="historico"
                      title="Ver historial de cambios"
                      variant="text"
                      className="flex gap-10"
                    >
                      <CalendarDaysIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />{" "}
                      Historico
                    </Button>

                    <Button
                      name="tickets"
                      title="Ver tickets"
                      variant="text"
                      className="flex gap-10"
                    >
                      <TicketIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />{" "}
                      Tickets
                    </Button>

                  </div>
                </div>
              </div>
            </div>
            <Card
              color="transparent"
              shadow={false}
            >
              <CardHeader
                color="transparent"
                shadow={false}
                floated={false}
                className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
              >
                <Typography variant="h6" color="blue-gray">
                  {isEditing ? "Editar información" : "Información del Perfil"}
                </Typography>
                {!isEditing && (
                  <Tooltip content="Editar Perfil">
                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500"  onClick={()=> setIsEditing(!isEditing)}/>
                  </Tooltip>
                )}
              </CardHeader>
              <FormEditarEmpleado usuario={usuario} isEditing={isEditing} setIsEditing={setIsEditing}/>
            </Card>                        
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Tickets Asignados
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default PerfilEmpleado;
