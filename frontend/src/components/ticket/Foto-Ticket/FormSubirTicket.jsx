import { Form, Formik } from "formik";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const FormSubirTicket = ({ handleSetSubirTicket }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      console.log(formData.get("file"));

    //   try {
    //     const response = await axios.post("", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });

    //     // Realizar acciones adicionales después de subir el archivo
    //     console.log(response.data);
    //   } catch (error) {
    //     // Manejar errores de solicitud
    //     console.error(error);
    //   }
    }
  };

  return (
    <Formik onSubmit={handleSubmit}>
      {({}) => (
        <Form>
          <DialogBody divider>
            <label htmlFor="ticket">
              <div className="flex cursor-pointer justify-center">
                <ArrowUpTrayIcon className="h-10 w-10 text-teal-600" />
                <Typography variant="h5">Subir ticket</Typography>
              </div>
            </label>
            <input
              type="file"
              id="ticket"
              name="ticket"
              onChange={handleFileChange}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="outlined"
              color="white"
              onClick={handleSubmit}
              className="bg-teal-400"
            >
              <span>Subir</span>
            </Button>
            <Button
              variant="outlined"
              color="white"
              onClick={handleSetSubirTicket}
              className="mr-1 bg-red-300"
            >
              <span>Cerrar</span>
            </Button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
};

export default FormSubirTicket;
