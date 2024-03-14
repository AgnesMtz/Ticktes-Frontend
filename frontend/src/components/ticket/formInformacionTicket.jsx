import {
  Typography,
  Button,
  Textarea,
  Input,
  Select,
  Option,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

export function FormInformacionTicket({ rol }) {
  const [listInCharge, setListInCharge] = useState([]);
  const [listSupport, setListSupport] = useState([]);
  const [listOriginPetition, setListOriginPetition] = useState([]);
  const [listPriority, setListPriority] = useState([]);
  const [listUse, setListUse] = useState([]);
  const [listState, setListState] = useState([]);
  const [listFrequency, setListFrequency] = useState([]);
  const [listSocialMedia, setListSocialMedia] = useState([]);

  //Datos del ticket a mostrar
  const [datos, setDatos] = useState([]);

  const [inCharge, setInCharge] = useState("");
  const [support, setSupport] = useState("");
  const [originPetition, setOriginPetition] = useState("");
  const [priority, setPriority] = useState("");
  const [use, setUse] = useState("");
  const [state, setState] = useState("");

  const [editar, setEditar] = useState(false);
  const params = useParams();

  useEffect(() => {
    const datosSelect = async () => {
      try {
        //0: Info del ticket, 1: Operadores Creativos, 2: Origen de la peticion, 3: Prioridad, 4: Proposito del ticket, 5: Estado
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/ticket/mostrar-ticket/${
            params.id
          }`
        );
        console.log(data);
        setDatos(data[0][0]);
        setListInCharge(data[1]);
        setListSupport(data[1]);
        setListOriginPetition(data[2]);
        setListPriority(data[3]);
        setListUse(data[4]);
        setListState(data[5]);
      } catch (error) {
        console.log(error.msg);
      }
    };
    datosSelect();
  }, []);

  const optionsFrequency = [
    { value: "monday", label: "Lunes" },
    { value: "tuesday", label: "Martes" },
    { value: "wednesday", label: "Miércoles" },
    { value: "thursday", label: "Jueves" },
    { value: "friday", label: "Viernes" },
    { value: "saturday", label: "Sabado" },
    { value: "sunday", label: "Domingo" },
  ];
  const optionsSocialMedia = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "whatsapp", label: "Whatsapp" },
    { value: "linkedIn", label: "LinkedIn" },
    { value: "tiktok", label: "Tik Tok" },
    { value: "blog", label: "Blog" },
  ];

  const handleSubmit = (values, { resetForm }) => {};

  const handleEditar = (e) => {
    setEditar(e);
    console.log(e);
  };

  const handleSupport = (e) => {
    setSupport(e);
  };

  const handleInCharge = (e) => {
    setInCharge(e);
  };

  const handleOriginPetition = (e) => {
    setOriginPetition(e);
  };

  const handlePriority = (e) => {
    setPriority(e);
  };

  const handleUse = (e) => {
    setUse(e);
  };

  const handleState = (e) => {
    setState(e);
  };

  const handleAprove = async () => {
    try {
      const ticketId = params.id;
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/ticket/editar-estadoAprobado/${ticketId}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const ticketId = params.id;
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/ticket/editar-estadoCancelado/${ticketId}`
      );
      console.log(data);
    } catch (error) {
      console.log(error.msg);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          petition: datos.petition,
          applicationDate: datos.applicationDate,
          deadline: datos.deadline,
          deliveryDate: datos.deliveryDate,
          serverLocation: datos.serverLocation,
          activitie: datos.activitie,
          notes: datos.notes,
          observations: datos.observations,
          corrections: datos.corrections,
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Form>
              <CardBody className="h-[45rem] overflow-auto">
                <Typography variant="h6">Cliente:</Typography>
                <Input
                  name="companyName"
                  className="rounded-md p-1 text-lg"
                  variant="static"
                  size="md"
                  value={datos.companyName ? datos.companyName : ""}
                  disabled
                />
                <Typography variant="h6">Petición:</Typography>
                <Textarea
                  name="petition"
                  className="rounded-md p-1 text-lg"
                  variant="static"
                  size="md"
                  rows={2}
                  disabled={editar ? false : true}
                  onChange={handleChange}
                  defaultValue={values.petition ?? datos.petition}
                />
                <div className="flex flex-wrap justify-between">
                  <div>
                    <Typography variant="h6">Origen de la petición:</Typography>
                    {editar ? (
                      <Select
                        variant="standard"
                        className="rounded-md"
                        value={datos.originPetitionName}
                        // onChange={handleOriginPetition}
                      >
                        {listOriginPetition.map((origen) => (
                          <Option value={origen.id.toString()} key={origen.id}>
                            {origen.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        variant="standard"
                        disabled={true}
                        value={datos.originPetitionName}
                      />
                    )}
                  </div>
                  <div>
                    <Typography variant="h6">Fecha de entrega:</Typography>
                    <Input
                      name="deliveryDate"
                      size="md"
                      variant="standard"
                      type="date"
                      value={
                        values.deliveryDate
                          ? values.deliveryDate.substring(0, 10)
                          : datos.deliveryDate
                          ? datos.deliveryDate.substring(0, 10)
                          : ""
                      }
                      onChange={handleChange}
                      disabled={editar ? false : true}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Prioridad:</Typography>
                    {editar ? (
                      <Select
                        variant="standard"
                        value={datos.PriorityName}
                        className="rounded-md"
                        // onChange={handlePriority}
                      >
                        {listPriority.map((prioridad) => (
                          <Option
                            value={prioridad.id.toString()}
                            key={prioridad.id}
                          >
                            {prioridad.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        variant="standard"
                        disabled={true}
                        value={datos.PriorityName}
                      />
                    )}
                  </div>
                </div>

                <Typography variant="h6">Ubicación del servidor:</Typography>
                <Input
                  size="md"
                  variant="standard"
                  disabled={editar ? false : true}
                  className="rounded-md"
                  value={values.serverLocation ?? datos.serverLocation}
                />
                <div className="flex flex-wrap justify-between">
                  <div>
                    <Typography variant="h6">Fecha de solicitud:</Typography>
                    <Input
                      size="md"
                      variant="standard"
                      type="datetime-local"
                      value={
                        datos.applicationDate
                          ? datos.applicationDate.substring(0, 19)
                          : ""
                      }
                      disabled={editar ? false : true}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <Typography variant="h6">Uso:</Typography>
                    {editar ? (
                      <Select
                        variant="standard"
                        className="rounded-md"
                        value={datos.ticketPurposeName}
                      >
                        {listUse.map((uso) => (
                          <Option value={uso.id.toString()} key={uso.id}>
                            {uso.name}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        variant="standard"
                        disabled={true}
                        value={datos.ticketPurposeName}
                      />
                    )}
                  </div>
                  <div>
                    <Typography variant="h6">Estado:</Typography>
                    {editar ? (
                      <Select
                        variant="standard"
                        className="rounded-md"
                        value={datos.type}
                      >
                        {listState.map((estado) => (
                          <Option value={estado.id.toString()} key={estado.id}>
                            {estado.type}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        variant="standard"
                        disabled={true}
                        value={datos.type}
                      />
                    )}
                  </div>
                </div>
                <Typography variant="h6">Actividad:</Typography>
                <Textarea
                  size="md"
                  variant="standard"
                  disabled={editar ? false : true}
                  className="rounded-md"
                  value={values.activitie ?? datos.activitie}
                />
                <Typography variant="h6">Frecuencia:</Typography>
                <MultiSelect
                  className={`rounded-md !text-left !font-sans !font-normal !text-blue-gray-700`}
                  options={optionsFrequency}
                  isMulti
                  value={listFrequency}
                  onChange={setListFrequency}
                  disabled={editar ? false : true}
                  overrideStrings={{
                    allItemsAreSelected: "Todos los días",
                    clearSearch: "Clear Search",
                    clearSelected: "Clear Selected",
                    noOptions: "Sin opciones",
                    search: "Buscar",
                    selectAll: "Todos los días",
                    selectAllFiltered: "Seleccionar filtrados",
                    selectSomeItems: "Frecuencia",
                    create: "Crear",
                  }}
                />
                <Typography variant="h6">Redes sociales:</Typography>
                <MultiSelect
                  className="rounded-md !text-left !font-sans !font-normal !text-blue-gray-700"
                  options={optionsSocialMedia}
                  isMulti
                  value={listSocialMedia}
                  onChange={setListSocialMedia}
                  disabled={editar ? false : true}
                  overrideStrings={{
                    allItemsAreSelected: "Todas las redes",
                    clearSearch: "Clear Search",
                    clearSelected: "Clear Selected",
                    noOptions: "Sin opciones",
                    search: "Buscar",
                    selectAll: "Todas las redes",
                    selectAllFiltered: "Seleccionar filtrados",
                    selectSomeItems: "Redes sociales",
                    create: "Crear",
                  }}
                />
                <Typography variant="h6">Fecha de entrega:</Typography>
                <Input
                  name="deliveryDate"
                  size="md"
                  variant="standard"
                  type="datetime-local"
                  disabled={editar ? false : true}
                  className="rounded-md"
                  value={
                    values.deliveryDate
                      ? values.deliveryDate.substring(0, 19)
                      : datos.deliveryDate
                      ? datos.deliveryDate.substring(0, 19)
                      : ""
                  }
                />
                <Typography variant="h6">Notas:</Typography>
                <Textarea
                  name="notes"
                  className="rounded-md pt-0 text-lg"
                  variant="standard"
                  size="md"
                  defaultValue={values.notes ?? datos.notes}
                  disabled={editar ? false : true}
                />
                <Typography variant="h6">Observaciones:</Typography>
                <Textarea
                  className="rounded-md pt-0 text-lg"
                  variant="standard"
                  size="md"
                  value={values.observations ?? datos.observations}
                  disabled={editar ? false : true}
                />
                <Typography variant="h6">Correciones:</Typography>
                <Textarea
                  className="rounded-md pt-0 text-lg"
                  variant="standard"
                  size="md"
                  value={values.corrections ?? datos.corrections}
                  disabled={editar ? false : true}
                />
              </CardBody>
              {rol === '2'  && (
                <CardFooter>
                  <div className="flex flex-wrap justify-around">
                    {editar ? (
                      <Button
                        variant="outlined"
                        color="white"
                        onClick={handleSubmit}
                        className="bg-teal-400"
                      >
                        <span>Guardar</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="white"
                        onClick={handleAprove}
                        className="bg-teal-400"
                      >
                        <span>Aprobar</span>
                      </Button>
                    )}
                    {editar ? (
                      <Button
                        variant="outlined"
                        color="white"
                        onClick={(e) => handleEditar(!editar)}
                        className="bg-red-300"
                      >
                        <span>Cancelar</span>
                      </Button>
                    ) : (
                      <Fragment>
                        <Button
                          variant="outlined"
                          color="white"
                          onClick={(e) => handleEditar(!editar)}
                          className="bg-orange-300"
                        >
                          <span>Editar</span>
                        </Button>
                        <Button
                          variant="outlined"
                          color="white"
                          onClick={handleCancel}
                          className="bg-red-300"
                        >
                          <span>Rechazar</span>
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </CardFooter>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
