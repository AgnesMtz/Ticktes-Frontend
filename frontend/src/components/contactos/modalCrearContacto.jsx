import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FormCrearContacto from "./formCrearContacto";
 
export default function ModalCrearContacto({createContacto, handleCreateContacto, id}) {
 
  return (
    <Fragment>
      <Dialog
        open={createContacto}
        handler={handleCreateContacto}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}        
      >
        <DialogHeader
            className="bg-teal-300 text-white"
        >
          Agregar Contacto
        </DialogHeader>
        <FormCrearContacto id={id} handleCreateContacto={handleCreateContacto}/>
      </Dialog>
    </Fragment>
  );
}