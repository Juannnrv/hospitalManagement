# Documentación de la API de Doctores

**Base URL:** `http://localhost:5000/doctors`

## Endpoints

### 1. Obtener todos los doctores

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todos los doctores.

- Respuesta Exitosa:

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Doctors fetched successfully",
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "gender": "male",
          "email": "johndoe@example.com",
          "phone": "123456789",
          "specialty": "Cardiology",
          "date_of_birth": "1980-01-01",
          "status": "Approved",
          "license": "XYZ123"
        },
        ...
      ]
    }
    ```

- Respuesta de Error:

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "No doctors found"
    }
    ```

### 2. Obtener un doctor por ID

- **URL:** `/:id`

- **Método:** `GET`

- **Descripción:** Recupera los detalles de un doctor específico utilizando su ID.

- Parámetros:

  - `id` (int): ID del doctor.

- Respuesta Exitosa:

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Doctor fetched successfully",
      "data": {
        "id": 1,
        "name": "John Doe",
        "gender": "male",
        "email": "johndoe@example.com",
        "phone": "123456789",
        "specialty": "Cardiology",
        "date_of_birth": "1980-01-01",
        "status": "Approved",
        "license": "XYZ123"
      }
    }
    ```

- Respuesta de Error:

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Doctor not found"
    }
    ```

### 3. Crear un nuevo doctor

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea un nuevo doctor.

- Cuerpo de Solicitud:

  ```
  jsonCopiar código{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123456789",
    "specialty_id": 1,
    "gender": "male",
    "date_of_birth": "1980-01-01",
    "license": "XYZ123",
    "status": "Approved"
  }
  ```

- Respuesta Exitosa:

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Doctor created successfully",
      "data": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "123456789",
        "specialty_id": 1,
        "gender": "male",
        "date_of_birth": "1980-01-01",
        "license": "XYZ123",
        "status": "Approved"
      },
      "info": {
        "affectedRows": 1
      }
    }
    ```

- Respuesta de Error:

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Name must be a string",
          "param": "name",
          "location": "body"
        },
        ...
      ]
    }
    ```

### 4. Actualizar un doctor

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza los detalles de un doctor específico utilizando su ID.

- Parámetros:

  - `id` (int): ID del doctor.

- Cuerpo de Solicitud:

  ```
  jsonCopiar código{
    "name": "John Doe Updated",
    "email": "johndoe_updated@example.com",
    "phone": "987654321",
    "specialty_id": 1,
    "gender": "male",
    "date_of_birth": "1980-01-01",
    "license": "XYZ456",
    "status": "Approved"
  }
  ```

- Respuesta Exitosa:

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Doctor updated successfully",
      "data": {
        "id": 1,
        "name": "John Doe Updated",
        "email": "johndoe_updated@example.com",
        "phone": "987654321",
        "specialty_id": 1,
        "gender": "male",
        "date_of_birth": "1980-01-01",
        "license": "XYZ456",
        "status": "Approved"
      },
      "info": {
        "affectedRows": 1
      }
    }
    ```

- Respuesta de Error:

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Doctor not found"
    }
    ```

### 5. Eliminar un doctor

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina un doctor específico utilizando su ID.

- Parámetros:

  - `id` (int): ID del doctor.

- Respuesta Exitosa:

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Doctor deleted successfully",
      "data": {
        "id": 1,
        "name": "John Doe",
        "gender": "male",
        "email": "johndoe@example.com",
        "phone": "123456789",
        "specialty": "Cardiology",
        "date_of_birth": "1980-01-01",
        "status": "Approved",
        "license": "XYZ123"
      },
      "info": {
        "affectedRows": 1
      }
    }
    ```

- Respuesta de Error:

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Doctor not found"
    }
    ```

# Documentación de la API de Personal

**Base URL:** `http://localhost:5000/staff`

## Endpoints

### 1. Obtener personal que no está asignado a ningún hospital

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de doctores que no están asignados a ningún hospital.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Staff fetched successfully",
      "data": [
        {
          "id": 1,
          "doctor": "Dr. John Doe"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Staff not found for this hospital"
    }
    ```

### 2. Obtener todo el personal

- **URL:** `/current`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todos los doctores asignados a hospitales.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Staff fetched successfully",
      "data": [
        {
          "hospital_id": 1,
          "doctor_id": 2,
          "hospital": "Hospital ABC",
          "doctor": "Dr. Jane Doe",
          "specialty": "Cardiology"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Staff not found"
    }
    ```

### 3. Crear nuevo personal

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea un nuevo registro de personal asignando un doctor a un hospital.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 1,
    "doctor_id": 2
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Staff created successfully",
      "data": {
        "id": 1,
        "hospital_id": 1,
        "doctor_id": 2
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Patient ID must be an integer",
          "param": "patient_id",
          "location": "body"
        },
        {
          "msg": "Doctor ID must be an integer",
          "param": "doctor_id",
          "location": "body"
        }
      ]
    }
    ```

### 4. Actualizar personal

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza el registro de un doctor asignado a un hospital.

- **Parámetros:**

  - `id` (int): ID del personal a actualizar.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 2,
    "doctor_id": 3
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Staff updated successfully",
      "data": {
        "hospital_id": 2,
        "doctor_id": 3
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Staff not found"
    }
    ```

