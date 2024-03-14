import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
import { Fragment } from "react";

const VerSucursales = ({sucursales}) => {

  // console.log(sucursales)
  return (
    <Card className="mx-3 mt-2 mb-6 lg:mx-4 ">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    Sucursales
                  </Typography>
                </div>
              </div>
            </div>
            <div className="justify-between mb-12 flex gap-12 px-4 flex-wrap">
              {Object.keys(sucursales).length > 0 ?
                sucursales.map( sucursal =>
                  <Card className="w-80" key={sucursal.branchId}>
                    <CardHeader color="blue" className="relative h-56">
                      <img
                        src="/img/branchoffice/office.jpg"
                        alt="img-blur-shadow"
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="flex flex-col gap-1">
                        <Typography    
                          className="font-bold"                    
                        >
                          Dirección:
                        </Typography>
                        <Typography                                            
                        >
                          {sucursal.address}
                        </Typography>
                        <Typography
                          className="font-bold"   
                        >
                          Télefono: 
                        </Typography>
                        <Typography>
                          {sucursal.phone}
                        </Typography>                      
                        <Typography
                          className="font-bold"   
                        >
                          Correo electrónico:
                        </Typography>
                        <Typography>
                          {sucursal.email}
                        </Typography>                                            
                        <Typography
                          className="font-bold"   >
                          Encargado:
                        </Typography>
                        <Typography>
                          {sucursal.name} {sucursal.firstLastName} {sucursal.secondLastName}
                        </Typography>                      
                    </CardBody>
                  </Card>
                )
                :
                <Typography
                  variant="h5"
                  col="blue-gray"
                >
                  No hay sucursales registradas.
                </Typography>
              }

            </div>
          </CardBody>
    </Card>
  )
}

export default VerSucursales