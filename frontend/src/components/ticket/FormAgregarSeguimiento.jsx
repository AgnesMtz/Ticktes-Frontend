import {
  Textarea,
  Button,
} from "@material-tailwind/react";
import { Fragment } from "react";

export function FormAgregarSeguimiento() {
  return (
    <Fragment>
      <Textarea variant="outlined" placeholder="Nuevo seguimiento" rows={1} />
      <div className="flex flex-row-reverse">
        <Button size="sm" className="rounded-md bg-teal-400 ">
          Añadir
        </Button>
      </div>
    </Fragment>
  );
}