### 5. Eliminar personal

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina un registro de personal asignado a un hospital.

- **Parámetros:**

  - `id` (int): ID del personal a eliminar.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Staff deleted successfully"
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Staff not found"
    }
    ```

# Documentación de la API de Hospitales

**Base URL:** `http://localhost:5000/hospitals`

## Endpoints

### 1. Obtener todos los hospitales

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todos los hospitales.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Hospitals fetched successfully",
      "data": [
        {
          "id": 1,
          "name": "Hospital A",
          "address": "123 Main St",
          "email": "contact@hospitala.com",
          "phone": "123456789"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Hospital not found"
    }
    ```

### 2. Obtener un hospital por ID

- **URL:** `/:id`

- **Método:** `GET`

- **Descripción:** Recupera los detalles de un hospital específico utilizando su ID.

- **Parámetros:**

  - `id` (int): ID del hospital.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Hospital fetched successfully",
      "data": {
        "id": 1,
        "name": "Hospital A",
        "address": "123 Main St",
        "email": "contact@hospitala.com",
        "phone": "123456789"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Hospital not found"
    }
    ```

### 3. Crear un nuevo hospital

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea un nuevo hospital.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "name": "Hospital A",
    "address": "123 Main St",
    "email": "contact@hospitala.com",
    "phone": "123456789"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Hospital created successfully",
      "data": {
        "id": 1,
        "name": "Hospital A",
        "address": "123 Main St",
        "email": "contact@hospitala.com",
        "phone": "123456789"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Name is required",
          "param": "name",
          "location": "body"
        },
        {
          "msg": "Address is required",
          "param": "address",
          "location": "body"
        },
        {
          "msg": "Email must be a valid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Phone must be a string",
          "param": "phone",
          "location": "body"
        }
      ]
    }
    ```

### 4. Actualizar un hospital

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza los detalles de un hospital específico utilizando su ID.

- **Parámetros:**

  - `id` (int): ID del hospital.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "name": "Hospital A Updated",
    "address": "456 Elm St",
    "email": "contact_updated@hospitala.com",
    "phone": "987654321"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Hospital updated successfully",
      "data": {
        "id": 1,
        "name": "Hospital A Updated",
        "address": "456 Elm St",
        "email": "contact_updated@hospitala.com",
        "phone": "987654321"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Hospital not found"
    }
    ```

### 5. Eliminar un hospital

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina un hospital específico utilizando su ID.

- **Parámetros:**

  - `id` (int): ID del hospital.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Hospital deleted successfully",
      "data": {
        "id": 1,
        "name": "Hospital A",
        "address": "123 Main St",
        "email": "contact@hospitala.com",
        "phone": "123456789"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Hospital not found"
    }
    ```

# Documentación de la API de Appointments

**Base URL:** `http://localhost:5000/population`

## Endpoints

### 1. Obtener pacientes sin citas

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de pacientes que no tienen citas asignadas.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Appointments fetched successfully",
      "data": [
        {
          "id": 1,
          "name": "Jane Doe",
          "status": "Active"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "No appointments found"
    }
    ```

### 2. Obtener todas las citas

- **URL:** `/current`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todas las citas, incluyendo información sobre pacientes y doctores.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Appointments fetched successfully",
      "data": [
        {
          "patient": "Jane Doe",
          "doctor": "Dr. Smith",
          "doctor_specialty": "Cardiology",
          "status": "Active"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "No appointments found"
    }
    ```

### 3. Crear una nueva cita

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea una nueva cita para un paciente con un doctor.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "patient_id": 1,
    "doctor_id": 2
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Appointment created",
      "data": {
        "patient_id": 1,
        "doctor_id": 2
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Patient ID must be an integer",
          "param": "patient_id",
          "location": "body"
        },
        {
          "msg": "Doctor ID must be an integer",
          "param": "doctor_id",
          "location": "body"
        }
      ]
    }
    ```

### 4. Actualizar una cita

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza la información de una cita existente.

- **Parámetros:**

  - `id` (int): ID de la cita.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "patient_id": 1,
    "doctor_id": 3
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Appointment updated successfully",
      "data": {
        "patient_id": 1,
        "doctor_id": 3
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Appointment not found"
    }
    ```

