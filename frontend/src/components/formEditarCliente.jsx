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
  
  } from "@material-tailwind/react";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { Form, Formik } from "formik";
  import Alerta from "@/components/Alerta";

  export function FormEditarCliente({cliente, isEditing, setIsEditing, encargados}) {

    const [alerta, setAlerta] = useState([])
    const [workers, setWorkers] = useState([])
    const [encargado, setEncargado] = useState('')  
    
    const handleCancelar = () =>{
      setIsEditing(false)
  }

  const handleEncargado = e =>{
    // console.log(`e ${e} , tipo de ${typeof(e)}`)
    setEncargado(e)
  }

    const handleSubmit = async (values, {resetForm}) => {
      console.log(values)
      const {companyName, email, priority} = values        

      if([companyName, email, priority].includes('')){
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
          return
      }

      if(encargado === 0){
        return
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setAlerta({
          msg: 'El correo electrónico es invalido.',
          error: true
        })
        return
      }

      setAlerta({})
      
      try {          
          // const {data} = await axios.post(
          //   //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
          //   `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar-usuario/`,
          //   {name, apPaterno, apMaterno, email, dateJoined, phone, birthDate, emerPhone}
          // );  

          // console.log(data)
        
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
    // console.log(encargados)

  return (
    
    <> 
      <Formik
        initialValues={{
          companyName: cliente.companyName,
          email: cliente.email,
          priority: cliente.priority,
        }}
        
        onSubmit = { handleSubmit }
      >
        {({
          handleChange,
          handleSubmit, 
          values
        }) => (
          <>
            <Form>                            
              <Card className="shadow-none">

                {msg && 
                    <Alerta 
                      alerta={alerta}/>
                }

                <CardBody 
                    className="flex flex-col gap-4 pl-0">
                  <Input 
                    name="companyName" 
                    label="Nombre de la empresa" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={cliente.companyName}
                  //   value={values.name}
                    />
                  <Input
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    size="md"
                    variant="outlined"
                    disabled={!isEditing}
                    onChange={handleChange}
                      defaultValue={values.email ?? cliente.email}
                  />      
                   
                  <Input
                  //Esto no se debe mostrar al cliente
                    name="priority"
                    type="number"
                    label="Prioridad"
                    size="md"
                    variant="outlined"
                    min={1}
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={values.priority ?? cliente.priority}
                  />   
                  {isEditing ? 
                    <Select
                      label="Encargado"
                      value={values.id}   
                      size="md"
                      disabled={!isEditing}
                      onChange={handleEncargado}     
                    >
                      {encargados.map(encargado=>(
                        <Option
                          value={encargado.id.toString()}
                          key={encargado.id}
                          
                        >
                          {encargado.name} {encargado.firstLastName} {encargado.secondLastName}
                        </Option>
                      ))}
                    </Select>
                    :
                    <Input
                    //Esto no se debe mostrar al cliente
                      name="inCharge"
                      label="Encargado"
                      size="md"
                      variant="outlined"
                      disabled={true}                      
                      value={`${cliente.name} ${cliente.firstLastName} ${cliente.secondLastName}`}
                    />       

                  }    


                </CardBody>
                {isEditing && (
                  <CardFooter className="pt-0 pl-0 flex gap-3">
                    <Button 
                      color="white" 
                      variant="outlined" 
                      fullWidth
                      onClick={handleCancelar}
                      className="bg-red-300"
                      >
                        
                      Cancelar
                    </Button>
                    <Button 
                      color="white" 
                      variant="outlined" 
                      fullWidth
                      onClick={handleSubmit}
                      className="bg-teal-400"
                      >
                      Guardar
                    </Button>
                  </CardFooter>

                )}
              </Card>
            </Form>
          </>
        )}
      </Formik>
    </>

  );
}

export default FormEditarCliente;
