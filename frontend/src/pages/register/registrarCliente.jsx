import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,    
    Button,
    Select,
    Option,
  
  } from "@material-tailwind/react";
  import axios from "axios";
  import { useState, Fragment, useEffect } from "react";
  import { Form, Formik } from "formik";
  import Alerta from "@/components/Alerta";

  export function RegistroCliente() {

    const [workers, setWorkers] = useState([])    
    const [subscriptions, setSubscriptions] = useState([])    
    const [workerInCharge, setWorkerInCharge] = useState('')
    const [subscription, setSubscription] = useState('')
    const [alerta, setAlerta] = useState([])

    // console.log(workers)

    useEffect(()=>{
      const listWorkers = async () =>{
        try {
          const {data} = await axios.get(            
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar-cliente/`            
          );                      
          // console.log(data)                   
          setWorkers(data[0])  
          setSubscriptions(data[1])
        } catch (error) {
          console.log(error.msg)
        }
      }
      listWorkers()
    },[])

    const handleWorkerInCharge = e =>{      
      setWorkerInCharge(e)      
    }

    const handleSubscription = e => {      
      setSubscription(e)      
    }
 
    const handleSubmit = async (values, {resetForm}) => {      

      // console.log(values)
      console.log(`W ID:${workerInCharge}, tipo:${typeof(workerInCharge)}`)      
      console.log(`S ID:${subscription}, tipo:${typeof(subscription)}`)
      const {companyName, email, password, password2, priority} = values        

      if([companyName, email, password, password2, workerInCharge, subscription, priority].includes('')){
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
          return
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setAlerta({
          msg: 'El correo electrónico es invalido.',
          error: true
        })
        return
      }

      if (password !== password2){
        setAlerta({
          msg: 'Las contraseñas no coinciden.',
          error: true
        })
          return
      }

      setAlerta({})
      
      try {          

          const {data} = await axios.post(
            //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar-cliente/`,
            {companyName, email, password, workerInCharge, subscription, priority}
          );  

          console.log(data)

          handleWorkerInCharge('')
          handleSubscription('')
        
          setAlerta({
            msg: data.msg,
            error: false
          });           
          
          resetForm()

                    
        } catch (error) {
          console.log(error)
          const {data} = error.response                        
          setAlerta({
            msg: data.msg,
            error: true
          })
        }
    }

    const {msg} = alerta

  return (

    <>
      <Formik
        initialValues={{
          companyName: "",
          email: "",
          password: "",
          password2: "",   
          priority: 0,          

        }}
        
        onSubmit = { handleSubmit }
      >
        {({
          handleChange,
          handleSubmit, 
          values
        }) => (
          <Form>
            <Card className="mx-auto my-5 w-4/5 md:w-4/5">
              <CardHeader
                variant="gradient"                
                className="mb-4 grid h-28 place-items-center bg-teal-300"
              >
                <Typography variant="h3" color="white">
                  Registrar Cliente
                </Typography>
              </CardHeader>

              {msg && 
                  <Alerta 
                    alerta={alerta}/>
              }

              <CardBody 
                  className="flex flex-col gap-4">
                <Input 
                  name="companyName" 
                  label="Nombre del Cliente" 
                  size="lg" 
                  onChange={handleChange}
                  value={values.name}
                  />
                <Input
                  name="email"
                  type="email"
                  label="Correo electrónico"
                  size="lg"
                  onChange={handleChange}
                  value={values.email}
                />
                <div className="flex justify-around gap-4">
                  <Input
                    name="password"
                    type="password"
                    label="Contraseña"
                    size="lg"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Input
                    name="password2"
                    type="password"
                    label="Repite la contraseña"
                    size="lg"
                    onChange={handleChange}
                    value={values.password2}
                  />            
                </div>
                <div className="flex justify-around gap-4">
                  <Input
                    name="priority"
                    type="number"
                    label="Prioridad"
                    size="lg"
                    value={values.priority}
                    onChange={handleChange}
                    min={0}
                  />              

                </div>
                <div className="flex justify-around gap-4">
                  <Select
                    label="Encargado"
                    size="md"                    
                    onChange={handleWorkerInCharge}
                  >                  
                    {Object.keys(workers).length > 0 ?
                       workers.map(({id, active, firstLastName, name, secondLastName}) => 
                        <Option
                          value={(id).toString()}
                          key={id}                      
                        >
                          {name} {firstLastName} {secondLastName}
                        </Option>)
                      : <Option value="-1">No hay encargados todavía.</Option>
                    }
                  </Select>
                  <Select
                    label="Suscripción"
                      size="md"
                      onChange={handleSubscription}
                    >
                      {                      
                        subscriptions.map( tipoPaquete =>
                          <Option
                            key={tipoPaquete.id}
                            value={(tipoPaquete.id).toString()}
                          >
                            {tipoPaquete.name}
                          </Option>
                        )                    
                      } 

                  </Select>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button                   
                  variant="filled" 
                  fullWidth
                  onClick={handleSubmit}
                  className="bg-teal-300"
                  >
                  Registrar Trabajador
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </>

  );
}

export default RegistroCliente;
