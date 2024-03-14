import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  cardBody,
  Card,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import FormAgregarTicket from "./formAgregarTickets";
 
export default function ModalAgregarTicket({modalAgregar, handleModalAgregar}) {
 
  return (
      <Dialog
        size="xl"
        open={modalAgregar}
        handler={handleModalAgregar}     
      >
        <DialogHeader
          className="bg-teal-300 text-white  rounded-t-md"
        >
          Agregar nuevo ticket
        </DialogHeader>
        <FormAgregarTicket handleModalAgregar={handleModalAgregar} />
      </Dialog>
  );
}