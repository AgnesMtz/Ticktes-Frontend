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
  import { useState, Fragment, useEffect } from "react";
  import { Form, Formik } from "formik";
  import Alerta from "@/components/Alerta";

  export function RegistroEmpleado() {

    const [gender, setGender] = useState('')
    const [position, setPosition] = useState('')
    const [alerta, setAlerta] = useState([])

    const handleGender = e =>{
        setGender(e)
    }

    const handlePosition = e =>{        
        setPosition(e)
    }

    const handleSubmit = async (values, {resetForm}) => {
      console.log(values)
      const {name, firstLastName,secondLastName, email, password, password2, dateJoined, phone, birthDate, emerPhone} = values        

      if([name, firstLastName, secondLastName, email, password, password2, dateJoined, phone, birthDate, emerPhone, gender, position].includes('')){
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
            `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/registrar-usuario/`,
            {name, firstLastName, secondLastName, email, password, dateJoined, phone, birthDate, emerPhone, gender, position}
          );  

          console.log(data)
        
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

    const {msg} = alerta

  return (

    <>
      <Formik
        initialValues={{
          name: "",
          firstLastName: "",
          secondLastName: "",
          email: "",
          password: "",
          password2: "",
          dateJoined: "",
          phone: "",
          birthDate: "",
          emerPhone: "",
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
                  Registrar Trabajadores
                </Typography>
              </CardHeader>

              {msg && 
                  <Alerta 
                    alerta={alerta}/>
              }

              <CardBody 
                  className="flex flex-col gap-4">
                <div className="flex justify-around gap-4 flex-wrap">
                  <Input 
                    name="name" 
                    label="Nombre(s)" 
                    size="lg" 
                    onChange={handleChange}
                    value={values.name}
                    />
                  <Input 
                    name="firstLastName" 
                    label="Apellido Paterno" 
                    size="lg" 
                    onChange={handleChange}
                    value={values.firstLastName}
                    />
                  <Input 
                    name="secondLastName" 
                    label="Apellido Materno" 
                    size="lg" 
                    onChange={handleChange}
                    value={values.secondLastName}
                    />                  
                </div>
                <div className="flex justify-around gap-4 "> 
                  <Input
                    name="email"
                    type="email"
                    label="Correo electrónico"
                    size="lg"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Input
                    name="password"
                    type="password"
                    label="Contraseña"
                    size="lg"
                    onChange={handleChange}
                    value={values.password}
                  />                
                </div>
                <div className="flex justify-around gap-4">
                  <Select value={position} className="rounded-xl" onChange={handlePosition} size="lg" label="Puesto de trabajo">                
                    <Option value="1" key={1}>Director General</Option>
                    <Option value="2" key={2}>Director Operativo</Option>
                    <Option value="3" key={3}>Operador Creativo</Option>
                  </Select>
                  <Input
                    name="password2"
                    type="password"
                    label="Repite la contraseña"
                    size="lg"
                    onChange={handleChange}
                    value={values.password2}
                  />              
                </div>
                <div className="flex justify-around gap-4 flex-wrap">
                  <Input
                    name="dateJoined"
                    type="date"
                    size="lg"
                    label="Fecha de ingreso al puesto"
                    onChange={handleChange}
                    value={values.dateJoined}
                  />             
                  <Select value={gender} onChange={handleGender} label="Género">                
                    <Option value="M" key={'M'}>Masculino</Option>
                    <Option value="F" key={'F'}>Femenino</Option>
                  </Select>
                  <Input
                    name="birthDate"
                    type="date"
                    size="lg"
                    label="Fecha de nacimiento"
                    onChange={handleChange}
                    value={values.birthDate}
                  />
                </div>
                <div className="flex justify-around gap-4">
                  <Input 
                    name="phone" 
                    label="Teléfono" 
                    size="lg" 
                    onChange={handleChange}
                    value={values.phone}
                    />   
                  <Input 
                    name="emerPhone" 
                    label="Número de emergencia" 
                    size="lg" 
                    onChange={handleChange}
                    value={values.emerPhone}
                    />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button                   
                  variant="filled" 
                  fullWidth
                  onClick={handleSubmit}
                  className="bg-teal-400"
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

export default RegistroEmpleado;
