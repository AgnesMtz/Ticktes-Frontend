import {
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { FormInformacionTicket } from "@/components/ticket/formInformacionTicket";

const InformacionTicket = ({rol}) => {
  return (
    <Card className="mx-3 mt-16 mb-6 w-96 grow lg:mx-4">
      <CardHeader
        variant="filled"
        color="light-blue"
        className="h-12 bg-teal-400 text-center"
      >
        <Typography variant="h3" color="white">
          Información del Ticket
        </Typography>
      </CardHeader>
      <FormInformacionTicket rol={rol}/>
    </Card>
  );
};

export default InformacionTicket;
