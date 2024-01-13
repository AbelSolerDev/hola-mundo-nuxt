<template>
  <div>
    <div class="container">
      <h1 class="titulo">Hola {{ nombre }}</h1>
      <form @submit.prevent="guardarNombre" class="formulario">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombreForm" />
        <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
</template>

<style>
.container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  .titulo {
    text-align: center;
    font-size: 2em;
  }

  .formulario {
    margin-top: 20px;
    text-align: center;
  }

  body {
    background-color: aquamarine;
    padding: 20px;
  }
</style>


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