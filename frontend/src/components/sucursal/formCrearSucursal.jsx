import {
    Input,
    Button,
    Select,
    DialogBody,
    DialogFooter,
    Alert,
    Option,
  
  } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";


const FormCrearSucursal = ({clientId, handleCreateSucursal, contactos}) => {

    const [inCharge, setInCharge] = useState('')
    const [mensaje, setMensaje] = useState('');
    const [visible, setVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    // console.log(Object.keys(contactos).length)

    const handleInCharge = e =>{
      // console.log(e)
      setInCharge(e)
    }

    const handleVisible = (visibility) => {
      setVisible(visibility);
    };

    const handleSubmit = async (values, {resetForm}) =>{

      
      const {address, phone, email} = values
      console.log(`${address}, ${phone}, ${email}, ${clientId}, ${inCharge}`)
      // console.log(values)
      // console.log(contacto)
      if([address, phone, email, inCharge].includes('')){
        setIsError(true)
        setMensaje('Todos los campos son obligatorios.')
        setVisible(true)
        return
      }

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        setIsError(true)
        setMensaje('Ingrese un correo válido.')
        setVisible(true)
        return
      }

      if (!/^\+(\d{2})\s?1?\d{10}$/.test(phone)){
        setIsError(true)
        setMensaje('El télefono no es válido.')
        setVisible(true)
        return
      }

      try {
       
        
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/branchOffice/`,
          {address, phone, email, inCharge, clientId }
          );        

        console.log(data)
        setIsError(false)
        setMensaje('Sucursal registrada con éxito.')
        handleVisible(true)       

        setTimeout(()=>{
            resetForm()
            handleCreateSucursal()
        },2000)
        } catch (error) {
            console.log(error)
        }

    }

    
  return (
    <>
        <Formik
            initialValues={{
              address: "",
              phone: "",
              email: "",            
            }}

            onSubmit={handleSubmit}
        >
            {({
              handleChange,
              handleSubmit, 
              values
            }) => (
              <>
                <Form                    
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
                    name="address" 
                    label="Dirección" 
                    size="md"
                    variant="outlined" 
                    onChange={handleChange}
                    defaultValue={values.address}
                    />
                    <Input 
                    name="phone" 
                    label="Télefono" 
                    size="md"
                    variant="outlined" 
                    onChange={handleChange}
                    defaultValue={values.phone}
                    />
                    <Input 
                    name="email" 
                    type="email"
                    label="Correo electrónico" 
                    size="md"
                    variant="outlined" 
                    onChange={handleChange}
                    defaultValue={values.email}
                    />

                      <Select
                        label="Contacto"
                        size="md"
                        onChange={handleInCharge}     
                      >
                       {Object.keys(contactos).length > 0 ?
                         contactos.map(({contactId, name, firstLastName, secondLastName, contactActive})=>
                            <Option
                              value={contactId?.toString()}
                              key={contactId}                              
                            >
                              {name} {firstLastName} {secondLastName}
                            </Option>
                          ) 
                          :
                          <Option value="" ></Option>
                        }

                      </Select>        
                  </DialogBody>
                  <DialogFooter>
                  <Button
                    variant="outlined"    
                    color="white"        
                    onClick={handleCreateSucursal}
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
              </>
            )}
        </Formik>
    </>
  )
}

export default FormCrearSucursal