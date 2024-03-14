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
import { Fragment } from "react";

const VerContactos = ({contactos}) => {
  return (
    <Card className="mx-3 mt-2 mb-6 lg:mx-4 ">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    Contactos
                  </Typography>
                </div>
              </div>
            </div>
            <div className="justify-between mb-12 flex gap-12 px-4 flex-wrap">
              {Object.keys(contactos).length > 0 ?
                  contactos.map( contacto =>
                  <Card className="w-80" key={contacto.contactId}>
                    <CardHeader color="blue" className="relative h-56">
                      <img
                        src="/img/contact/contact.jpg"
                        alt="img-blur-shadow"
                        className="h-full w-full object-cover"                        
                      />
                    </CardHeader>
                    <CardBody className="flex flex-col gap-1">
                        <Typography    
                          className="font-bold"                    
                        >
                          Nombre:
                        </Typography>
                        <Typography                        
                        >
                          {contacto.name} {contacto.firstLastName} {contacto.secondLastName}
                        </Typography>
                        <div className="flex justify-between">
                          <Typography
                            className="font-bold"   
                          >
                            Activo:
                          </Typography>
                          { contacto.contactActive === 0 ?
                            <Typography
                              color="red"
                              className="font-medium"
                            >             
                            No             
                            </Typography>    
                            :                
                            <Typography
                              color="green"
                              className="font-medium"
                            >         
                            Si                 
                            </Typography>      
                          }                  
                        </div>
                    </CardBody>
                  </Card>
                )
                :
                <Typography
                  variant="h5"
                  col="blue-gray"
                >
                  No hay contactos registrados.
                </Typography>
              }
            </div>
          </CardBody>
    </Card>
  )
}

export default VerContactos