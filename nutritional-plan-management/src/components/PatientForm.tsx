import React, { useState } from "react";

export interface PatientData {
  name: string;
  lastname1: string;
  lastname2: string;
  age: number;
  birthdate: string;
  startdate: string;
  goal: string;
  mail: string;
  phoneNumber: string;
  password: string;
}

interface PatientFormProps {
  formData: PatientData | null;
  setFormData: React.Dispatch<React.SetStateAction<PatientData | null>>;
  savePatientData: (data: PatientData) => Promise<void>;
  editableFields: Array<string>; // Lista de campos que son editables
}

const PatientForm: React.FC<PatientFormProps> = ({
  formData,
  setFormData,
  savePatientData,
  editableFields,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return; // Evitar cambios si formData es null
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      await savePatientData(formData); // Solo guardar si formData no es null
    }
  };

  const isEditable = (fieldName: string) => editableFields.includes(fieldName);

  return (
    <form
      className="text-center p-10 bg-white bg-opacity-80 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          name="name"
          value={formData?.name || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("name")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Apellido Paterno:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          name="lastname1"
          value={formData?.lastname1 || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("lastname1")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Apellido Materno:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          name="lastname2"
          value={formData?.lastname2 || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("lastname2")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Edad:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="number"
          name="age"
          value={formData?.age || 0} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("age")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Fecha de Nacimiento:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="date"
          name="birthdate"
          value={formData?.birthdate || ""} // Valor predeterminado si formData es null
          onChange={(e) =>
            formData && setFormData({ ...formData, birthdate: e.target.value })
          }
          readOnly={!isEditable("birthdate")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Fecha de Inicio:
        </label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="date"
          name="startdate"
          value={formData?.startdate || ""} // Valor predeterminado si formData es null
          onChange={(e) =>
            formData && setFormData({ ...formData, startdate: e.target.value })
          }
          readOnly={!isEditable("startdate")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Teléfono:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          name="phoneNumber"
          value={formData?.phoneNumber || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("phoneNumber")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="email"
          name="mail"
          value={formData?.mail || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("mail")}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Objetivo:</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          name="goal"
          value={formData?.goal || ""} // Valor predeterminado si formData es null
          onChange={handleChange}
          readOnly={!isEditable("goal")}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
          type="submit"
          disabled={editableFields.length === 0 || !formData}
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default PatientForm;
