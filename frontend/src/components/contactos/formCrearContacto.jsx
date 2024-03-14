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
    DialogBody,
    DialogFooter,
    Alert,
  
  } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";


const FormCrearContacto = ({id, handleCreateContacto}) => {

    const [mensaje, setMensaje] = useState('');
    const [visible, setVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleVisible = (visibility) => {
        setVisible(visibility);
    };

    const handleSubmit = async (values, {resetForm}) =>{

        console.log(values)
        console.log(id)
      const {name, firstLastName, secondLastName, birthDate} = values

      if([name, firstLastName, secondLastName, birthDate].includes('')){
        setIsError(true)
        setMensaje('Todos los campos son obligatorios.')
        handleVisible(true)
        return
      }

      try {

        const { data } = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cliente/crear-contacto`,
            {name, firstLastName, secondLastName, birthDate, id }
            );        
  
          console.log(data)

        setIsError(false)
        setMensaje('Contacto registrado con éxito.')
        handleVisible(true)       

        setTimeout(()=>{
            resetForm()
            handleCreateContacto()
        },2000)
        } catch (error) {
            console.log(error)
        }
        // console.log(values)
    }

  return (
    <>
        <Formik
            initialValues={{
                name: "",
                firstLastName: "",
                secondLastName: "",            
                birthDate: "",            
            }}

            onSubmit={handleSubmit}
        >
            {({
            handleChange,
            handleSubmit,
            values
            }) => (
                <Form   
                    autoComplete="off"                 
                >                            
                    <DialogBody divider
                        className="flex flex-col gap-3 w-full"
                    >
                        {visible && 
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
                          }
                        <Input 
                        name="name" 
                        label="Nombre" 
                        size="md"
                        variant="outlined" 
                        onChange={handleChange}
                        defaultValue={values.name}
                        />
                        <Input 
                        name="firstLastName" 
                        label="Apellido Paterno" 
                        size="md"
                        variant="outlined" 
                        onChange={handleChange}
                        defaultValue={values.firstLastName}
                        />
                        <Input 
                        name="secondLastName" 
                        label="Apellido Materno" 
                        size="md"
                        variant="outlined" 
                        onChange={handleChange}
                        defaultValue={values.secondLastName}
                        />
                        <Input 
                        name="birthDate" 
                        type="date"
                        label="Fecha de nacimiento" 
                        size="md"
                        variant="outlined" 
                        onChange={handleChange}
                        defaultValue={values.birthDate??''}
                        />
                    </DialogBody>
                    <DialogFooter>
                    <Button
                        variant="outlined"    
                        color="white"        
                        onClick={handleCreateContacto}
                        className="mr-1 bg-red-300"
                        >
                        <span>Cancelar</span>
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="white" 
                        onClick={handleSubmit}    
                        className="bg-teal-400"
                        >
                        <span>Agregar</span>
                    </Button>
                    </DialogFooter>
                </Form>
            )}
        </Formik>
    </>
  )
}

export default FormCrearContacto