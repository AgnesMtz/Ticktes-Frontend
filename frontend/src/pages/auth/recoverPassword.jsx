import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "@/components/Alerta";

function RecoverPassword() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [alerta, setAlerta] = useState([])

  const handleVisible = (visibility) => {
    setVisible(visibility);
  };

  const handleSubmit = async (values, {resetForm}) =>{
    const {email} = values

    if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        handleVisible(true)
        return
    }
    setAlerta({})
    try {
        const {data} = await axios.post(
            //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
            `${import.meta.env.VITE_BACKEND_URL}/recover_password/`,
            {email}
        );  

        setAlerta({
            msg: data.msg,
            error: false
        })

        resetForm()
        handleVisible(false)

        console.log(data)
    } catch (error) {
        console.log(error)
        const {data} = error.response  
        setAlerta({
            msg: data.msg,
            error: true
        })
        console.log(data)
    }

    }

  const {msg} = alerta

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Formik
          initialValues={{
            //Los valores iniciales del input
            email: "",
          }}
          onSubmit={ handleSubmit }
        >
          {({
            handleChange,
            handleSubmit, 
            values
          }) => (
            <Form>
              <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
                <CardHeader
                  variant="gradient"
                  color="blue"
                  className="mb-4 grid h-28 place-items-center"
                >
                  <Typography variant="h3" color="white">
                    Recuperar Contraseña
                  </Typography>
                </CardHeader>
                {visible && (
                  <CardHeader className="top-5">
                    <Alert
                      color="orange"
                      dismissible={{
                        onClose: () => {
                          handleVisible(false);
                        },
                      }}                    
                    >
                      Correo electrónico invalido.                      
                    </Alert>
                  </CardHeader>
                )}
                {msg && (
                    <CardHeader className="top-5">
                        <Alerta 
                        alerta={alerta}/>
                    </CardHeader>
                    )
                }
                <CardBody className="flex flex-col gap-4">
                  <Input
                    type="email"
                    label="Correo electrónico"
                    size="lg"
                    name="email"
                    onChange={handleChange}
                    value = {values.email}
                  />
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" fullWidth onClick={handleSubmit}>
                    Enviar recuperación
                  </Button>
                  <Button className="mt-2" variant="text" onClick={() => navigate(-1)}>Volver</Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default RecoverPassword;
