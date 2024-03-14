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
import { useState, useEffect } from "react";
import { Form, Formik, Field } from "formik";
import axios from "axios";
import Alerta from "@/components/Alerta";

const FormCrearPauta = ({ idCliente }) => {

    const [trabajadores, setTrabajadores] = useState([])
    const [trabajador, setTrabajador] = useState(-1)
    const [clientes, setClientes] = useState([])
    const [alerta, setAlerta] = useState([])
    // console.log(idCliente)
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        const listTrabajadores = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-pauta/`
                );
                // console.log(data)                   
                setTrabajadores(data[0])
                setClientes(data[1])
            } catch (error) {
                console.log(error.msg)
            }
        }
        listTrabajadores()
    }, [])

    const handleWorker = e => {
        setTrabajador(parseInt(e))
    }

    const handleSubmit = async (values, { resetForm }) => {
        // console.log(values)
        const { objetivo, tema, copy, dif, tipoContenido, plataforma, disenoLink, nuevo, republicacion } = values

        if ([objetivo, tema, copy, tipoContenido, plataforma].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        try {
            const { data } = await axios.post(
                //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
                `${import.meta.env.VITE_BACKEND_URL}/api/ticket/crear-pauta/`,
                { objetivo, tema, copy, dif, tipoContenido, plataforma, disenoLink, nuevo, republicacion, idCliente, trabajador }
            );

            // console.log(data)

            setAlerta({
                msg: data.msg,
                error: false
            });

            resetForm()
            window.location.reload()

        } catch (error) {
            console.log(error)
            const { data } = error.response
            setAlerta({
                msg: data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" className="w-60 bg-teal-400" color="white">
                Registrar pauta por línea
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
                        objetivo: "",
                        tema: "",
                        copy: "",
                        dif: "",
                        nuevo: false,
                        republicacion: false,
                        tipoContenido: "",
                        plataforma: "",
                        disenoLink: ""
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
                                    variant="outlined"
                                    color="light-blue"
                                    className="mb-4 grid h-24 place-items-center bg-teal-400"
                                >
                                    <Typography variant="h3" color="white">
                                        Registrar Pauta
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
                                                value={values.objetivo}
                                            />
                                            <Input
                                                type="text"
                                                name="tema"
                                                label="Tema de la pauta"
                                                size="lg"
                                                onChange={handleChange}
                                                value={values.tema}
                                            />
                                        </div>
                                        <Textarea
                                            type="text"
                                            name="copy"
                                            label="Copy de la pauta"
                                            size="lg"
                                            onChange={handleChange}
                                            value={values.copy}
                                        />
                                        <div className="flex justify-around gap-x-5 w-full">

                                            <Input
                                                type="text"
                                                name="tipoContenido"
                                                label="Tipo de contenido"
                                                size="lg"
                                                onChange={handleChange}
                                                value={values.tipoContenido}
                                            />
                                            <Input
                                                type="text"
                                                name="plataforma"
                                                label="Plataforma"
                                                size="lg"
                                                onChange={handleChange}
                                                value={values.plataforma}
                                            />
                                        </div>
                                        <Input
                                            type="text"
                                            name="disenoLink"
                                            label="Link de diseño"
                                            size="lg"
                                            onChange={handleChange}
                                            value={values.disenoLink}
                                        />
                                        <Textarea
                                            name="dif"
                                            type="text"
                                            label="Diseño, ideas o frases"
                                            size="lg"
                                            onChange={handleChange}
                                            value={values.dif}
                                        />
                                    </div>
                                    <div className="flex justify-center p-3 gap-x-4 w-full">
                                        <Typography variant="h6" color="gray"> Nueva Pauta </Typography>
                                        <Field
                                            name="nuevo"
                                            type="checkbox"
                                            onChange={handleChange}
                                        />
                                        <Typography variant="h6" color="gray"> Republicación </Typography>
                                        <Field
                                            name="republicacion"
                                            type="checkbox"
                                            onChange={handleChange}
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
        </>
    );
}

export default FormCrearPauta;