### 5. Eliminar una cita

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina una cita existente utilizando su ID.

- **Parámetros:**

  - `id` (int): ID de la cita.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Appointment deleted successfully"
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Appointment not found"
    }
    ```

# Documentación de la API de Notices

**Base URL:** `http://localhost:5000/notices`

## Endpoints

### 1. Obtener todas las notificaciones

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todas las notificaciones, incluyendo información sobre los hospitales asociados.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Notices fetched successfully",
      "data": [
        {
          "id": 1,
          "hospital_name": "Hospital General",
          "date": "2024-10-10T05:00:00.000Z",
          "name": "Emergency Drill",
          "description": "An emergency drill will take place on Monday."
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Notice not found"
    }
    ```

### 2. Obtener una notificación por ID

- **URL:** `/:id`

- **Método:** `GET`

- **Descripción:** Recupera la notificación asociada a un ID específico.

- **Parámetros:**

  - `id` (int): ID de la notificación.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Notice fetched successfully",
      "data": {
        "id": 1,
        "hospital_name": "Hospital General",
        "date": "2024-10-10T05:00:00.000Z",
        "name": "Emergency Drill",
        "description": "An emergency drill will take place on Monday."
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Notice not found"
    }
    ```

### 3. Crear una nueva notificación

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea una nueva notificación asociada a un hospital.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 1,
    "name": "Emergency Drill",
    "description": "An emergency drill will take place on Monday.",
    "date": "2024-10-10T05:00:00.000Z"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Notice created successfully",
      "data": {
        "id": 2,
        "hospital_id": 1,
        "name": "Emergency Drill",
        "description": "An emergency drill will take place on Monday.",
        "date": "2024-10-10T05:00:00.000Z",
        "hospital_name": "Hospital General"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Hospital ID is required",
          "param": "hospital_id",
          "location": "body"
        },
        {
          "msg": "Name is required",
          "param": "name",
          "location": "body"
        },
        {
          "msg": "Description is required",
          "param": "description",
          "location": "body"
        },
        {
          "msg": "Date is not valid",
          "param": "date",
          "location": "body"
        }
      ]
    }
    ```

### 4. Actualizar una notificación

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza la información de una notificación existente.

- **Parámetros:**

  - `id` (int): ID de la notificación.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 1,
    "name": "Updated Emergency Drill",
    "description": "An updated emergency drill will take place on Monday.",
    "date": "2024-10-10T05:00:00.000Z"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Notice updated successfully",
      "data": {
        "id": 1,
        "hospital_id": 1,
        "name": "Updated Emergency Drill",
        "description": "An updated emergency drill will take place on Monday.",
        "date": "2024-10-10T05:00:00.000Z",
        "hospital_name": "Hospital General"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Notice not found"
    }
    ```

### 5. Eliminar una notificación

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina una notificación existente utilizando su ID.

- **Parámetros:**

  - `id` (int): ID de la notificación.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Notice deleted successfully",
      "data": {
        "id": 1,
        "hospital_name": "Hospital General",
        "date": "2024-10-10T05:00:00.000Z",
        "name": "Updated Emergency Drill",
        "description": "An updated emergency drill will take place on Monday."
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Notice not found"
    }
    ```



# Documentación de la API de Pacientes

**Base URL:** `http://localhost:5000/patients`

## Endpoints

### 1. Obtener todos los pacientes

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todos los pacientes.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Patients fetched successfully",
      "data": [
        {
          "id": 1,
          "name": "Jane Doe",
          "email": "jane.doe@example.com",
          "phone": "123-456-7890",
          "gender": "female",
          "date_of_birth": "2010-01-01",
          "age": 14,
          "status": "Approved"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "No patients found"
    }
    ```

### 2. Obtener un paciente por ID

- **URL:** `/:id`

- **Método:** `GET`

- **Descripción:** Recupera la información de un paciente específico mediante su ID.

- **Parámetros:**

  - `id` (int): ID del paciente.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Patient fetched successfully",
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "123-456-7890",
        "gender": "female",
        "date_of_birth": "2010-01-01",
        "age": 14,
        "status": "Approved"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Patient not found"
    }
    ```

### 3. Crear un nuevo paciente

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea un nuevo paciente.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "phone": "123-456-7890",
    "gender": "female",
    "date_of_birth": "2010-01-01",
    "age": 14,
    "status": "Approved",
    "medical_history": "<contenido del historial médico si se incluye>"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Patient created successfully",
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "123-456-7890",
        "gender": "female",
        "date_of_birth": "2010-01-01",
        "age": 14,
        "status": "Approved"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Name must be a string",
          "param": "name",
          "location": "body"
        },
        {
          "msg": "Email must be a valid email",
          "param": "email",
          "location": "body"
        },
        ...
      ]
    }
    ```

### 4. Actualizar un paciente

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza la información de un paciente existente.

- **Parámetros:**

  - `id` (int): ID del paciente.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "123-456-7890",
    "gender": "female",
    "date_of_birth": "2010-01-01",
    "age": 14,
    "status": "Approved",
    "medical_history": "<contenido del historial médico si se incluye>"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Patient updated successfully",
      "data": {
        "id": 1,
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "123-456-7890",
        "gender": "female",
        "date_of_birth": "2010-01-01",
        "age": 14,
        "status": "Approved"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Patient not found"
    }
    ```

