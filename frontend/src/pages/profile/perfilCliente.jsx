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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
  import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
    CalendarDaysIcon,
    TicketIcon,
    UserPlusIcon,
    BuildingOffice2Icon,
    UserGroupIcon,
    BuildingOfficeIcon,
  } from "@heroicons/react/24/solid";
  import { Link, useParams } from "react-router-dom";
  import { useState, useEffect, Fragment } from "react";
  import axios from "axios";
  import { FormEditarCliente } from "@/components/formEditarCliente";  
  import ModalCrearSucursal from "@/components/sucursal/modalCrearSucursal";
  import ModalCrearContacto from "@/components/contactos/modalCrearContacto";
  import VerSucursales from "@/components/sucursal/verSucursales";
  import VerContactos from "@/components/contactos/verContactos";
  
  
  export function PerfilCliente() {
    
    const [client, setCliente] = useState([])     
    const [encargados, setEncargados] = useState([])
    const [contactos, setContactos] = useState([])
    const [sucursales, setSucursales] = useState([])

    const [isEditing, setIsEditing] = useState(false)
    const [createSucursal, setCreateSucursal] = useState(false)
    const [createContacto, setCreateContacto] = useState(false)
    const [verSucursales, setVerSucursales] = useState(false)
    const [verContactos, setVerContactos] = useState(false)
    const params = useParams();
    
    //Entra solo una vez para comprobar que el usuario exista
    useEffect(() => {
      const buscarCliente = async () => {
        try {
            const {data} = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/obtener-cliente/${params.id}`
              );
            // console.log(data)                                   
            setCliente(data[0][0])  
            setEncargados(data[1])    
            setContactos(data[2])   
            setSucursales(data[3])   
          } catch (error) {
            console.log(error);
          }
        };
        buscarCliente();
    }, []);  

    const handleCreateSucursal = () =>{
      setCreateSucursal(!createSucursal)
    }

    const handleCreateContacto = () =>{
      setCreateContacto(!createContacto)
    }

    const handleVerSucursales = () =>{
      setVerSucursales(!verSucursales)
    }

    const handleVerContactos = () =>{
      setVerContactos(!verContactos)
    }

    return (
      <>
        { createSucursal 
          ? <ModalCrearSucursal createSucursal={createSucursal} handleCreateSucursal={handleCreateSucursal} id={params.id} contactos={contactos}/> 
          : createContacto 
          && <ModalCrearContacto createContacto={createContacto} handleCreateContacto={handleCreateContacto} id={params.id}/>
          }        
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-blue-500/50" />
        </div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={`/img/profile/client.svg`}
                  alt="client"
                  size="xl"
                  variant="circular"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {client.companyName ?? ''}
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
                  <div key="agregar">
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      Agregar
                    </Typography>
                    <div className="flex flex-col gap-6">
                      <Button
                        name="sucursal"
                        title="Agregar Sucursal"
                        variant="text"
                        className="flex gap-10"
                        onClick={handleCreateSucursal}    
                      >
                        <BuildingOfficeIcon 
                          className="h-4 w-4 cursor-pointer text-blue-gray-500" 
                          />{" "}
                        Sucursal
                      </Button>
  
                      <Button
                        name="cliente"
                        title="Agregar Contacto"
                        variant="text"
                        className="flex gap-10"
                        onClick={handleCreateContacto}
                      >
                        <UserPlusIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />{" "}
                        Contacto
                      </Button>
                      
  
                    </div>
                  </div>
                  <div key="ver">
                    <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                      Ver
                    </Typography>
                    <div className="flex flex-col gap-6">
                      <Button
                        name="sucursales"
                        title="Ver Sucursales"
                        variant="text"
                        className="flex gap-10" 
                        onClick={handleVerSucursales}
                      >
                        <BuildingOffice2Icon 
                          className="h-4 w-4 cursor-pointer text-blue-gray-500" 
                          />{" "}
                        Sucursales
                      </Button>
  
                      <Button
                        name="contactos"
                        title="Ver Contactos"
                        variant="text"
                        className="flex gap-10"
                        onClick={handleVerContactos}
                      >
                        <UserGroupIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />{" "}
                        Contactos
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
                <FormEditarCliente cliente={client} isEditing={isEditing} setIsEditing={setIsEditing} encargados={encargados}/>
              </Card>
              
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Tickets Activos
                </Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {verSucursales && <VerSucursales sucursales={sucursales}/>}

        {verContactos && <VerContactos contactos={contactos}/>}
        
      </>
    );
  }
  
  export default PerfilCliente;
  