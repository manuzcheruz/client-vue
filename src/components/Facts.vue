<template>
  <div class="facts">
    <p v-if="loading">Loading cat facts ...</p>
    <el-table v-else :data="facts" style="width: 100%">
      <el-table-column prop="username" label="username" width="auto" />
      <el-table-column prop="textdescription" label="description" width="auto" />
      <el-table-column prop="updatedat" label="last updated" width="auto" />
      <el-table-column fixed="right" label="Operations" width="auto">
      <template #default="scope">
        <el-button id="update" size="small" @click="updateHandler(scope.row)"
          >Update</el-button
        >
        <el-button id="delete" size="small" type="danger" @click="deleteHandler(scope.row.id)">
          Delete</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'facts',
  data() {
    return {
      facts: [],
      loading: false,
    };
  },
  methods: {
    async fetchFacts() {
      this.loading = true;
      try {
        const url = 'http://localhost:3000/cat/fromSource';
        const response = await axios.get(url);
        this.loading = false;
        this.facts = response.data.length > 0 ? response.data : [];
      } catch (error) {
        this.loading = false;
        alert(error.message);
      }
    },
    async updateHandler(obj) {
      try {
        const update = prompt('please update the cat fact', obj.textdescription);
        if (update === '') {
          alert('update cannot be empty!');
          return;
        }
        if (update === null) return;
        const url = `http://localhost:3000/cat/facts/${obj.id}`;
        await axios.put(url,
          { text: update });
        this.fetchFacts();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteHandler(id) {
      try {
        const url = `http://localhost:3000/cat/facts/${id}`;
        await axios.delete(url);
        this.fetchFacts();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    this.fetchFacts();
  },
};
</script>
