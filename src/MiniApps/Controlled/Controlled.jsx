
import { useState } from "react";

export default function ControlledForm() {
const [firstName, setFirstName] = useState('');
const [email, setEmail] = useState('');
const [mens, setMens] = useState('');
const [error, setError] = useState('');
const[send, setSend] = useState('');

const handleChange = (e) => {
const {name, value} = e.target;
if( name === 'firstName') {
    setFirstName(value);
} else if (name === 'email') {
    setEmail(value); 
    
}else if (name === 'message'){
    setMens(value);
}
}

const handleAdd = (e) =>  {
e.preventDefault();
const isEmpty = !firstName.trim() || !email.trim() || !mens.trim();
if (isEmpty) {
     setError('Por favor, completa todos los campos');
      return;
}

const emailValido = email.includes('@') && email.includes('.');
if(!emailValido) {
    setError('Por favor, introduce un email válido');
    return;
}

  if (mens.trim().length < 10) {
    setError('El mensaje debe tener al menos 10 caracteres');
    setSend('');
    return;
  }

 setError('');
 setSend('¡Gracias por enviar el formulario!');

 setFirstName('');
 setEmail('');
 setMens('');
}


return (
<div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md max-w-md mx-auto">
  <h3 className="text-slate-800 dark:text-slate-100 text-xl font-bold mb-4">
    Formulario de Contacto
  </h3>
  <form onSubmit={handleAdd}>
    <div className="mb-4">
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
        Nombre:
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          placeholder="Introduce tu nombre..."
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring"
        />
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Introduce tu email..."
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring"
        />
      </label>
    </div>

    <div className="mb-4">
      <label className="block text-slate-700 dark:text-slate-200 text-sm font-bold mb-2">
        Mensaje:
        <textarea
          name="message"
          value={mens}
          onChange={handleChange}
          placeholder="Escribe tu mensaje..."
          rows={4}
          className="w-full px-3 py-2 border rounded-md bg-white dark:bg-slate-900 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring"
        />
      </label>
    </div>

    <button
      type="submit"
       disabled={!firstName.trim() || !email.trim() || !mens.trim()}
      className={`w-full py-2 px-4 rounded-md font-bold transition
    bg-blue-500 hover:bg-blue-600
    dark:bg-blue-600 dark:hover:bg-blue-700
    text-white
    disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      Enviar
    </button>
  </form>

  {error && <p className="text-red-500 mt-2">{error}</p>}
  {send && <p className="text-green-600 mt-2">{send}</p>}
</div>

);}