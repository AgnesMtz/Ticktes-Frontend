import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,

} from "@material-tailwind/react";
import RegistroCliente from "../register/registrarCliente";
import RegistroEmpleado from "../register/registrarEmpleado";

export function Registro() {

  return (

    <>

      <Tabs 
        id="custom-animation" 
        value="worker"                
        >
            <TabsHeader
              className="w-1/2 mx-auto mt-2"              
            >
              <Tab
                key="worker"
                value="worker"
                className="text-sm"
                >
                  Trabajador
              </Tab>
              <Tab
                key="client"
                value="client"
                className="text-sm"
                >
                  Cliente
              </Tab>
            </TabsHeader>
            <TabsBody
            >
              <TabPanel 
                key="worker"
                value="worker"
              >
                <RegistroEmpleado/>
              </TabPanel>

              <TabPanel 
                key="client"
                value="client"
              >
                <RegistroCliente/>
              </TabPanel>
            </TabsBody>
        </Tabs>
    </>

  );
}

export default Registro;
