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
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import Alerta from "@/components/Alerta";

const FormEditarPauta = ({ taskID, idCliente }) => {

    const [task, setTask] = useState({});
    const [pautas, setPautas] = useState([])
    const [open, setOpen] = useState(false);
    const [alerta, setAlerta] = useState([])
    const [trabajadores, setTrabajadores] = useState([])
    const [trabajador, setTrabajador] = useState(0)
    const handleOpen = () => {
        handleItems();
        setOpen(!open)
    };
    const handleWorker = e => {
        setTrabajador(parseInt(e))
    }

    useEffect(() => {
        const listPautas = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/ticket/mostrar-pauta/${idCliente}`,
                );
                //   console.log(data)
                setPautas(data)
            } catch (error) {
                console.log(error.msg)
            }
        }
        listPautas()
        const listTrabajadores = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-pauta/`
                );
                // console.log(data)                   
                setTrabajadores(data[0])
            } catch (error) {
                console.log(error.msg)
            }
        }
        listTrabajadores()
    }, []);

    const handleItems = async () => {
        for (let i = 0; i < pautas.length; i++) {
            if (pautas[i].taskId === taskID) {
                setTask(pautas[i])
                break;
            }
        }
    };

    const handleSubmit = async (values) => {
        // console.log(values)
        // console.log(trabajador)
        // console.log(taskID)
        const { objetivo, tema, copy, dif, tipoContenido, plataforma, disenoLink, nuevo, republicacion } = values

        setAlerta({})
        try {
            const { data } = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/ticket/mostrar-pauta/${taskID}`,
                {objetivo, tema, copy, dif, tipoContenido, plataforma, disenoLink, nuevo, republicacion, trabajador}
            );
            setAlerta({
                msg: data.msg,
                error: false
            }); 

            // resetForm()
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    };
    const { msg } = alerta

    // console.log(task)

    return (
        <div className="mt-8 mb-8 flex flex-col gap-12">
            <Button
                color="white"
                variant="outlined"
                fullWidth
                className="bg-teal-400 w-auto rounded-10 flex items-center justify-center  m-0"
                onClick={handleOpen}
            >
                <PencilSquareIcon className="w-5 h-4" />
            </Button>
            <Dialog size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none h-full overflow-y-auto justify-center"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >

                <Formik
                    initialValues={{
                        objetivo: task.objetivo,
                        tema: task.tema,
                        copy: task.copy,
                        dif: task.dif,
                        nuevo: task.nuevo,
                        republicacion: task.republicacion,
                        tipoContenido: task.tipoContenido,
                        plataforma: task.plataforma,
                        disenoLink: task.disenoLink,
                    }}

                    onSubmit={handleSubmit}

                >
                    {({
                        handleChange,
                        handleSubmit,
                        values
                    }) => (
                        <Form>
                            <Card className="w-100 mt-10">
                                <CardHeader
                                    variant="filled"
                                    color="light-blue"
                                    className="mb-4 grid h-24 place-items-center bg-teal-400"
                                >
                                    <Typography variant="h3" color="white">
                                        Modificar linea de pauta
                                    </Typography>
                                </CardHeader>

                                {msg &&
                                    <Alerta
                                        alerta={alerta} />
                                }

                                <CardBody
                                    className="flex flex-col w-100">
                                    <div className="flex flex-wrap justify-around gap-4 w-100">
                                        <div
                                            className="flex justify-around gap-x-5 w-full"
                                        >
                                            <Input
                                                type="text"
                                                name="objetivo"
                                                label="Objetivo de la pauta"
                                                size="lg"
                                                onChange={handleChange}
                                                defaultValue={task.objetivo}
                                            />
                                            <Input
                                                type="text"
                                                name="tema"
                                                label="Tema de la pauta"
                                                size="lg"
                                                onChange={handleChange}
                                                defaultValue={task.tema}
                                            />
                                        </div>
                                        <Textarea
                                            type="text"
                                            name="copy"
                                            label="Copy de la pauta"
                                            size="lg"
                                            onChange={handleChange}
                                            defaultValue={task.copy}
                                        />
                                        <div className="flex justify-around gap-x-5 w-full">

                                            <Input
                                                type="text"
                                                name="tipoContenido"
                                                label="Tipo de contenido"
                                                size="lg"
                                                onChange={handleChange}
                                                defaultValue={task.tipoContenido}
                                            />
                                            <Input
                                                type="text"
                                                name="plataforma"
                                                label="Plataforma"
                                                size="lg"
                                                onChange={handleChange}
                                                defaultValue={task.plataforma}
                                            />
                                        </div>
                                        <Input
                                            type="text"
                                            name="disenoLink"
                                            label="Link de diseño"
                                            size="lg"
                                            onChange={handleChange}
                                            defaultValue={task.disenoLink}
                                        />
                                        <Textarea
                                            name="dif"
                                            type="text"
                                            label="Diseño, ideas o frases"
                                            size="lg"
                                            onChange={handleChange}
                                            defaultValue={task.dif}
                                        />
                                    </div>
                                    <div className="flex justify-center p-3 gap-x-4 w-full">
                                        <Typography variant="h6" color="gray"> Nueva Pauta </Typography>
                                        <Field
                                            name="nuevo"
                                            type="checkbox"
                                            onChange={handleChange}
                                            defaultValue={task.nuevo}
                                        />
                                        <Typography variant="h6" color="gray"> Republicación </Typography>
                                        <Field
                                            name="republicacion"
                                            type="checkbox"
                                            onChange={handleChange}
                                            defaultValue={task.republicacion}
                                        />
                                    </div>
                                    <div className="flex w-full">
                                        <Select value={trabajador} className="rounded-xl" onChange={handleWorker} size="lg" label="Trabajador">
                                            {trabajadores.map(({ id, name, firstLastName, secondLastName }, key) => {
                                                key === trabajadores.length - 1
                                                return (
                                                    <Option value={id} key={id}>{name} {firstLastName} {secondLastName}</Option>
                                                )
                                            }
                                            )}
                                        </Select>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button
                                        color="white"
                                        variant="outlined"
                                        fullWidth
                                        className="bg-teal-400"
                                        onClick={handleSubmit}
                                    >
                                        Registrar línea de pauta
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </Dialog>

        </div>
    )
}

export default FormEditarPauta