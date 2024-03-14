import React from "react";
import { Form, Formik } from "formik";
import { Button, Tooltip, Textarea } from "@material-tailwind/react";

export function FormAgregarComentario() {
  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const { commnet } = values;
    if (commnet === "") {
      return;
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form autoComplete="off" className="w-full">
          <Textarea
            name="comment"
            onChange={handleChange}
            variant="outlined"
            placeholder="Nuevo comentario"
            rows={1}
          />
          <div className="flex flex-row-reverse">
            <Tooltip
              content="Enviar comentario"
              placement="top"
              className="bg-black"
            >
              <Button
                size="sm"
                className="rounded-md bg-teal-400 "
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Tooltip>
          </div>
        </Form>
      )}
    </Formik>
  );
}
