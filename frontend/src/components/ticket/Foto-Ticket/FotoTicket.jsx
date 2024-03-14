import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useState } from "react";
import ModalSubirTicket from "./ModalSubirTicket";

const FotoTicket = ({ rol }) => {
  const [subirTicket, setSubirTicket] = useState(false);

  const handleSetSubirTicket = () => {
    setSubirTicket(!subirTicket);
  };

  return (
    <>
      {subirTicket && (
        <ModalSubirTicket
          subirTicket={subirTicket}
          handleSetSubirTicket={handleSetSubirTicket}
        />
      )}

      <Card className="mx-3 mt-16 mb-6 h-[52rem] w-96 lg:mx-4">
        <CardHeader floated={false} className="flex h-full justify-center">
          <img
            src="/img/favicon.jpg"
            alt="profile-picture"
            className="object-contain"
          />
        </CardHeader>
        {rol !== "0" && (
          <CardBody className="text-center">
            <Button
              color="white"
              variant="outlined"
              className="bg-teal-400 text-sm"
              onClick={handleSetSubirTicket}
            >
              Subir Ticket
            </Button>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export default FotoTicket;
