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
        axios.post('http://localhost:3000/api/guardarNombre', {
          nombre: this.nombreForm,
        })
        .then(() => {
          this.nombre = this.nombreForm;
          alert('Inserción exitosa');
        })
        .catch((error) => {
          console.error('Error en la solicitud Axios:', error);
        });
      } catch (error) {
        console.error('Error en la función guardarNombre:', error);
      }
    },
  },
};
</script>