<template>
  <div>
    <h1>Hola {{ nombre }}</h1>
    <form @submit.prevent="guardarNombre">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="nombreForm" />
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: 'Mundo',
      nombreForm: '',
    };
  },
  methods: {
    async guardarNombre() {
      try {
        const response = await axios.post('http://localhost:3000/api/guardarNombre', {
          nombre: this.nombreForm,
        });

        this.nombre = this.nombreForm;
        alert('Inserción exitosa');
        console.log('Respuesta del servidor:', response.data);

      } catch (error) {
        console.error('Error en la solicitud Axios:', error);
      }
    },
  },
};
</script>
