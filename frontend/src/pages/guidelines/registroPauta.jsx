import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Select,
  Option,
  Alert,
  Radio,
  Textarea,
  Dialog,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import Alerta from "@/components/Alerta";
import FormCrearPauta from "@/components/Pautas/formCrearPauta";
import FormEditarPauta from "@/components/Pautas/formEditarPauta";

export function RegistroPauta() {
  const params = useParams();
  const idCliente = params.id;
  const [alerta, setAlerta] = useState([]);
  const [openExc, setOpenExc] = useState(false);
  const [excel, setExcel] = useState(null);
  const [pautas, setPautas] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [openSure, setOpenSure] = useState(false);
  const handleOpenExc = () => setOpenExc(!openExc);
  const userId = params.id;
  const clientId = params.id;
  let pautaId = "";

  const handleActive = async (id) => {
    // console.log(pautaId);
    const activo = async () => {
      try {
        const { data } = await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/ticket/editar-pauta/${pautaId}`
        );
        console.log(data);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        window.location.reload();
      } catch (error) {
        console.log(error.msg);
      }
    };
    activo();
  };

  const [mensaje, setMensaje] = useState("");
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // console.log(userId);
    const listPautas = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/ticket/mostrar-pauta/${idCliente}`
        );
        // console.log(idCliente);
        console.log(data[0][0]);
        setPautas(data[0]);
      } catch (error) {
        console.log(error.msg);
      }
    };

    const office = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/obtener-cliente2/${clientId}`
        );
        // console.log(data[0]);
        setCliente(data[0][0]);
      } catch (error) {
        console.log(error.msg);
      }
    };

    office();
    listPautas();
  }, []);

  const handleSubmit = async (values) => {
    let pauta = new FormData();
    // setExcel(values)
    // console.log(values})
    // let pauta = values.pauta
    // console.log(excel)

    pauta.set("pauta", excel);

    // console.log(pauta.get("pauta"))

    const envExcel = async () => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-pautaEx/${idCliente}`,
          pauta,
        );
        console.log(data)
      } catch (error) {
        console.log(error.msg)
      }
    }
    envExcel()
  };

  const handleAutorizar = async (e) => {
    const pautaId = e.target.value;
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/ticket/autorizar-pauta/`,
        { pautaId }
      );
      console.log(data);
      setIsError(false);
      setMensaje(data.msg);
      setVisible(true);
    } catch (error) {
      console.log(error.msg);
      setIsError(true);
      setMensaje(error.msg);
      setVisible(true);
    }
  };

  const handleVisible = (visibility) => {
    setVisible(visibility);
  };

  const handleFileChange = (e) => {
    setExcel(e.target.files[0]);
  };

  const handleOpenSure = () => setOpenSure(!openSure);

  // console.log(cliente);
  pautaId = pautas[0]?.pautaId

  return (
    <div className="mt-3 mb-8 flex flex-col gap-12">
      <div className="flex-col-2 flex h-auto w-full items-center justify-center gap-x-6 pr-5">
        <FormCrearPauta idCliente={idCliente} />
        <Button
          onClick={handleOpenExc}
          variant="outlined"
          className="w-60 bg-teal-400"
          color="white"
        >
          Registrar Pauta por Excel
        </Button>
        <Dialog
          size="lg"
          open={openExc}
          handler={handleOpenExc}
          className="justify-up h-auto bg-transparent shadow-none"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <form encType="multipart/form-data">
            <Card className="w-100 mt-10">
              <CardHeader
                variant="filled"
                color="light-blue"
                className="mb-4 grid h-24 place-items-center bg-teal-400"
              >
                <Typography variant="h3" color="white">
                  Registrar pauta por Excel
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-around gap-4">
                  <input
                    // name="excel"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <Button
                    color="white"
                    variant="outlined"
                    fullWidth
                    className="bg-teal-400"
                    onClick={handleSubmit}
                  >
                    Registrar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </form>
        </Dialog>
      </div>

      <div className="">
        <Card>
          <CardHeader
            variant="filled"
            color="white"
            className="mb-8 flex justify-between bg-teal-400 p-6"
          >
            <Typography variant="h5" color="white">
              Pauta actual de {cliente.companyName}
            </Typography>
          </CardHeader>

            {visible && (
              <Alert
                className=""
                color={isError ? "orange" : "green"}
                dismissible={{
                  onClose: () => {
                    handleVisible(false);
                  },
                }}
              >
                {mensaje}
              </Alert>
            )}
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 max-h-[500px]">
            <table className="mx-1 w-full min-w-[640px] table-auto">
              <thead>
                <tr className="w-100">
                  {[
                    "#",
                    "Fecha",
                    "Objetivo",
                    "Tema",
                    "Copy",
                    "Diseño, ideas o frases",
                    "Nuevo",
                    "Republicación",
                    "Link",
                    "Tipo de contenido",
                    "Plataforma",
                    "Elaborado por",
                    "#Ticket",
                    "Opciones",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border border-blue-gray-100 py-3 px-5 text-center"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pautas.map(
                  (
                    {
                      taskId,
                      // fecha,
                      objetivo,
                      tema,
                      copy,
                      diseñoLink,
                      nuevo,
                      republicacion,
                      dif,
                      name,
                      firstLastName,
                      secondLastName,
                      tipoContenido,
                      plataforma,
                      ticketId,
                      pautaId,
                    },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === pautas.length
                        ? ""
                        : "border-b border-blue-gray-100 text-center"
                    }`;
                    const className2 = `py-3 px-5 ${
                      key === pautas.length
                        ? ""
                        : "text-xs font-semibold text-blue-gray-600 whitespace-pre-wrap"
                    }`;
                    const numero = key + 1;
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <Typography className={className2}>
                            {numero}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {/* {fecha.substring(0, 10)} */} 12
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {objetivo}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>{tema}</Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>{copy}</Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>{dif}</Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {nuevo == 1 ? "Si" : "No"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {republicacion == 1 ? "Si" : "No"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {diseñoLink}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {tipoContenido}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {plataforma}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {name} {firstLastName}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className={className2}>
                            {ticketId}
                          </Typography>
                        </td>
                        <td className="flex flex-col">
                          <FormEditarPauta
                            taskID={taskId}
                            idCliente={idCliente}
                          />
                          <Button
                            className="bg-teal-900"
                            onClick={handleAutorizar}
                            size="sm"
                            value={pautaId}
                          >
                            Autorizar
                          </Button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter>
            <Button
              color="white"
              variant="outlined"
              className="w-full bg-teal-400"
              onClick={handleOpenSure}
            >
              Terminar pauta
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Dialog
        open={openSure}
        handler={handleOpenSure}
        className="justify-up h-auto bg-transparent shadow-none"
      >
        <Card className="w-100">
          <CardBody className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-around gap-4">
              <Typography variant="h3" className="text-center">
                ¿Está seguro de terminar la pauta?
              </Typography>
            </div>
          </CardBody>
          <CardFooter>
            <div className="w-100 flex flex-nowrap">
              <Button
                color="white"
                variant="outlined"
                className="w-full bg-teal-400"
                onClick={handleActive}
              >
                Si, terminar
              </Button>
              <Button
                color="white"
                variant="outlined"
                className="w-full bg-red-700"
                onClick={handleOpenSure}
              >
                No, cancelar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default RegistroPauta;
