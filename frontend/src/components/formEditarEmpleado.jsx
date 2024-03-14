import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  
  } from "@material-tailwind/react";
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { Form, Formik } from "formik";
  import Alerta from "@/components/Alerta";
  import formatoFecha from "/helpers/formatoFecha.js";  

  export function FormEditarEmpleado({usuario, isEditing, setIsEditing}) {

    const [alerta, setAlerta] = useState([])  
        

    const handleSubmit = async (values, {resetForm}) => {
      console.log(values)
      const {name, apPaterno, apMaterno, email, dateJoined, phone, birthDate, emerPhone} = values        

      if([name, apPaterno, apMaterno, email, dateJoined, phone, birthDate, emerPhone].includes('')){
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

      if (!/^\+(\d{2})\s?1?\d{10}$/.test(phone)){
        setAlerta({
          msg: 'El teléfono no es valido.',
          error: true
        })
        return
      }

      if (!/^\+(\d{2})\s?1?\d{10}$/.test(emerPhone)){
        setAlerta({
          msg: 'El teléfono de emergencia no es valido.',
          error: true
        })
        return
      }

      setAlerta({})
      
      try {          
          const {data} = await axios.post(
            //Declarar la variable VITE_BACKEND_URL en el .env del front de acuerdo a donde se ejecute la API
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar-usuario/`,
            {name, apPaterno, apMaterno, email, dateJoined, phone, birthDate, emerPhone}
          );  

          // console.log(data)
        
          setAlerta({
            msg: data.msg,
            error: false
          });           
          
          resetForm()
          handleGender('')
          handlePosition('')

        } catch (error) {
          console.log(error)
          const {data} = error.response                        
          setAlerta({
            msg: data.msg,
            error: true
          })
        }
    }

    const handleCancelar = () =>{
        setIsEditing(false)
    }

    const {msg} = alerta
    // console.log(usuario)

  return (

    <>
      <Formik
        initialValues={{
          name: usuario.name,
          apPaterno: usuario.firstLastName,
          apMaterno: usuario.secondLastName,
          email: usuario.email,
          phone: usuario.phone,
          emerPhone: usuario.emerPhone,
          dateJoined: usuario.dateJoined,
          birthDate: usuario.birthDate,
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
                    name="name" 
                    label="Nombre(s)" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={usuario.name}
                  //   value={values.name}
                    />
                  <Input 
                    name="apPaterno" 
                    label="Apellido Paterno" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={usuario.firstLastName}
                  //   value={values.apPaterno}
                    />
                  <Input 
                    name="apMaterno" 
                    label="Apellido Materno" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={usuario.secondLastName}
                  //   value={values.apMaterno}
                    />
                  <Input
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    size="md"
                    variant="outlined"
                    disabled={!isEditing}
                    onChange={handleChange}
                  //   defaultValue={values.email}
                      defaultValue={values.email ?? usuario.email}
                  />   
                  <Input 
                    name="phone" 
                    label="Teléfono" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                  //   value={values.phone}
                    defaultValue={usuario.phone}
                    />       
                  <Input 
                    name="emerPhone" 
                    label="Télefono de emergencia" 
                    size="md"
                    variant="outlined" 
                    disabled={!isEditing}
                    onChange={handleChange}
                    defaultValue={usuario.emerPhone}
                    />   
                  <Input
                    name="dateJoined"
                    type="date"
                    size="md"
                    variant="outlined"
                    disabled={!isEditing}
                    label="Fecha de ingreso al puesto"
                    onChange={handleChange}
                    defaultValue={usuario.dateJoined ? usuario.dateJoined.substring(0,10) : ""}
                  />
        
                  <Input
                    name="birthDate"
                    type="date"
                    size="md"
                    variant="outlined"
                    disabled={!isEditing}
                    label="Fecha de nacimiento"
                    onChange={handleChange}
                    defaultValue={usuario.birthDate ? usuario.birthDate.substring(0,10) : ""}
                  />

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

export default FormEditarEmpleado;
