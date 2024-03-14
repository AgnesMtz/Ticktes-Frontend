import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FormSubirTicket from "./FormSubirTicket";

const ModalSubirTicket = ({subirTicket, handleSetSubirTicket}) => {
  return (
    <Dialog size="xs" open={subirTicket} handler={handleSetSubirTicket}>
        <DialogHeader className="bg-teal-300 text-white rounded-t-md">Subir archivo</DialogHeader>
        <FormSubirTicket handleSetSubirTicket = {handleSetSubirTicket}/>
      </Dialog>
  )
}

export default ModalSubirTicket