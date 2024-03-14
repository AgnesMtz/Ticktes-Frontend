import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { FormAgregarComentario } from "@/components/ticket/Comentarios-Ticket/formAgregarComentario";

export function ComentarioTicket({ rol }) {
  return (
    <Card className="mx-3 mt-16 mb-6 w-96 lg:mx-4">
      <CardHeader
        variant="filled"
        color="light-blue"
        className="h-12 bg-teal-400 text-center"
      >
        <Typography variant="h3" color="white">
          Comentarios
        </Typography>
      </CardHeader>
      <CardBody>
        <div className="comentario">
          <div className="flex gap-2">
            <Avatar
              src="/img/profile/client.svg"
              alt="avatar"
              variant="circular"
            />
            <Typography></Typography>
          </div>
          <Typography
            variant="small"
            className="flex flex-row-reverse"
          ></Typography>
        </div>
      </CardBody>
      {rol === "0" && (
        <CardFooter divider className="p-2">
          <FormAgregarComentario />
        </CardFooter>
      )}
    </Card>
  );
}