### 5. Eliminar un paciente

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina un paciente existente utilizando su ID.

- **Parámetros:**

  - `id` (int): ID del paciente.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Patient deleted successfully",
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "123-456-7890",
        "gender": "female",
        "date_of_birth": "2010-01-01",
        "age": 14,
        "status": "Approved"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Patient not found"
    }
    ```

# Documentación de la API de Accounts

**Base URL:** `http://localhost:5000/accounts`

## Endpoints

### 1. Obtener todas las cuentas

- **URL:** `/`

- **Método:** `GET`

- **Descripción:** Recupera una lista de todas las cuentas, incluyendo información sobre pacientes y hospitales.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Accounts fetched successfully",
      "data": [
        {
          "id": 1,
          "patient_name": "Jane Doe",
          "hospital_name": "City Hospital",
          "date": "2024-10-10",
          "price": 200.00,
          "description": "Check-up appointment"
        },
        ...
      ]
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "No accounts found"
    }
    ```

### 2. Obtener una cuenta por ID

- **URL:** `/:id`

- **Método:** `GET`

- **Descripción:** Recupera la información de una cuenta específica utilizando su ID.

- **Parámetros:**

  - `id` (int): ID de la cuenta.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Account fetched successfully",
      "data": {
        "id": 1,
        "patient_name": "Jane Doe",
        "hospital_name": "City Hospital",
        "date": "2024-10-10",
        "price": 200.00,
        "description": "Check-up appointment"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Account not found"
    }
    ```

### 3. Crear una nueva cuenta

- **URL:** `/`

- **Método:** `POST`

- **Descripción:** Crea una nueva cuenta para un paciente en un hospital.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 1,
    "patient_id": 2,
    "price": 150.00,
    "date": "2024-10-10",
    "description": "Routine check-up"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `201 Created`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 201,
      "message": "Account created successfully",
      "data": {
        "id": 1,
        "hospital_id": 1,
        "patient_id": 2,
        "price": 150.00,
        "date": "2024-10-10",
        "description": "Routine check-up",
        "hospital_name": "City Hospital",
        "patient_name": "John Smith"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `400 Bad Request`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "errors": [
        {
          "msg": "Hospital ID must be a number",
          "param": "hospital_id",
          "location": "body"
        },
        {
          "msg": "Patient ID must be a number",
          "param": "patient_id",
          "location": "body"
        },
        {
          "msg": "Price must be a number",
          "param": "price",
          "location": "body"
        },
        {
          "msg": "Date must be a date",
          "param": "date",
          "location": "body"
        },
        {
          "msg": "Description must be a string",
          "param": "description",
          "location": "body"
        }
      ]
    }
    ```

### 4. Actualizar una cuenta

- **URL:** `/:id`

- **Método:** `PUT`

- **Descripción:** Actualiza la información de una cuenta existente.

- **Parámetros:**

  - `id` (int): ID de la cuenta.

- **Cuerpo de Solicitud:**

  ```
  jsonCopiar código{
    "hospital_id": 1,
    "patient_id": 2,
    "price": 175.00,
    "date": "2024-10-15",
    "description": "Follow-up appointment"
  }
  ```

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Account updated successfully",
      "data": {
        "id": 1,
        "hospital_id": 1,
        "patient_id": 2,
        "price": 175.00,
        "date": "2024-10-15",
        "description": "Follow-up appointment",
        "hospital_name": "City Hospital",
        "patient_name": "John Smith"
      }
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Account not found"
    }
    ```

### 5. Eliminar una cuenta

- **URL:** `/:id`

- **Método:** `DELETE`

- **Descripción:** Elimina una cuenta existente utilizando su ID.

- **Parámetros:**

  - `id` (int): ID de la cuenta.

- **Respuesta Exitosa:**

  - **Código de Estado:** `200 OK`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 200,
      "message": "Account deleted successfully"
    }
    ```

- **Respuesta de Error:**

  - **Código de Estado:** `404 Not Found`

  - Cuerpo de Respuesta:

    ```
    jsonCopiar código{
      "status": 404,
      "message": "Account not found"
    }
    ```