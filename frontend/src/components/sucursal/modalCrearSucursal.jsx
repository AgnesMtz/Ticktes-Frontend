import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import FormCrearSucursal from "./formCrearSucursal";
 
export default function ModalCrearSucursal({createSucursal, handleCreateSucursal, id, contactos}) {
 
  return (
    <Fragment>
      <Dialog
        open={createSucursal}
        handler={handleCreateSucursal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}        
      >
        <DialogHeader
          className="bg-teal-300 text-white"
        >
          Agregar Sucursal
        </DialogHeader>
        <FormCrearSucursal clientId={id} handleCreateSucursal={handleCreateSucursal} contactos={contactos}/>
      </Dialog>
    </Fragment>
  );
}