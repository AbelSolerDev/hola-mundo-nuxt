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
export default {
  data() {
    return {
      nombre: 'Mundo',
      nombreForm: '',
    };
  },
  methods: {
    async guardarNombre() {
      const response = await this.$axios.post('/guardarNombre', {
        nombre: this.nombreForm,
      });
      console.log(response.data);
      this.nombre = this.nombreForm;
    },
  },
};
</script>
