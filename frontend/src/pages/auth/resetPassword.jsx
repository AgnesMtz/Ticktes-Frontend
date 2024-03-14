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
  import { useNavigate, useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  function ResetPassword() {
      
    const params = useParams()

    
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [tokenValido, isTokenValido] = useState(true);

    const {token} = params
    
    useEffect(() => {
        const comprobarToken = async () =>{
            try {              
                const {data} = await axios.get(
                    //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
                    `${import.meta.env.VITE_BACKEND_URL}/validate_token/${params.token}`
                );  
                console.log(data)
            } catch (error) {
                isTokenValido(false)
                console.log(error)
            }
        }
        comprobarToken()
    }, []);

    const handleVisible = (visibility) => {
        setVisible(visibility);
    };
  
    const handleSubmit = async (values, {resetForm}) =>{
      const {password, password2} = values
      
      if (password !== password2){
        console.log(password)
        setMessage('Las contraseñas no coinciden.')
        setIsError(true)
        handleVisible(true)
        return
      }

      try {
        const {data} = await axios.put(
          //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
          `${import.meta.env.VITE_BACKEND_URL}/recover_password/`,
          {password, token}          
          );
          
        setMessage('Contraseña actualizada.')
        setIsError(false)
        handleVisible(true)
        
      } catch (error) {
        console.log(error)
      }

      resetForm()
      // handleVisible(false)
  
      }
  
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
              password : "",
              password2 : "",
              
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
                  {tokenValido ? (
                    <>                    
                      <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                      >
                        <Typography variant="h3" color="white">
                          Resetear Contraseña
                        </Typography>
                      </CardHeader>
                      {visible && (
                        <CardHeader className="top-5">
                          <Alert
                            color={isError ? "orange" : "green"}
                            dismissible={{
                              onClose: () => {
                                handleVisible(false);
                              },
                            }}                        
                          >
                            {message}
                          </Alert>
                        </CardHeader>
                      )}
                      <CardBody className="flex flex-col gap-4">
                        <Input
                            type="password"
                            label="Contraseña"
                            size="lg"
                            name="password"
                            onChange={handleChange}
                            value = {values.password}
                        />
                        <Input
                            type="password"
                            label="Repetir contraseña"
                            size="lg"
                            name="password2"
                            onChange={handleChange}
                            value = {values.password2}
                        />
                      </CardBody>
                      <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={handleSubmit}>
                          Cambiar contraseña
                        </Button>
                        <Button className="mt-2" variant="text" onClick={() => {navigate('/')}}>Iniciar Sesión</Button>
                      </CardFooter>
                    </>

                  ) : (
                    <CardHeader
                        variant="gradient"
                        color="red"
                        className="mb-4 grid h-28 place-items-center"
                      >
                        <Typography variant="h3" color="white">
                          Token no valido
                        </Typography>
                      </CardHeader>
                  )}
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }
  
  export default ResetPassword;
  