import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { FormAgregarSeguimiento } from "@/components/ticket/FormAgregarSeguimiento";
import { HistorialCambios } from "@/components/ticket/HistorialCambios";

const SeguimientoTicket = ({ rol }) => {

  console.log(rol);
  return (
    <Card className="mx-3 mt-16 mb-6 w-96 lg:mx-4">
      <CardHeader
        variant="filled"
        color="light-blue"
        className="h-12 bg-teal-400 text-center"
      >
        <Typography variant="h3" color="white">
          Seguimiento
        </Typography>
      </CardHeader>
      <CardBody className="h-[14rem] overflow-auto">
        <HistorialCambios />
      </CardBody>
      {rol === '1' ||
        rol === '2' && (
          <CardFooter divider className="p-2">
            <FormAgregarSeguimiento />
          </CardFooter>
        )}
    </Card>
  );
};

export default SeguimientoTicket;
