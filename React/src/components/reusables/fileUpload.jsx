import Button from '@mui/material/Button';
import {  Field,  } from 'formik';


export default function FileUpload({setFieldValue}) {
    return (
        <Field name="image">
      {({ field }) => (
        <>
          <Button variant="outlined" component="label" sx={{m:2}}>
            Upload image
            <input
              accept="image/*"
              type="file"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
              style={{ display: "none" }}
            />
          </Button>
          {field.value && <div>{field.value.name}</div>}
        </>
      )}
    </Field>
      );
}
