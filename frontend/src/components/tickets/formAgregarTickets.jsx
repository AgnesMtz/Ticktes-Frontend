import {
  Input,
  Button,
  Select,
  DialogBody,
  DialogFooter,
  Alert,
  Option,
  CardBody,
  CardFooter,
  Textarea,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";

const FormAgregarTicket = ({ handleModalAgregar }) => {
  //Guardar valores para los select
  const [listOriginPetition, setListOriginPetition] = useState([]);
  const [listPriority, setListPriority] = useState([]);
  const [listTicketPurpose, setListTicketPurpose] = useState([]);
  const [listState, setListState] = useState([]);
  const [listClient, setListClient] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);
  const [listInCharge, setListInCharge] = useState([]);
  const [listSupport, setListSupport] = useState([]);

  //Tomar valores de los select
  const [originPetition, setOriginPetition] = useState("");
  const [priority, setPriority] = useState("");
  const [ticketPurpose, setTicketPurpose] = useState("");
  const [client, setClient] = useState("");
  const [frequency, setFrequency] = useState([]);
  const [state, setState] = useState("");
  const [inCharge, setInCharge] = useState("");
  const [support, setSupport] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);

  const user = useAuthUser();
  const levantaTicket = user().user;

  useEffect(() => {
    const datosSelect = async () => {
      try {
        //0: Operadores Creativos, 1: Origen de la peticion, 2: Prioridad, 3: Proposito del ticket, 4: Estado
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-ticket/`
        );
        // console.log(user().user);
        setListInCharge(data[0]);
        setListSupport(data[0]);
        setListOriginPetition(data[1]);
        setListPriority(data[2]);
        setListTicketPurpose(data[3]);
        setListState(data[4]);
        setListClient(data[5]);
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

  const handleOriginPetition = (e) => {
    setOriginPetition(e);
  };

  const handlePriority = (e) => {
    setPriority(e);
  };

  const handleTicketPurpose = (e) => {
    setTicketPurpose(e);
  };

  const handleState = (e) => {
    setState(e);
  };

  const handleVisible = (visibility) => {
    setVisible(visibility);
  };

  const handleClient = (e) => {
    setClient(e);
  };

  const handleInCharge = (e) => {
    setInCharge(e);
  };

  const handleSupport = (e) => {
    setSupport(e);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const {
      petition,
      deadline,
      applicationDate,
      serverLocation,
      activitie,
      deliveryDate,
      notes,
      observations,
      corrections,
    } = values;

    if (
      [
        petition,
        deadline,
        applicationDate,
        serverLocation,
        activitie,
        deliveryDate,
        notes,
        observations,
        corrections,
        priority,
        originPetition,
        state,
        ticketPurpose,
        client,
        inCharge,
      ].includes("")
    ) {
      setMensaje("Todos los campos son obligatorios");
      setIsError(true);
      handleVisible(true);
      // return
    }
    console.log({
      values,
      priority,
      originPetition,
      state,
      ticketPurpose,
      client,
      inCharge,
      support,
      frequency,
      socialMedia,
      levantaTicket,
    });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-ticket`,
        { values,
          priority,
          originPetition,
          state,
          ticketPurpose,
          client,
          inCharge,
          support,
          frequency,
          socialMedia,
          levantaTicket, }
      );

      console.log(data);
      setIsError(false);
      setMensaje("Ticket agregado con éxito.");
      handleVisible(true);

      setTimeout(() => {
        resetForm();
        handleModalAgregar();        
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          petition: "",
          deadline: "",
          applicationDate: "",
          serverLocation: "",
          activitie: "",
          deliveryDate: "",
          notes: "",
          observations: "",
          corrections: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Form>
              <DialogBody
                divider
                className="flex h-[25rem] w-full flex-col gap-3 overflow-auto md:h-[40rem]"
              >
                {visible && (
                  <Alert
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
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Select label="Cliente" size="md" onChange={handleClient}>
                    {listClient.map((cliente) => (
                      <Option key={cliente.id} value={cliente.id.toString()}>
                        {cliente.companyName}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    label="Origen de la petición"
                    size="md"
                    onChange={handleOriginPetition}
                  >
                    {listOriginPetition.map((origin) => (
                      <Option key={origin.id} value={origin.id.toString()}>
                        {origin.name}
                      </Option>
                    ))}
                  </Select>

                  <Select label="Encargado" size="md" onChange={handleInCharge}>
                    {listInCharge.map((encargado) => (
                      <Option
                        key={encargado.id}
                        value={encargado.id.toString()}
                      >
                        {encargado.name +
                          encargado.firstLastName +
                          encargado.secondLastName}
                      </Option>
                    ))}
                  </Select>

                  <Select label="Soporte" size="md" onChange={handleSupport}>
                    {listSupport.map((soporte) => (
                      <Option key={soporte.id} value={soporte.id.toString()}>
                        {soporte.name +
                          soporte.firstLastName +
                          soporte.secondLastName}
                      </Option>
                    ))}
                  </Select>
                </div>

                <Textarea
                  name="petition"
                  label="Petición"
                  size="md"
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={values.petition}
                  rows={2}
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Input
                    name="deadline"
                    type="date"
                    label="Fecha límite"
                    size="md"
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={values.deadline}
                  />

                  <Select label="Prioridad" size="md" onChange={handlePriority}>
                    {listPriority.map((prioridad) => (
                      <Option
                        key={prioridad.id}
                        value={prioridad.id.toString()}
                      >
                        {prioridad.name}
                      </Option>
                    ))}
                  </Select>

                  <Input
                    name="applicationDate"
                    type="datetime-local"
                    label="Fecha de solicitud"
                    size="md"
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={values.applicationDate}
                  />

                  <Select
                    label="Proposito del ticket"
                    size="md"
                    onChange={handleTicketPurpose}
                  >
                    {listTicketPurpose.map((proposito) => (
                      <Option
                        key={proposito.id}
                        value={proposito.id.toString()}
                      >
                        {proposito.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <Input
                  name="serverLocation"
                  label="Ubicación del servidor"
                  size="md"
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={values.serverLocation}
                />

                <Textarea
                  name="activitie"
                  label="Actividad"
                  size="md"
                  variant="outlined"
                  onChange={handleChange}
                  defaultValue={values.activitie}
                />

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <MultiSelect
                    className="!text-left !font-sans !font-normal !text-blue-gray-700"
                    options={optionsFrequency}
                    isMulti
                    value={frequency}
                    onChange={setFrequency}
                    labelledBy="Frecuencia"
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

                  <MultiSelect
                    className="!text-left !font-sans !font-normal !text-blue-gray-700"
                    options={optionsSocialMedia}
                    isMulti
                    value={socialMedia}
                    onChange={setSocialMedia}
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
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="flex flex-col justify-around gap-3">
                    <Select label="Estado" size="md" onChange={handleState}>
                      {listState.map((estado) => (
                        <Option key={estado.id} value={estado.id.toString()}>
                          {estado.type}
                        </Option>
                      ))}
                    </Select>

                    <Input
                      name="deliveryDate"
                      type="datetime-local"
                      label="Fecha de entrega"
                      size="md"
                      variant="outlined"
                      onChange={handleChange}
                      defaultValue={values.deliveryDate}
                    />
                  </div>
                  <Textarea
                    name="notes"
                    label="Notas"
                    size="md"
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={values.notes}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Textarea
                    name="observations"
                    label="Observaciones"
                    size="md"
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={values.observations}
                  />

                  <Textarea
                    name="corrections"
                    label="Correcciones"
                    size="md"
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={values.corrections}
                  />
                </div>
              </DialogBody>

              <DialogFooter>
                <Button
                  variant="outlined"
                  color="white"
                  onClick={handleSubmit}
                  className="bg-teal-400"
                >
                  <span>Agregar</span>
                </Button>
                <Button
                  variant="outlined"
                  color="white"
                  onClick={handleModalAgregar}
                  className="mr-1 bg-red-300"
                >
                  <span>Cancelar</span>
                </Button>
              </DialogFooter>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormAgregarTicket;
