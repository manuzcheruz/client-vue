<template>
  <div class="about">
    <!-- Display the data with a structured table, element-ui is ready for use -->
    <el-table :data="facts" style="width: 100%">
      <el-table-column prop="username" label="username" width="auto" />
      <el-table-column prop="textdescription" label="description" width="auto" />
      <el-table-column prop="updatedat" label="last updated" />
      <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="updateHandler(scope.row)"
          >Update</el-button
        >
        <el-button type="text" size="small" @click="deleteHandler(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'facts',
  // setup() {
  //   const facts = ref([]);
  //   const getFacts = async () => {
  //     // Get data from backend
  //     const response = await this.axios.get('/fromSource');
  //     return response.json();
  //   };
  //   onMounted(() => {
  //     getFacts();
  //   });

  //   return {
  //     facts,
  //   };
  // },
  data() {
    return {
      facts: [],
    };
  },
  methods: {
    async fetchFacts() {
      const response = await axios.get('http://localhost:3000/cat/fromSource');
      this.facts = response.data;
    },
    async updateHandler(obj) {
      const update = prompt('please update the fact', obj.textdescription);
      const url = `http://localhost:3000/cat/facts/${obj.id}`;
      console.log(url);
      await axios.put(url,
        { text: update });
      // console.log(response);
      // if (!response.statusText('OK')) {
      //   alert('Failed to update!');
      //   return;
      // }
      this.fetchFacts();
    },
    async deleteHandler(id) {
      const url = `http://localhost:3000/cat/facts/${id}`;
      await axios.delete(url);
      this.fetchFacts();
    },
  },
  mounted() {
    this.fetchFacts();
  },
};

</script>
